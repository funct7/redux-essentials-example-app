import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { postUpdated, selectPostById } from './postsSlice';

export const EditPostForm = ({ match }) => {
	const { postId } = match.params;

	// Note: If post object changes, all components will have to make adjusting changes
	// Note: Notice how this form is almost identical to the AddPostForm, but has to build everything from scratch.
	const post = useSelector(state => selectPostById(state, postId));

	const [title, setTitle] = useState(post.title);
	const [content, setContent] = useState(post.content);

	const dispatch = useDispatch();
	const history = useHistory();

	const onTitleChanged = e => setTitle(e.target.value);
	const onContentChanged = e => setContent(e.target.value);

	const onSavePostClicked = () => {
		if (!title || !content) return;
		dispatch(postUpdated({ id: postId, title, content }));
		// Note: if the routing address scheme changes, all components will be affected.
		history.push(`/posts/${postId}`);
	};

	return (
		<section>
			<h2>Edit Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input type="text" id="postTitle" name="postTitle"
					placeholder="What's on your mind?"
					value={title}
					onChange={onTitleChanged} />
				<label htmlFor="postContent">Content:</label>
				<textarea id="postContent" name="postContent" value={content} onChange={onContentChanged} />
			</form>
			<button type="button" onClick={onSavePostClicked}>Save Post</button>
		</section >
	)
};