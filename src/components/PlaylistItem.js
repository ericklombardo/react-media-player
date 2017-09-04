import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import '../App.css';

class PlaylistItem extends Component{
    state = {
        cover: null
    }
    componentDidMount(){
        this.setState({
            cover: this.findRightImage()
        });
    }
    findRightImage(){
        var elem = this.cover;
        var images = this.props.item.images;
        var targetWidth = elem.offsetWidth * window.devicePixelRatio,
        targetHeight = elem.offsetHeight * window.devicePixelRatio;

        if (targetWidth === 0 || targetHeight === 0) {
            return null;
        }

        var cover = images[0].url;
        for (var i=1; i<images.length; i++) {
            if (images[i].width >= targetWidth && images[i].height >= targetHeight) {
                cover = images[i].url;
            }
        }
        return `url(${cover})`;    
    } 
    render(){
        return (
            <li className="searchresult" >
                <p>
                    <Link to={`/player/playlists/${this.props.item.id}`}>{this.props.item.name}</Link>
                </p>                
                <Link to={`/player/playlists/${this.props.item.id}`}>
                    <div ref={elem => this.cover = elem } className="responsive-cover" 
                        style={ {backgroundImage: this.state.cover} } />
                </Link>
            </li>
        );
    }
}

export default PlaylistItem;