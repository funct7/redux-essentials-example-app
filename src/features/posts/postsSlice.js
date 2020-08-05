import { createSlice, nanoid, createAsyncThunk } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const initialReaction = {
	thumbsUp: 0,
	hooray: 0,
	heart: 0,
	rocket: 0,
	eyes: 0,
}
const initialState = {
	posts: [],
	status: 'idle',
	error: null,
}

export const addNewPost = createAsyncThunk('posts/addNewPost', async draft => {
	const response = await client.post('/fakeApi/posts', { post: draft });
	return response.post;
});

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	const response = await client.get('/fakeApi/posts');
	return response.posts;
});

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postUpdated(state, { payload: { id, title, content } }) {
			const existingPost = state.posts.find(post => post.id === id);
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
		reactionAdded(state, { payload: { postId, reaction } }) {
			const existingPost = state.posts.find(post => post.id === postId);
			if (existingPost) existingPost.reactions[reaction]++;
		},
	},
	extraReducers: {
		[fetchPosts.pending]: state => {
			state.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, action) => {
			state.status = 'succeeded';
			state.posts = state.posts.concat(action.payload);
		},
		[fetchPosts.rejected]: (state, action) => {
			state.status = 'failed';
			state.error = action.error.message;
		},
		[addNewPost.fulfilled]: (state, { payload }) => {
			state.posts.push(payload);
		},
	},
});

export default postsSlice.reducer;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const selectAllPosts = state => state.posts.posts;
export const selectPostById = postId => state => state.posts.posts.find(post => post.id === postId);