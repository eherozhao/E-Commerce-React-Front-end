import React, {Component} from 'react';
import AppBar from 'material-ui/AppBar';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
// import IconButton from 'material-ui/IconButton';
// import FontIcon from 'material-ui/FontIcon';
import {Link} from 'react-router-dom';

class MyNav extends Component {
    constructor(props) {
        super(props);
        this.state = {open: false};
    }

    handleToggle = () => this.setState({open: !this.state.open});
    handleClose = () => this.setState({open: false});

    render() {
        return (
            <div>
                <AppBar
                    title="TripleHao"
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonClick={this.handleToggle}

                />
                <Drawer
                    open={this.state.open}
                    docked={false}
                    onRequestChange={(open) => this.setState({open})}
                >
                    {/*<Link className='link' to='cluster'> <MenuItem>集群控制</MenuItem></Link>*/}
                    {/*<Link className='link' to='authority'><MenuItem>权限管理</MenuItem></Link>*/}
                    <Link className='link' to='login'><MenuItem>Login</MenuItem></Link>
                    <Link className='link' to='register'><MenuItem>Register</MenuItem></Link>
                </Drawer>
            </div>

        );
    }
}

export default MyNav;
