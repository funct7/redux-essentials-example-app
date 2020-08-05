import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialReaction = {
	thumbsUp: 0,
	hooray: 0,
	heart: 0,
	rocket: 0,
	eyes: 0,
}
const initialState = [
	{ id: '1', title: 'First Post!', content: 'Hello!', user: '1', date: new Date().toISOString(), reactions: initialReaction, },
	{ id: '2', title: 'Second Post', content: 'More text', user: '2', date: new Date().toISOString(), reactions: initialReaction, },
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload);
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
			const existingPost = state.find(post => post.id === id);
			if (existingPost) {
				existingPost.title = title;
				existingPost.content = content;
			}
		},
		reactionAdded(state, { payload: { postId, reaction } }) {
			const existingPost = state.find(post => post.id === postId);
			if (existingPost) existingPost.reactions[reaction]++;
		},
	},
});

export default postsSlice.reducer;
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions;
export const selectAllPosts = state => state.posts;
export const selectPostById = (state, postId) => state.posts.find(post => post.id === postId);