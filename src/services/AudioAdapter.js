/**
 * Handle the audio interaction using the javascript function constructor Audio
 */
class AudioAdapter {
    constructor(){
        if(this.instance){
            return this.instance;
        }
        this.startCb = null;
        this.resumeCb = null;
        this.pauseCb = null;
        this.endedCb = null;

        this.volume = 100;
		this.progress = 0;
        this.duration = 0;
        this.playing = false;
        this.audio = new Audio();
        this.audio.addEventListener('loadedmetadata', this.onLoadedMetadata, false);
        this.audio.addEventListener('ended', this.onEnded, false);        
        this.instance = this;        
    }    
    set onStartPlay(value){
        this.startCb = value;
    }
    set onResumePlay(value){
        this.resumeCb = value;
    }
    set onPausePlay(value){
        this.pauseCb = value;
    }
    set onEndedPlay(value){
        this.endedCb = value;
    }
    get currentTime(){
        return this.audio.currentTime;
    } 
    get isPlaying(){
        return this.playing;
    }
    changeVolume(value){
        this.volume = value;
        this.audio.volume = value / 100.0;
    }
    changeProgress(value) {
        this.progress = value;
        this.audio.currentTime = value;
    }
    resume(){
        this.playing = true;
        if(this.audio.paused){
            this.audio.play();    
            if(this.resumeCb) this.resumeCb();
        }        
    }
    play(url){
        if(!url) return;
        this.playing = true;
        if (this.audio.src) {
            this.audio.pause();
            this.audio.src = null;
        }
        this.audio.src = url;    
    }
    pause(){
        if (this.audio.src !== null) {
            this.audio.pause();
            this.playing = false;
            if (this.pauseCb) this.pauseCb();
        }        
    }
    onLoadedMetadata = () => {
        this.duration = this.audio.duration;
        this.audio.volume = this.volume / 100.0;            
        this.progress = 0;        
        this.audio.play();
        if (this.startCb) this.startCb(this.progress, this.duration);
    }    
    onEnded = () => {
        this.playing = false;
        if(this.endedCb) this.endedCb();
    }    
}

const audio = new AudioAdapter();
Object.seal(audio);
export default audio;