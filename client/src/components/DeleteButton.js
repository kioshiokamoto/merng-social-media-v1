import React, { useState } from 'react';
import { Button, Icon, Confirm } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { FETCH_POST_QUERY } from '../util/graphql';

const DeleteButton = ({ postId, commentId, callback }) => {
	const [confirmOpen, setConfirmOpen] = useState(false);

	const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
	const [deletePostOrMutation] = useMutation(mutation, {
		variables: {
			postId,
			commentId
		},
		update(proxy) {
			setConfirmOpen(false);
			if(!commentId){
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
			<Button as="div" color="red" onClick={() => setConfirmOpen(true)} floated="right">
				<Icon name="trash" style={{ margin: 0 }} />
			</Button>
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
