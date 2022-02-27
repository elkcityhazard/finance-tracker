import React from 'react'

//  Get Access To AUTH_IS_READY and User 
import { useAuthContext } from './hooks/useAuthContext'

// React DOM

import { BrowserRouter as Router, Switch, Route, Link, Redirect } from 'react-router-dom'

// Components

import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'


//  Navbar

import Navbar from './components/Navbar';

function App() {

  const { authIsReady, user } = useAuthContext()

  return (
    <div className="App">
      {authIsReady && (
        <Router>
          <Navbar />
          <Switch>
            <Route exact path="/">
              {!user && <Redirect to="/login" />}
              {user &&
                <Home />
              }
            </Route>
            <Route path="/signup" >
              {!user &&
                <Signup />
              }
              {user && <Redirect to="/" />}
            </Route>
          </Switch>
          <Route path="/login">
            {user && <Redirect to="/" />}
            {!user &&
              <Login />
            }
          </Route>
        </Router>
      )}
    </div>
  );
}

export default App;
