import React from 'react';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { TimeAgo } from './TimeAgo';
import { ReactionButtons } from './ReactionButtons';
import { useSelector } from 'react-redux';
import { selectPostById } from './postsSlice';

export const PostExcerpt = ({ postId }) => {
	const post = useSelector(state => selectPostById(state, postId));
	
	return (
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
	);
};