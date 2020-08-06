import { createEntityAdapter, createSlice, createAsyncThunk, createSelector } from '@reduxjs/toolkit';
import { client } from '../../api/client';

const postsAdapter = createEntityAdapter({
	sortComparer: (lhs, rhs) => rhs.date.localeCompare(lhs.date),
});

const initialState = postsAdapter.getInitialState({
	status: 'idle',
	error: null,
});

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
			const existingPost = state.entities[id];
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
		reactionAdded(state, { payload: { postId, reaction } }) {
			const existingPost = state.entities[postId];
			if (existingPost) existingPost.reactions[reaction]++;
		},
	},
	extraReducers: {
		[fetchPosts.pending]: state => {
			state.status = 'loading';
		},
		[fetchPosts.fulfilled]: (state, { payload }) => {
			state.status = 'succeeded';
			postsAdapter.upsertMany(state, payload);
		},
		[fetchPosts.rejected]: (state, { error }) => {
			state.status = 'failed';
			state.error = error.message;
		},
		[addNewPost.fulfilled]: postsAdapter.addOne,
	},
});

export default postsSlice.reducer;
export const { postUpdated, reactionAdded } = postsSlice.actions;
export const {
	selectAll: selectAllPosts,
	selectById: selectPostById,
	selectIds: selectPostIds,
} = postsAdapter.getSelectors(state => state.posts);

export const selectPostByUser = createSelector(
	[selectAllPosts, (_, userId) => userId,],
	(posts, userId) => posts.filter(post => post.user === userId));