import React, { Component } from 'react';

class NotFound extends Component {
    render(){
        return <h3>No match for <code>{this.props.location.pathname}</code></h3>;
    }
}

export default NotFound;