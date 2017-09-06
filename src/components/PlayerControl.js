import React, {Component} from 'react';
import audio from '../services/AudioAdapter';
import playQueue from '../services/PlayQueue';
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
            progress : audio.currentTime.toFixed(2)
        });
    }    
    onStartPlay = (progress, duration) => {        
        this.setState({
            progress: progress.toFixed(2),
            duration: duration.toFixed(2),
            playing: true
        });
        this.enableTick();
    }
    handleResume = () => {
        audio.resume();
        this.setState({
            playing : true
        });
        this.enableTick();
    }
    handlePause = () => {
        audio.pause();
        this.setState({
            playing : false
        });
        this.disableTick();
    }
    handlePrev = () => {
        playQueue.prevTrack()
            .then(track => audio.play(track.preview_url));
    }
    handleNext = () => {
        playQueue.nextTrack()
            .then(track => audio.play(track.preview_url));
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
                    <div className="progress">{ this.state.progress }</div>
                    <div className="duration">{ this.state.duration }</div>
                    <div className="slider">
                        <input type="range" onChange={this.handleChangeProgress} min="0" max={this.state.duration} />
                    </div>
                </div>
            </div>            
        );
    }
}

export default PlayerControl;