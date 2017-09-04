import React, { Component } from 'react';
import PlaylistItem from './PlaylistItem';
import '../App.css';

class SearchResults extends Component{
    render(){
        return (
            <div>
                <h1>Showing results for {this.props.searchQuery}</h1>
                <hr/>
                <ul className="playlists">
                    <h4>PLAYLISTS</h4>
                    <br/>
                    { this.props.playlists && this.props.playlists.items.length 
                      ? this.props.playlists.items.map(p => <PlaylistItem key={p.id} item={p} />)
                      : ''
                    }
                    <hr/>
                </ul>            
            </div>
        );
    }
}

export default SearchResults;