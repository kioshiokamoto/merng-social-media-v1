import postsResolvers from './posts.js';
import usersResolvers from './users.js';
import commentsResolvers from './comments.js';


const resolvers = {
    Post:{
        likeCount:(parent)=> parent.likes.length,
        commentCount:(parent)=> parent.comments.length
    },
    Query:{
        ...postsResolvers.Query
    },
    Mutation:{
        ...usersResolvers.Mutation,
        ...postsResolvers.Mutation,
        ...commentsResolvers.Mutation
    },
	Subscription:{
        ...postsResolvers.Subscription
    }

}

export default resolvers;