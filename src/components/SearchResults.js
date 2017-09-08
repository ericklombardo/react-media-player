import React, { Component } from 'react';
import SearchItem from './SearchItem';
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
                      ? this.props.playlists.items.map(p =>
                        <SearchItem key={p.id} item={p} url={`/player/playlists/${p.owner.id}/${p.id}`} />)
                      : <h3>Not playlists founded</h3>
                    }
                    <hr/>
                </ul>            
            </div>
        );
    }
}

export default SearchResults;