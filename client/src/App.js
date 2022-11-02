import { ApolloClient, InMemoryCache, ApolloProvider, HttpLink, from } from '@apollo/client';
import {onError} from '@apollo/client/link/error';
import {useRef} from 'react';
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./dashboard";
import Login from './login';

import Result from "./components/result";


const errorLink = onError(({ graphqlErrors, networkError}) => {
  if (graphqlErrors) {
    graphqlErrors.map(({message, location, path}) => {
      alert(`Graphql error ${message}`)
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({uri : 'http://localhost:8000/graphql'})
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});



function App() {
  return (
        <Router>
          <Routes>
        <Route exact path='/login' element={<Login />} />
        <Route path='/dashboard' element={<Dashboard/>} />
          </Routes>
        </Router>
  );
}

export default App;
