import React from 'react'

// React DOM

import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'

// Components

import Home from './pages/home/Home'
import Signup from './pages/signup/Signup'
import Login from './pages/login/Login'


//  Navbar

import Navbar from './components/Navbar';

function App() {
  return (
    <div className="App">
      <Router>
        <Navbar />
        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
        </Switch>
        <Route path="/login">
          <Login />
        </Route>
      </Router>
    </div>
  );
}

export default App;
