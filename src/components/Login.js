import React, { Component } from 'react';
import auth from '../services/Auth';
import '../App.css';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLogin : false
        };
        this.handleLogin = this.handleLogin.bind(this);
        window.addEventListener("message", this.callbackLogin, false);        
    }
    callbackLogin(event){
        console.log('got postmessage', event);
        return;
        var hash = JSON.parse(event.data);
        if (hash.type === 'access_token') {
            auth.accessToken = {token: hash.access_token, validTo: hash.expires_in || 60};
            //checkUser(true);
            this.setState({isLogin: true});
        }
    }
    handleLogin(event){
        auth.openLogin();
    }
    render(){
        if (this.state.isLogin){
            return <h3>User is Login</h3>;
        }
        else{
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
}

export default Login;