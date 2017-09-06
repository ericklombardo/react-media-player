import playerApi from './PlayerApi';

/**
 * Manage tracks queue for playing
 */
class PlayQueue {
    constructor(){
        if(this.instance){
            return this.instance;
        }
        this.queue = [];
        this.position = 0;
        this.currentTrack = null;
        this.instance = this;
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
        this.position++;
        if (this.position >= this.queue.length) {
            this.position = 0;
        }
        return this.getTrack();
    }    
    prevTrack() {
        this.position--;
        if (this.position < 0) {
            this.position =  this.queue.length - 1;
        }
        return this.getTrack();
    }
    getTrack(index) {
        if (index){
            this.position = index;
        }
        return playerApi.getTrack(this.queue[this.position])
            .then(track => {
                this.currentTrack = track;
                return track;
            });
    }
}

const queue = new PlayQueue();
Object.seal(queue);
export default queue;