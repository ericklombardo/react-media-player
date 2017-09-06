import React, { Component } from 'react';
import SearchItem from './SearchItem';
import playerApi from '../services/PlayerApi';
import '../App.css';

class FeaturedPlaylists extends Component{
    state = {
        playlists: null,
        title: null
    }
    componentDidMount(){
        playerApi.getFeaturedPlaylists()
            .then(result => {
                this.setState({
                    playlists: result.playlists.items,
                    title: result.message
                });
            });
    }    
    render(){
        return (
            <div>
                <h1>{this.state.title}</h1>
                <hr/><br/>
                <ul className="playlists">
                    <h4>PLAYLISTS</h4>
                    <br/>
                    { this.state.playlists && this.state.playlists.length 
                      ? this.state.playlists.map(p =>
                        <SearchItem key={p.id} item={p} url={`/player/playlists/${p.owner.id}/${p.id}`} />)
                      : ''
                    }
                    <hr/>
                </ul>            
            </div>
        );
    }
}

export default FeaturedPlaylists;