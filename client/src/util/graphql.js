import gql from 'graphql-tag';
export const FETCH_POST_QUERY = gql`
	query posts{
		getPosts {
			id
			body
			createdAt
			username
			likeCount
			likes {
				username
			}
			commentCount
			comments {
				id
				username
				createdAt
				body
			}
		}
	}
`;
