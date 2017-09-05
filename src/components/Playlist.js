import React, { Component } from 'react';
import playerApi from '../services/PlayerApi';
import Cover from './Cover';
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
                        <a onClick={this.props.playAll} className="button green">PLAY ALL</a>
                    </div>
                </header>            
                <hr/>
                <br/>
                <table className="tracks">
                    <thead>
                        <tr>
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
                                <a className="mousePointer" onClick={this.props.onPlay} data-value={t.track.id}>{t.track.name}</a>
                            </td>
                            <td>
                                <a>{t.track.artists[0].name}</a>
                            </td>
                            <td className="nowrap">
                                { t.track.duration_ms  }
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