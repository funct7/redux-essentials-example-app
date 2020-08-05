import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { PostAuthor } from './PostAuthor';
import { ReactionButtons } from './ReactionButtons';
import { selectPostById } from './postsSlice';

export const SinglePostPage = ({ match }) => {
	const { postId } = match.params;
	const post = useSelector(selectPostById(postId));

	if (post) {
		return (
			<section>
				<article className="post">
					<h2>{post.title}</h2>
					<p className="post-content">
						{post.content}
						<div> <PostAuthor userId={post.user} /> </div>
					</p>
					<ReactionButtons post={post} />
					<Link to={`/editPost/${post.id}`} className="button">Edit Post</Link>
				</article>
			</section >
		)
	} else {
		return (
			<sction><h2>Post not found!</h2></sction>
		)
	}
};