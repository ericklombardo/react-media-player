import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import Cover from './Cover';
import '../App.css';

class SearchItem extends Component{
    render(){
        return (
            <li className="searchresult" >
                <p>
                    <Link to={this.props.url}>{this.props.item.name}</Link>
                </p>                
                <Link to={this.props.url}>
                    <Cover images={this.props.item.images} className="responsive-cover" />
                </Link>
            </li>
        );
    }
}

export default SearchItem;