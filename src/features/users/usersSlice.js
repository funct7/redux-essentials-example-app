
import { createSlice, createAsyncThunk, createEntityAdapter } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const usersAdapter = createEntityAdapter();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
	const response = await client.get('/fakeApi/users');
	return response.users;
});

const usersSlice = createSlice({
	name: 'users',
	initialState: usersAdapter.getInitialState(),
	reducers: {},
	extraReducers: {
		[fetchUsers.fulfilled]: usersAdapter.setAll,
	}
});

export default usersSlice.reducer;
export const { 
	selectAll: selectAllUsers,
	selectById: selectUserById,
} = usersAdapter.getSelectors(state => state.users);
