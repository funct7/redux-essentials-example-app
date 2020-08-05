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
	reducers: {
		allNotificationsRead(state) {
			state.forEach(notification => notification.read = true);
		},
	},
	extraReducers: {
		[fetchNotifications.fulfilled]: (state, { payload }) => {
			state.forEach(notification => notification.isNew = !notification.read);
			state.push(...payload);
			state.sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));
		},
	},
})

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;