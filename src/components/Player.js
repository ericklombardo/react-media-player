import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import Header from './Header';
import Navbar from './Navbar';
import PlayerControl from './PlayerControl';
import SearchResults from './SearchResults';
import Playlist from './Playlist';
import '../App.css';

class Player extends Component{
    render(){
        return (
            <div className="fullview playerview" >            
                <div>
                    <Header />
                    <div className="midgroup">
                        <Navbar />
                        <div className="mainview">
                            <Route path="/player/search" component={SearchResults}/>
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