import { createSlice, nanoid } from '@reduxjs/toolkit';

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

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.posts.push(action.payload);
			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						date: new Date().toISOString(),
						title,
						content,
						user: userId,
						reaction: initialReaction,
					},
				}
			},
		},
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
});

export default postsSlice.reducer;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const selectAllPosts = state => state.posts.posts;
export const selectPostById = (state, postId) => state.posts.posts.find(post => post.id === postId);