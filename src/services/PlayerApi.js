import auth from './Auth';
import {isoString} from '../utils/utils.js';

/**
 * Singleton PlayerApi class (https://www.sitepoint.com/javascript-design-patterns-singleton/)
 * Handle spotify api 
 */
class PlayerApi{
    constructor(){
        if(this.instance){
            return this.instance;
        }
        this.baseUrl = 'https://api.spotify.com/v1';
        this.instance = this;    
    }
    headers(token)  {        
        return new Headers({
            'Authorization': `Bearer ${token}`
        });
    }
    authFetch(url, options){
        var token = auth.accessToken;
        if(token){
            options.headers = this.headers(token)
            return fetch(url, options);
        }
        auth.logout();
    }
    getMe(){
        var options = {
            method: 'GET'
        };
        
        return this.authFetch(`${this.baseUrl}/me`, options)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                console.log(response);
                throw new Error('Error getting user info');
            });
    }
    search(query){
        var options = {
            method: 'GET'
        };
        
        return this.authFetch(`${this.baseUrl}/search?type=playlist,artist&market=from_token&q=${encodeURIComponent(query)}`, options)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Error api searching');
            });
    }  
    getPlayList(owner, id){
        var options = {
            method: 'GET'
        };

        return this.authFetch(`${this.baseUrl}/users/${encodeURIComponent(owner)}/playlists/${encodeURIComponent(id)}`, options)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                throw new Error('Error getting playlist', response);
            });
    }  
    getTrack(id) {
        var options = {
            method: 'GET'
        };
        return this.authFetch(`${this.baseUrl}/tracks/${encodeURIComponent(id)}`, options)
        .then(response => {
            if(response.ok){
                return response.json();
            }
            console.log(response);
            throw new Error('Error getting track');
        });
    }
    getFeaturedPlaylists(){
        var options = {
            method: 'GET'
        };
        var timestamp = isoString(new Date());    
        return this.authFetch(`${this.baseUrl}/browse/featured-playlists?country=${encodeURIComponent(auth.userCountry)}&timestamp=${timestamp}`, options)
            .then(response => {
                if(response.ok){
                    return response.json();
                }
                console.log(response);
                throw new Error('Error api featured-playlists');
            });
    }      
}

const api = new PlayerApi();
Object.freeze(api);
export default api;