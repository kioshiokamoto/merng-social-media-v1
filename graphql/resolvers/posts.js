import Post from '../../models/Post.js';
import { checkAuth } from '../../util/check-auth.js';
import { AuthenticationError  } from 'apollo-server'

const Querys = {
	Query: {
		async getPosts() {
			try {
				const posts = await Post.find().sort({ createdAt : -1 });
				return posts;
			} catch (error) {
				throw new Error(error);
			}
		},
		async getPost(_, { postId }) {
			try {
				const post = await Post.findById(postId);

				if (post) {
					return post;
				} else {
					throw new Error('Post not found');
				}
			} catch (error) {
				throw new Error(error);
			}
		},
	},
	Mutation:{
		async createPost(_,{body},context){
			const user = checkAuth(context)
			const newPost = new Post({
				body,
				user:user.id,
				username:user.username,
				createdAt:new Date().toISOString()
			});

			const post = await newPost.save();
			
			context.pubsub.publish('NEW_POST',{
				newPost:post
			})

			return post;
		},
		async deletePost(_,{postId},context){
			const user = checkAuth(context);
			try {
				const post = await Post.findById(postId);
				if(user.username===post.username){
					await post.delete();
					return 'Post deleted successfully';
				}else{
					throw new AuthenticationError('Action not allowed');
				}
			} catch (error) {
				throw new Error(error);
			}
		}
	},
	Subscription:{
		newPost:{
			subscribe: (_,__	,{pubsub})=>pubsub.asyncIterator('NEW_POST')
		}
	}
};
export default Querys;
