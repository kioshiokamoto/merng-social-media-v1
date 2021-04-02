import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

import Post from './models/Post.js'
import User from './models/User.js'


const typeDefs = gql`
    type Post{
        id:ID!
        body:String!
        createdAt:String!
        username:String!
    }
	type Query {
		getPosts: [Post]
	}
`;

const resolvers = {
	Query: {
		async getPosts(){
            try {
                const posts= await Post.find({});
                return posts
            } catch (error) {
                throw new Error(error);
            }
        }
	},
};

const server = new ApolloServer({
	typeDefs,
	resolvers,
});

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
        console.log(`MongoDB connected`);
		return server.listen({ port: 5000 });
	})
	.then((res) => {
		console.log(`Server running at ${res.url}`);
	}).catch(e=>{
        console.log('Error: ', e)
    });
