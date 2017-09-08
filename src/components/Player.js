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
 * This UI represent the main app layout and player workflow
 */
class Player extends Component{
    state = {
        playlists : null,
        artists : null,
        searchQuery : null
    }
    debounceSearch = debounce(value => {
        playerApi.search(value)
        .then(result => {            
            let {history, location: {pathname: path} } = this.props;
            let searchPath = '/player/search';
                        
            if(path !== searchPath){
                history.push(searchPath);
            }
            this.setState({
                playlists : result.playlists,
                artists : result.artists,
                searchQuery : value            
            });
            console.log('result for ', value, result);
        });
    }, 500)    
    handleSearch = (event) => {
        var query = event.target.value;
        if (query.length < 4) {
            if(!query.length){
                this.setState({
                    playlists : null,
                    artists : null,
                    searchQuery : null            
                });                    
            }
            return;
        }
        this.debounceSearch(query);
    }
    render(){
        return (
            <div className="fullview playerview" >            
                <div>
                    <Header onSearch={this.handleSearch} />
                    <div className="midgroup">
                        <Navbar />
                        <div className="mainview">
                            <Route path="/player/featured-playlists" component={FeaturedPlaylists} />
                            <Route path="/player/search" render={props =>
                                 <SearchResults {...props} playlists={this.state.playlists} artists={this.state.artists}
                                                searchQuery={this.state.searchQuery} />
                                 }/>
                            <Route path="/player/playlists/:owner/:id" component={Playlist} />
                        </div>
                    </div>
                    <PlayerControl />
                </div>
            </div>
        );
    }
}

export default Player;