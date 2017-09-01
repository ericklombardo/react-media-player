import React, { Component } from 'react';
import {Route, Switch} from 'react-router-dom';
import Login from './components/Login';
import Player from './components/Player';
import NotFound from './components/NotFound';
import AuthenticatedRoute from './components/AuthenticatedRoute'

class App extends Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={Login}/>
        <AuthenticatedRoute path="/player" component={Player}/>                      
        <Route component={NotFound}/>
      </Switch>
    );
  }
}

export default App;