import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { selectAllPosts } from './postsSlice';

export const PostsList = () => {
	const posts = useSelector(selectAllPosts);
	const orderedPosts = posts.slice().sort((lhs, rhs) => rhs.date.localeCompare(lhs.date));

	// ??: How do components know about the state? Where is the canonical document on what states are available?
	const renderedPosts = orderedPosts.map(post => (
		<article className="post-excerpt">
			<h3>{post.title}</h3>
			<div>
				<PostAuthor userId={post.user} />
				<TimeAgo timestamp={post.date} />
			</div>
			<p>{post.content.substring(0, 100)}</p>
			<ReactionButtons post={post} />
			<Link to={`/posts/${post.id}`} className="button muted-button">
				View Post
			</Link>
		</article>
	));

	return (
		<section>
			<h2>Posts</h2>
			{renderedPosts}
		</section>
	);
};