import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';
import { readFile } from 'fs/promises';
import resolvers from './resolvers.js';
const cors = require('cors');

const PORT = 8000;
const app = express();

app.use(cors());


const typeDefs = await readFile('./schema.graphql', 'utf8');

const apolloServer = new ApolloServer({typeDefs, resolvers});
await apolloServer.start();

apolloServer.applyMiddleware({app, path: '/graphql'});

app.listen({port : PORT}, () => {
    console.log('Express running on port 8000');
    console.log(`GraphQL endpoint: http://localhost:${PORT}/graphql`);
});
