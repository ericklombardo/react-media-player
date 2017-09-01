import React, { Component } from 'react';

class Playlist extends Component{
    render(){
        return <h1>MyPlaylist {this.props.match.params.id}</h1>;
    }
}

export default Playlist;
