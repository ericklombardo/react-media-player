import React, {Component} from 'react';
import playerApi from '../services/PlayerApi';
import '../App.css';

class PlayerControl extends Component{
    state = {
        progress: 0,
        duration: 0,
        playing: false
    }
    componentDidMount(){
        this.audio = new Audio();
        this.audio.addEventListener('loadedmetadata', this.onLoadedMetadata, false);
        this.audio.addEventListener('ended', this.onEnded, false);
        this.playing = false;
		this.volume = 100;
		this.progress = 0;
		this.duration = 0;
        this.track = null;
        this.tickTimer = 0;
    }
    enableTick() {
        this.disableTick();
        this.tickTimer = setInterval(() => this.tick(), 100);
    }
    disableTick() {
        if (this.tickTimer !== 0) {
            clearInterval(this.tickTimer);
        }
    }
    tick() {
        if (!this.playing) {
            return;
        }
        this.progress = this.audio.currentTime * 1000.0;
        this.props.onTrackProgress(this.progress);
    }    
    onLoadedMetadata = () => {
        this.duration = this.audio.duration * 1000.0;
        this.audio.volume = this.volume / 100.0;            
        this.progress = 0;
        this.audio.play();              
        this.props.onTrackProgress(this.progress);
        this.enableTick();                  
        this.props.onPlay();
    }    
    onEnded = () => {
        this.playing = false;
        this.track = null;
        this.disableTick();
        this.props.onEndtrack();
    }
    play = () => {
        var trackId = this.props.trackId;
        if(!trackId) return;
        console.log('Playback::startPlaying', trackId);
        this.track = null;
        this.playing = true;
        this.progress = 0;
        this.setState({
            playing: true,
            progress: 0
        });
        playerApi.getTrack(trackId).then(trackData => {
            console.log('playback got track', trackData);
            this.track = trackData;
            if (this.audio.src !== null) {
                this.audio.pause();
                this.audio.src = null;
            }
            this.audio.src = trackData.preview_url;    
        });
    }        
    pause = () => {

    }
    prev = () => {

    }
    next = () => {

    }
    changeVolume = () => {

    }
    changeProgress = () => {

    }
    render(){
        return (
            <div className="bottomgroup">
                <div className="leftcontrols">
                    <div className="prevbutton">
                        <a onClick={this.prev}><img alt="previous" src="/images/btn-prev.png" /></a>
                    </div>
                    <div className="playbutton">
                        { !this.state.playing ?
                        <a onClick={this.play}><img alt="play" src="/images/btn-play.png" /></a> :
                        <a onClick={this.pause}><img alt="pause" src="/images/btn-pause.png" /></a>
                        }
                    </div>
                    <div className="nextbutton">
                        <a onClick={this.next}><img alt="" src="/images/btn-next.png" /></a>
                    </div>
                    <div className="volume">
                        <input type="range" onChange={this.changeVolume} min="0" max="100" />
                    </div>
                </div>
                <div className="seekcontrols">
                    <div className="progress">{ this.state.progress }</div>
                    <div className="duration">{ this.state.duration }</div>
                    <div className="slider">
                        <input type="range" onChange={this.changeProgress} min="0" max={this.state.duration} />
                    </div>
                </div>
            </div>            
        );
    }
}

export default PlayerControl;