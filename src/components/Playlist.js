import React, { Component } from 'react';
import playerApi from '../services/PlayerApi';
import playQueue from '../services/PlayQueue';
import Cover from './Cover';
import {formatSeconds} from '../utils/utils.js';
import '../App.css';

class Playlist extends Component{
    state = {
        images: null,
        tracks: [],
        name: null,
        playing: false
    }
    componentDidMount(){
        var {owner, id} = this.props.match.params;
        playerApi.getPlayList(owner, id)
            .then(result => {
                console.log('playlist: ', result);
                this.setState({
                    images: result.images,
                    name: result.name,
                    tracks: result.tracks.items
                });
            });
    }
    handlePlay = (event) => {
        var trackId = event.target.dataset.value;
        var trackIds = [], index;
        this.state.tracks.forEach(t => {
            if(t.track.preview_url) 
                trackIds.push(t.track.id);
        });
        playQueue.clear();
        playQueue.enqueueList(trackIds);
        index = trackIds.indexOf(trackId);
        if(index < 0){
            alert('Preview track not available');
            return;
        }
        playQueue.isPlayingAll = false;
        playQueue.playTrack(index);
    }  
    handlePlayAll = () => {
        var trackIds = [];
        this.state.tracks.forEach(t => {
            if(t.track.preview_url) 
                trackIds.push(t.track.id);
        });
        playQueue.clear();
        playQueue.enqueueList(trackIds);
        if(!trackIds.length){
            alert('Preview tracks not available');
            return;            
        }
        playQueue.isPlayingAll = true;
        playQueue.playTrack(0);
    }
    render(){
        return (
            <div>
                <header>
                    {this.state.images ?
                    <Cover images={this.state.images} className="cover" />
                    : ""
                    }
                    <h4>PLAYLIST</h4>
                    <h1>{this.state.name}</h1>
                    <div className="buttons">
                        <a onClick={this.handlePlayAll} className="button green">PLAY ALL</a>
                    </div>
                </header>            
                <hr/>
                <br/>
                <table className="tracks">
                    <thead>
                        <tr>
                            <th></th>
                            <th>TRACK</th>
                            <th>ARTIST</th>
                            <th>TIME</th>
                            <th>ALBUM</th>
                            <th>ADDED</th>
                        </tr>
                    </thead>
                    <tbody>
                        { this.state.tracks.map(t => 
                        <tr key={t.track.id} className={this.state.playing ? 'playing': ''} >
                            <td>
                                <a className="mousePointer" onClick={this.handlePlay}>
                                    <img data-value={t.track.id} alt="play" 
                                    src={`/images/${t.track.preview_url ? 'play-small' : 'play-disabled'}.png`} />
                                </a>
                            </td>
                            <td>
                                <a className="mousePointer" onClick={this.handlePlay} data-value={t.track.id}>{t.track.name}</a>
                            </td>
                            <td>
                                <a>{t.track.artists[0].name}</a>
                            </td>
                            <td className="nowrap">
                                { formatSeconds(t.track.duration_ms/1000)  }
                            </td>
                            <td>
                                <a>{t.track.album.name}</a>
                            </td>
                            <td className="nowrap">
                                {t.added_at}
                            </td>
                        </tr>
                        )}
                    </tbody>
                </table>
                <br/>
                <hr/>            
            </div>
        );
    }
}

export default Playlist;