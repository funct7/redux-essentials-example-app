
import { createSlice } from '@reduxjs/toolkit';

const initialState = [
	{ id: '0', name: 'ZERO ZERO', },
	{ id: '1', name: 'One name', },
	{ id: '2', name: 'Name two', },
];

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
});

export default usersSlice.reducer;