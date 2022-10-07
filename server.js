import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { readFile } from 'fs/promises';
import resolvers from './resolvers.js';

const PORT = 4000;
const app = express();



const typeDefs = await readFile('./schema.graphql', 'utf8');

const apolloServer = new ApolloServer({typeDefs, resolvers});
await apolloServer.start();
apolloServer.applyMiddleware({app, path: '/graphql'});
app.listen({port : PORT}, () => {
    console.log('Express running on port 4000');
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
