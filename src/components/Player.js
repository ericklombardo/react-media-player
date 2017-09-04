import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import PlayerControl from './PlayerControl';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import FeaturedPlaylists from './FeaturedPlaylists';
import playerApi from '../services/PlayerApi';
import {debounce} from '../utils/utils.js';

import '../App.css';

/**
 * Main container component.
 * This view represent the main app layout 
 */
class Player extends Component{
    state = {
        playlists : null,
        searchQuery : null
    }
    debounceSearch = debounce(value => {
        playerApi.search(value)
        .then(result => {
            console.log('result for ', value, result);
            this.setState({
                playlists : result.playlists,
                searchQuery : value            
            });
        });
    }, 500)    
    handleSearch = (event) => {
        var query = event.target.value;
        if (query.length < 4) return;
        this.debounceSearch(query);
    }
    render(){
        return (
            <div className="fullview playerview" >            
                <div>
                    <Header handleSearch={this.handleSearch} />
                    <div className="midgroup">
                        <Navbar />
                        <div className="mainview">
                            <Route path="/player/featured-playlists" component={FeaturedPlaylists} />
                            <Route path="/player/search" render={() =>
                                 <SearchResults playlists={this.state.playlists} searchQuery={this.state.searchQuery}/>
                                 }/>
                            <Route path="/player/playlists/:id" component={Playlist}/>
                        </div>
                    </div>
                    <PlayerControl />
                </div>
            </div>
        );
    }
}

export default Player;