import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
// css
import 'bootswatch/dist/cosmo/bootstrap.min.css';
// apollo graphql client
import { ApolloProvider } from '@apollo/client';
import client from './graphql/client';

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
);
