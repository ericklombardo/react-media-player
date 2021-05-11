import React, {Component} from 'react';
import auth from '../services/Auth';
import '../App.css';    

class Header extends Component{
    state = {
        userName: auth.userId
    }
    handleLogout = () => {
        auth.logout();
    }
    render(){
        return (
            <div className="topgroup">
                <div className="searchbox">
                    <input type="text" onChange={this.props.onSearch} placeholder="Search..." />
                </div>
                <div className="titlebox">
                    <a>REACT PLAYER APPLICATION</a>
                </div>
                <div className="userbox">
                    Signed in as <b><a>{this.state.userName}</a></b> 
                    {" "}<a onClick={this.handleLogout}>Log out</a>
                </div>
            </div>            
        );
    }
}

export default Header;