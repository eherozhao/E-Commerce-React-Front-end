import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import Checkbox from 'material-ui/Checkbox';
import {Redirect} from 'react-router-dom';
import '../App.css';
import './register.css'
import config from "../config";
import axios from "axios/index";


class Index extends Component {
    constructor(props) {
        super(props);
        this.state = {
            account: '',
            password: '',
            redirectToUser: false,
            redirectToAdmin: false,
            // redirectToReferrer:false,
            isAdministrator: false,
            open: false,
        }
    }

    handleAccount = (e) => {
        this.setState({account: e.target.value});
    };
    handlePassword = (e) => {
        this.setState({password: e.target.value});
    };
    handleIsAdministrator = (e) => {
        this.setState({isAdministrator: !this.state.isAdministrator})
    };
    signIn = () => {
        // if (this.state.account !== this.state.password) {
        //     alert('请检查用户名与密码')
        // } else {
        //     this.setState({
        //         redirectToReferrer:true,
        //     })
        // }
        let that = this;
        let param = new URLSearchParams();
        param.append("username", this.state.account);
        param.append("pwd", this.state.password);
        param.append("role", this.state.isAdministrator
            ? 'administrator'
            : 'username');
        axios.post(config.ip + '/triplehao/superadmin/login', param)
            .then(function (res)
            {
                console.log(res);
                if (res.data.code!=='200')
                {
                    console.log('lost');
                    alert('Wrong username or password');
                }
                else if (res.data.code==='200')
                {
                    alert('Login success');
                    if (that.state.isAdministrator) {
                        that.setState({redirectToAdmin: true, open: false});
                        window.location.reload();
                    } else {
                        that.setState({redirectToUser: true});
                        window.location.reload();
                    }
                }
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };

    render() {
        // if (this.state.redirectToReferrer) {
        //     return <Redirect to='/cluster'/>;
        // }
        return (
            <div className="body">
                {this.state.redirectToUser
                    ? <Redirect
                        to={{
                            pathname: "/productlist",
                        }}
                    />
                    : null}
                {this.state.redirectToAdmin
                    ? <Redirect
                        to={{
                            pathname: "/backstage",
                        }}
                    />
                    : null}
            <div className='register-wrap'>
                <div>
                    <Card className='register-card'>
                        <CardTitle
                            title="Login"
                            // subtitle="Subtitle"
                            // actAsExpander={true}
                            // showExpandableButton={true}
                        />
                        <CardText className='text'>
                            <TextField
                                style={{width: '460px', marginTop:'10px'}}
                                hintText="Username"
                                value={this.state.account}
                                onChange={this.handleAccount}
                            /><br/>
                            <TextField
                                style={{width: '460px', marginTop:'20px'}}
                                hintText="Password"
                                type="password"
                                value={this.state.password}
                                onChange={this.handlePassword}
                            /><br/>
                            <Checkbox
                                style={{marginTop: '20px', fontSize: '15px'}}
                                label={
                                    <span className='protocol1'>
                                                administrator
                                            </span>}
                                checked={this.state.isAdministrator}
                                onCheck={this.handleIsAdministrator}
                            /><br/>
                            <RaisedButton label="Login" primary={true} fullWidth={true} onClick={this.signIn}/>
                        </CardText>
                    </Card>


                </div>

            </div>
            </div>

        );
    }
}

export default Index;
