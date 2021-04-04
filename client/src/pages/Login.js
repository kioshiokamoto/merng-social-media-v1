import { gql } from 'apollo-server-core';
import React, { useState } from 'react';
import { Button, Form } from 'semantic-ui-react';
import { useMutation } from '@apollo/react-hooks';
import { useForm } from '../util/hooks';

const Login = (props) => {
	const [errors, setErrors] = useState({});

	const { onChange, onSubmit, value } = useForm(loginUserCallback, {
		username: '',
		password: '',
	});

	const [loginUser, { loading }] = useMutation(LOGIN_USER, {
		update(_, result) {
			props.history.push('/');
		},
		onError(err) {
			setErrors(err.graphQLErrors[0].extensions.exception.errors);
		},
		variables: value,
	});
	function loginUserCallback() {
		loginUser();
	}

	return (
		<div className="form-container">
			<Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
				<h1>Login</h1>
				<Form.Input
					label="Username"
					placeholder="Username... "
					name="username"
					value={value.username}
					onChange={onChange}
					error={errors.username ? true : false}
				/>
				<Form.Input
					label="Password"
					placeholder="Password... "
					name="password"
					value={value.password}
					onChange={onChange}
					type="password"
					error={errors.password ? true : false}
				/>

				<Button type="submit" primary>
					Login
				</Button>
			</Form>
			{Object.keys(errors).length > 0 && (
				<div className="ui error message">
					<ul className="list">
						{Object.values(errors).map((value) => (
							<li key={value}>{value}</li>
						))}
					</ul>
				</div>
			)}
		</div>
	);
};

const LOGIN_USER = gql`
	mutation login($username: String!, $password: String!) {
		login(username: $username, password: $password) {
			id
			email
			username
			createdAt
			token
		}
	}
`;

export default Login;
