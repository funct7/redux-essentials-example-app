import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

export const selectAllNotifications = state => state.notifications;

export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
	const allNotifications = selectAllNotifications(getState());
	const [latestNotification] = allNotifications;
	const latestTimestamp = latestNotification ? latestNotification.date : '';
	const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`);
	return response.notifications;
});

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState: [],
	reducers: {},
	extraReducers: {
		[fetchNotifications.fulfilled]: (state, { payload }) => {
			state.push(...payload);
			state.sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));
		},
	},
})

export default notificationsSlice.reducer;