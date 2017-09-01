import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Player from './components/Player';
import AuthenticatedRoute from './components/AuthenticatedRoute'

class App extends Component {
  render() {
    return (
      <Switch>
        <AuthenticatedRoute exact path="/" component={Player}/>
        <Route path="/login" component={Login}/>              
      </Switch>
    );
  }
}

export default App;