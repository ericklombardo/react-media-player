import React, { Component } from 'react';
import {Redirect} from 'react-router-dom';
import auth from '../services/Auth';
import playerApi from '../services/PlayerApi';
import '../App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        var isAuthenticated = auth.isAuthenticated;
        this.state = {
            isAuthenticated : isAuthenticated
        };
        if(!isAuthenticated){
            window.addEventListener("message", this.callbackLogin.bind(this), false);        
        }
    }
    callbackLogin(event){
        if (event.origin !== process.env.REACT_APP_HOST){
            return;
        }
        var hash = event.data;
        if (hash.access_token) {
            auth.accessToken = {
                token: hash.access_token,
                validTo: hash.expires_in        
            }
            playerApi.getMe()
            .then(user => {
                console.log('user info', user);
                auth.userId = user.id;
                auth.userName = user.display_name;
                auth.userCountry = user.country;
                this.setState({isAuthenticated: true});
            });            
        }
    }
    handleLogin = () => {
        auth.openLogin();
    }
    render(){
        if(this.state.isAuthenticated){
            return <Redirect to="/player/search"/>;
        }
        return (
            <div className="fullview loginview">
                <div>
                    <div className="centered">
                        <div className="inner">
                            <h1>React Media Player</h1>
                            <p>
                                This demo explores the possibilities with the sporify Web API.
                                To view this demo you need to sign in with your spotify account.
                            </p>
                            <a onClick={this.handleLogin} className="button big green">Login</a>
                        </div>
                    </div>
                </div>
            </div>                           
        );    
    }
}

export default Login;