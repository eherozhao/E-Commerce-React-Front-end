import React, {Component} from 'react';
import {
    Link
} from 'react-router-dom';
import './card.css'

class MyCard extends Component {

    render() {
        if (this.props.target === '_target') {
            return (
                <a href={this.props.url} target='_blank'>
                    <div className='c-wrap'>
                        <div className='c-img'>
                            <img src={this.props.img} height={180} width={180} alt='Loading...'/>
                        </div>
                        <div className='c-word'>
                            <div className='c-title'>
                                {this.props.title}
                            </div>
                            <div className="c-subtitle">
                                {this.props.subTitle}
                            </div>
                            <div className='c-body'>
                                {this.props.body}
                            </div>
                        </div>

                    </div>
                </a>
            );
        } else {
            return (
                <Link to={'/' + this.props.url} className='link'>
                    <div className='c-wrap'>
                        <div className='c-img'>
                            <img src={this.props.img} height={180} width={180} alt='Loading...'/>
                        </div>
                        <div className='c-word'>
                            <div className='c-title'>
                                {this.props.title}
                            </div>
                            <div className="c-subtitle">
                                {this.props.subTitle}
                            </div>
                            <div className='c-body'>
                                {this.props.body}
                            </div>
                        </div>

                    </div>
                </Link>
            )
        }
    }
}

export default MyCard;
