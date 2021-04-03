import Post from '../../models/Post.js';
const Querys = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find({});
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},
	},
};
export default Querys;