import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';
import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';
import { FETCH_POST_QUERY } from '../util/graphql';
import MyPopup from '../util/MyPopup';

const DeleteButton = ({ postId, commentId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
	const [deletePostOrMutation] = useMutation(mutation, {
		variables: {
			postId,
			commentId,
		},
		update(proxy) {
			setConfirmOpen(false);
			if (!commentId) {
				const data = proxy.readQuery({
					query: FETCH_POST_QUERY,
				});
				data.getPosts.push(data);
				proxy.writeQuery({ query: FETCH_POST_QUERY, data });
			}

			if (callback) {
				callback();
			}
		},
		refetchQueries: [{ query: FETCH_POST_QUERY }],
	});
	return (
		<>
			<MyPopup content={commentId ? 'Delete comment' : 'Delete post'}>
				<Button as="div" color="red" onClick={() => setConfirmOpen(true)} floated="right">
					<Icon name="trash" style={{ margin: 0 }} />
				</Button>
			</MyPopup>

			<Confirm open={confirmOpen} onCancel={() => setConfirmOpen(false)} onConfirm={deletePostOrMutation} />
		</>
	);
};

const DELETE_POST_MUTATION = gql`
	mutation deletePost($postId: ID!) {
		deletePost(postId: $postId)
	}
`;
const DELETE_COMMENT_MUTATION = gql`
	mutation deleteComment($postId: ID!, $commentId: ID!) {
		deleteComment(postId: $postId, commentId: $commentId) {
			id
			comments {
				id
				username
				createdAt
				body
			}
			commentCount
		}
	}
`;

export default DeleteButton;
