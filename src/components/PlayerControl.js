import React, {Component} from 'react';
import audio from '../services/AudioAdapter';
import playQueue from '../services/PlayQueue';
import {formatSeconds} from '../utils/utils.js';
import '../App.css';

class PlayerControl extends Component{
    constructor (props){
        super(props);
        this.tickTimer = 0;
        this.state = {
            progress: 0,
            duration: 0,
            playing: false
        };            
        audio.onStartPlay = this.onStartPlay;
        audio.onEndedPlay = this.onEndedPlay;
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
        if (!audio.isPlaying) {
            return;
        }
        this.setState({
            progress : audio.currentTime
        });
    }    
    onStartPlay = (progress, duration) => {        
        this.setState({
            progress: progress,
            duration: duration,
            playing: true
        });
        this.enableTick();
    }
    onEndedPlay = () => {
        this.setState({
            progress: 0,
            playing: false
        });
        if(playQueue.isPlayingAll){
            playQueue.nextTrack();
        }
        else{
            this.disableTick();        
        }
    }
    handleResume = () => {
        if(audio.resume()){
            this.setState({
                playing : true
            });
            this.enableTick();
        }
    }
    handlePause = () => {
        if(audio.pause()){
            this.setState({
                playing : false
            });
            this.disableTick();
        }
    }
    handlePrev = () => {
        playQueue.prevTrack();
    }
    handleNext = () => {
        playQueue.nextTrack();
    }
    handleChangeVolume = (event) => {
        audio.changeVolume(event.target.value);
    }
    handleChangeProgress = (event) => {
        audio.changeProgress(event.target.value);
    }
    render(){
        return (
            <div className="bottomgroup">
                <div className="leftcontrols">
                    <div className="prevbutton">
                        <a onClick={this.handlePrev}><img alt="previous" src="/images/btn-prev.png" /></a>
                    </div>
                    <div className="playbutton">
                        { !this.state.playing ?
                        <a onClick={this.handleResume}><img alt="play" src="/images/btn-play.png" /></a> :
                        <a onClick={this.handlePause}><img alt="pause" src="/images/btn-pause.png" /></a>
                        }
                    </div>
                    <div className="nextbutton">
                        <a onClick={this.handleNext}><img alt="" src="/images/btn-next.png" /></a>
                    </div>
                    <div className="volume">
                        <input type="range" onChange={this.handleChangeVolume} min="0" max="100" />
                    </div>
                </div>
                <div className="seekcontrols">
                    <div className="progress">{ formatSeconds(this.state.progress) }</div>
                    <div className="duration">{ formatSeconds(this.state.duration) }</div>
                    <div className="slider">
                        <input type="range" value={this.state.progress} onChange={this.handleChangeProgress} min="0" max={this.state.duration} />
                    </div>
                </div>
            </div>            
        );
    }
}

export default PlayerControl;