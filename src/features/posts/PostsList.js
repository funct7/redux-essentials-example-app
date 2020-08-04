import React from 'react';
import { useSelector } from 'react-redux';

export const PostsList = () => {
	const posts = useSelector(state => state.posts);

	// ??: How do components know about the state? Where is the canonical document on what states are available?
	const renderedPosts = posts.map(post => (
		<article className="post-excerpt">
			<h3>{post.title}</h3>
			<p>{post.content.substring(0, 100)}</p>
		</article>
	));

	return (
		<section>
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	);
};