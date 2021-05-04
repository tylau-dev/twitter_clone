import { InMemoryCache, ApolloClient, ApolloProvider, HttpLink } from '@apollo/client';
import React from 'react';
import './App.css';
import Users from './components/Users'
import Landing from './components/Landing'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { setContext } from 'apollo-link-context'
import Login from './pages/Login';
import Signup from './pages/Signup'
import IsAuthenticated from './components/IsAuthenticated';

// Connexion to the Appolo server
// const client = new ApolloClient({
//   uri: "http://localhost:4000",
//   cache: new InMemoryCache(),

// })

const httpLink = new HttpLink({ uri: 'http://localhost:4000' })
const authLink = setContext(async (req, { headers }) => {
  const token = localStorage.getItem('token')
  return {
    ...headers,
    headers: {
      Authorization: token ? `Bearer ${token}` : null
    }
  }
})

const link = authLink.concat(httpLink as any)
const client = new ApolloClient({
  link: (link as any),
  cache: new InMemoryCache()
})


function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <Switch>
          <Route path="/landing">
            <Landing />
          </Route>
          <Route exact path="/signup">
            <Signup />
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <IsAuthenticated>
            <Route exact path="/users">
              <Users />
            </Route>
          </IsAuthenticated>
        </Switch>
      </Router>
    </ApolloProvider>
  );
}

export default App;
