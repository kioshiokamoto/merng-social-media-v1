import { ApolloServer, PubSub } from 'apollo-server';

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

//Tipos y metodos para ApolloServer!
import typeDefs  from './graphql/typeDefs.js';
import resolvers from './graphql/resolvers/index.js';

const pubsub = new PubSub();

const server = new ApolloServer({
	typeDefs,
	resolvers,
	context:({req})=>({req,pubsub})
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
	})
	.catch((e) => {
		console.log('Error: ', e);
	});
