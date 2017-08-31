/**
 * Singleton Auth class (https://www.sitepoint.com/javascript-design-patterns-singleton/)
 * Handle spotify authorization and authentication
 */
class Auth {
    constructor(){
        if(this.instance){
            return this.instance;
        }
        this.clientId = 'e6f562490fd94f28be08dc7fb8fabfe0';
        this.redirectUri = 'http://localhost:3000/callback.html';
        this.instance = this;    
    }
    openLogin(){
        var url = 'https://accounts.spotify.com/authorize',
            scopes = ['user-read-private', 'playlist-read-private', 'user-library-read'],
            width = 450,
            height = 730,
            left = (window.screen.width / 2) - (width / 2),
            top = (window.screen.height / 2) - (height / 2);
        
        window.open(`${url}?client_id=${this.clientId}&redirect_uri=${encodeURIComponent(this.redirectUri)}&scope=${encodeURIComponent(scopes.join(' '))}&response_type=token`
            ,'Spotify'          
            ,`menubar=no,location=no,resizable=no,scrollbars=no,status=no,width=${width},height=${height},top=${top},left=${left}`   
        );
    }
    get accessToken(){
        var token,   
            now = (new Date()).getTime(),
            expires = 0 + localStorage.getItem('pa_expires', '0');
        
        if (now > expires) {
            return '';
        }
        token = localStorage.getItem('pa_token', '');
        return token;
    }
    set accessToken(value){
        var now = (new Date()).getTime();
        localStorage.setItem('pa_token', value.token);
        localStorage.setItem('pa_expires', now + value.validTo);
    }
    get userName(){
        return localStorage.getItem('pa_username', '');
    }
    set userName(value){
        localStorage.setItem('pa_username', value);
    }
    get userCountry(){
        return localStorage.getItem('pa_usercountry', 'US');
    }
    set userCountry(value){
        localStorage.setItem('pa_usercountry', value);
    }
}

const auth = new Auth();
Object.freeze(auth);
export default auth;