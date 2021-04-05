import React from 'react';
import { Button, Form } from 'semantic-ui-react';
import { gql } from 'graphql-tag';
import { useMutation } from '@apollo/react-hooks';

import { FETCH_POST_QUERY } from '../util/graphql';

import { useForm } from '../util/hooks';
const PostForm = () => {
	const { value, onChange, onSubmit } = useForm(createPostCallback, {
		body: '',
	});

	const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
		variables: value,
		update: (proxy, result) => {
			const data = proxy.readQuery({
				query: FETCH_POST_QUERY,
			});
			data.getPosts = [result.data.createPost, ...data.getPosts];
			proxy.writeQuery({ query: FETCH_POST_QUERY, data });
			value.body = '';
		},
	});

	function createPostCallback() {
		createPost();
	}

	return (
		<Form onSubmit={onSubmit}>
			<h2>Create a post:</h2>
			<Form.Field>
				<Form.Input placeholder="Hi world!" name="body" onChange={onChange} value={value.body} />
				<Button type="submit" color="teal">
					Submit
				</Button>
			</Form.Field>
		</Form>
	);
};
const CREATE_POST_MUTATION = gql`
	mutation createPost($body: String!) {
		createPost(body: $body) {
			id
			body
			createdAt
			username
			likes {
				id
				username
				createdAt
			}
			likeCount
			comments {
				id
				body
				username
				createdAt
			}
			commentCount
		}
	}
`;
export default PostForm;
