import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPosts, selectPostIds } from './postsSlice';
import { PostExcerpt } from './PostExcerpt';

export const PostsList = () => {
	const dispatch = useDispatch();
	const orderedPostIds = useSelector(selectPostIds);
	const postStatus = useSelector(state => state.posts.status);
	const error = useSelector(state => state.posts.error);

	useEffect(() => {
		if (postStatus === 'idle') dispatch(fetchPosts());
	}, [postStatus, dispatch]);

	let content;

	switch (postStatus) {
		case 'loading': {
			content = <div className="loader">Loading...</div>
			break;
		}
		case 'succeeded': {
			// ??: How do components know about the state? Where is the canonical document on what states are available?
			content = orderedPostIds.map(postId => (<PostExcerpt key={postId} postId={postId} />));
			break;
		}
		case 'failed': {
			content = <div>{error}</div>
		}
	}


	return (
		<section className="posts-list">
			<h2>Posts</h2>
			{content}
		</section>
	);
};