import React, {Component} from 'react';
import {Route, Redirect} from 'react-router-dom';
import auth from '../services/Auth';

/**
 * Route for redirect to the login page if the user is not authenticated
 * https://reacttraining.com/react-router/web/example/auth-workflow
 */
class AuthenticatedRoute extends Component{
    render(){
        var { component: Component, ...rest } = this.props;

        return (
            <Route {...rest} render={props => (
                auth.isAuthenticated ? (
                <Component {...props}/>
                ) : (
                <Redirect to={{
                    pathname: '/login',
                    state: { from: props.location }
                }}/>
                )
            )}/>            
        );
    }
}

export default AuthenticatedRoute;