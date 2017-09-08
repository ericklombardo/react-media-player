import React, {Component} from 'react';
import '../App.css';

class Cover extends Component{
    state = {
        cover: null
    }
    componentDidMount(){
        this.setState({
            cover: this.findRightImage()
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            cover: this.findRightImage(nextProps.images)
        });                
    }
    findRightImage(values){
        var elem = this.cover;
        var images = values || this.props.images || [];
        var targetWidth = elem.offsetWidth * window.devicePixelRatio,
        targetHeight = elem.offsetHeight * window.devicePixelRatio;

        if (!images.length || targetWidth === 0 || targetHeight === 0) {
            return null;
        }

        var cover = images[0].url;
        for (var i=1; i<images.length; i++) {
            if (images[i].width >= targetWidth && images[i].height >= targetHeight) {
                cover = images[i].url;
                break;
            }
        }
        return `url(${cover})`;    
    }         
    render(){
        return (
            <div ref={elem => this.cover = elem } className={this.props.className} 
            style={ {backgroundImage: this.state.cover} } />
        );
    }
}

export default Cover;