import { ApolloServer } from 'apollo-server';
import gql from 'graphql-tag';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const typeDefs = gql`
	type Query {
		sayHi: String!
	}
`;

const resolvers = {
	Query: {
		sayHi: () => 'Hello world',
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
