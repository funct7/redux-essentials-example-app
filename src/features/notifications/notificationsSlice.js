import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const notificationsAdapter = createEntityAdapter({
	sortComparer(lhs, rhs) { return rhs.date.localeCompare(lhs.date); },
});


export const fetchNotifications = createAsyncThunk('notifications/fetchNotifications', async (_, { getState }) => {
	const allNotifications = selectAllNotifications(getState());
	const [latestNotification] = allNotifications;
	const latestTimestamp = latestNotification ? latestNotification.date : '';
	const response = await client.get(`/fakeApi/notifications?since=${latestTimestamp}`);
	return response.notifications;
});

const notificationsSlice = createSlice({
	name: 'notifications',
	initialState: notificationsAdapter.getInitialState(),
	reducers: {
		allNotificationsRead(state) {
			Object.values(state.entities).forEach(notification => notification.read = true);
		},
	},
	extraReducers: {
		[fetchNotifications.fulfilled]: (state, { payload }) => {
			Object
				.values(state.entities)
				.forEach(notification => notification.isNew = !notification.read);
			notificationsAdapter.upsertMany(state, payload);
		},
	},
})

export const { allNotificationsRead } = notificationsSlice.actions;

export default notificationsSlice.reducer;

export const { 
	selectAll: selectAllNotifications,
} = notificationsAdapter.getSelectors(state => state.notifications);