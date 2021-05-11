import playerApi from './PlayerApi';
import audio from '../services/AudioAdapter';

/**
 * Manage tracks queue for playing
 */
class PlayQueue {
    constructor(){
        if(this.instance){
            return this.instance;
        }
        this.queue = [];
        this.playTrackCb = null;
        this.position = 0;
        this.currentTrack = null;
        this.playAll = false;
        this.instance = this;
    }
    set isPlayingAll (value){
        this.playAll  = value;
    }
    get isPlayingAll (){
        return this.playAll;
    }
    set onPlayTrack(value){
        this.playTrackCb = value;
    }
    get track(){
        return this.currentTrack;
    } 
    clear() {
        this.queue = [];
        this.position = 0;
    }
    enqueueList(trackIds) {
        trackIds.forEach(trackId => this.queue.push(trackId));
    }    
    nextTrack() {
        if(this.queue.length <= 1) return;
        this.position++;
        if (this.position >= this.queue.length) {
            this.position = 0;
        }
        return this.playTrack();
    }    
    prevTrack() {
        if(this.queue.length <= 1) return;
        this.position--;
        if (this.position < 0) {
            this.position =  this.queue.length - 1;
        }
        return this.playTrack();
    }
    playTrack(index) {
        if (index){
            this.position = index;
        }
        return playerApi.getTrack(this.queue[this.position])
            .then(track => {
                this.currentTrack = track;
                if (this.playTrackCb) this.playTrackCb(track);
                audio.play(track.preview_url)
                return track;
            });
    }
}

const queue = new PlayQueue();
Object.seal(queue);
export default queue;