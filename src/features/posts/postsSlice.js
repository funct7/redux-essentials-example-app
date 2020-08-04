import { createSlice, nanoid } from '@reduxjs/toolkit';

const initialState = [
	{ id: '1', title: 'First Post!', content: 'Hello!', },
	{ id: '2', title: 'Second Post', content: 'More text', },
];

const postsSlice = createSlice({
	name: 'posts',
	initialState,
	reducers: {
		postAdded: {
			reducer(state, action) {
				state.push(action.payload);
			},
			prepare(title, content) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
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
	},
});

export default postsSlice.reducer;
export const { postAdded, postUpdated } = postsSlice.actions;