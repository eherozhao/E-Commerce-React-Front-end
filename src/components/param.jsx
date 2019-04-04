import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
// import './card.css'

class param extends Component {

    render() {
        if (this.props.target === '_target') {
            return (
                <a href={this.props.url} target='_blank'>
                </a>
            );
        } else {
            return (
                <Link to={'/' + this.props.url} className='link'>
                </Link>
            )
        }
    }
}

export default param;
