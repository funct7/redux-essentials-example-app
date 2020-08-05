import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectAllPosts, fetchPosts } from './postsSlice';
import { PostExcerpt } from './PostExcerpt';

const MemoizedPostExcerpt = React.memo(PostExcerpt);

export const PostsList = () => {
	const dispatch = useDispatch();
	const posts = useSelector(selectAllPosts);
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
			const orderedPosts = posts.slice().sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));
			// ??: How do components know about the state? Where is the canonical document on what states are available?
			content = orderedPosts.map(post => (<MemoizedPostExcerpt key={post.id} post={post} />));
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