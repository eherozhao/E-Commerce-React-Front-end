import React, {Component} from 'react';
import {Card, CardActions, CardTitle, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import RaisedButton from 'material-ui/RaisedButton';
import Checkbox from 'material-ui/Checkbox';
import {Redirect} from 'react-router-dom';
import axios from "axios/index";
import config from '../config';
import '../App.css'
import './register.css'



class PageRegister extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            psw: '',
            ensurePsw: '',
            confirm: false,
            isAdministrator: false,
            pswEqual:true,
            registerFlag: false,//判断注册是否成功
        }
    }

    componentWillMount() {


    }

    handleId = (e) => {
        this.setState({id: e.target.value});
    }
    handlePsw = (e) => {
        this.setState({psw: e.target.value});
    }
    handleEnsurePsw = (e) => {
        this.setState({ensurePsw: e.target.value});
    }

    handleIsAdministrator = (e) => {
        this.setState({isAdministrator: !this.state.isAdministrator})
    }
    handleConfirm = (e) => {
        this.setState({confirm: !this.state.confirm})
    }

    register = () => {
        if (this.state.psw !== this.state.ensurePsw) {
            alert('Does not match');
            return
        }
        let that = this;
        let param = new URLSearchParams();//https://www.jianshu.com/p/042632dec9fb 适配spring mvc
        param.append("username", this.state.id);
        // param.append("scode", this.state.vcode);
        param.append("pwd", this.state.psw);
        param.append("role", this.state.isAdministrator
            ? 'administrator'
            : 'username');
        // alert('Register success')
        axios.post(config.ip + '/triplehao/superadmin/register', param)
            .then(function (response) {
                console.log(response.data)
                if (response.data.code === '200') {
                    alert('Register success')
                    that.setState({registerFlag: true})
                } else if (response.data.code === '202') {
                    alert('Register fail')
                }

            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div className="body">
                {this.state.registerFlag
                    ? <Redirect
                        to={{
                            pathname: "/login",
                        }}
                    />
                    : null}
                <div className='register-wrap'>
                    <div>
                        <Card className='register-card'>
                            <CardTitle
                                title="Register"
                            />
                            <CardText className='text'>

                                <TextField
                                    hintText="Username"
                                    floatingLabelText="Username"
                                    fullWidth={true}
                                    value={this.state.id}
                                    onChange={this.handleId}
                                /><br/>

                                <TextField
                                    hintText="Password"
                                    floatingLabelText="Password"
                                    fullWidth={true}
                                    value={this.state.psw}
                                    onChange={this.handlePsw}
                                    type="password"
                                /><br/>
                                <TextField
                                    hintText="Confirm Password"
                                    floatingLabelText="Confirm Password"
                                    fullWidth={true}
                                    type="password"
                                    value={this.state.ensurePsw}
                                    onChange={this.handleEnsurePsw}
                                    errorText={this.state.psw !== this.state.ensurePsw
                                        ? 'Does not match!'
                                        : ''}
                                /><br/>
                                <Checkbox
                                    style={{marginTop: '20px'}}
                                    label={
                                        <span className='protocol1'>
                                                Register administrator
                                            </span>}
                                    checked={this.state.isAdministrator}
                                    onCheck={this.handleIsAdministrator}

                                />
                                <div>
                                    {/*<Checkbox*/}
                                    {/*style={{marginTop: '20px'}}*/}
                                    {/*label={*/}
                                    {/*<span className='protocol1'>*/}
                                    {/*我已阅读并同意*/}
                                    {/*<Link to=''>希舸用户注册协议</Link>*/}
                                    {/*</span>}*/}
                                    {/*checked={this.state.confirm}*/}
                                    {/*onCheck={this.handleConfirm}*/}
                                    {/*/>*/}


                                </div>
                                <br/>
                                <RaisedButton label="Register" primary={true} fullWidth={true} onClick={this.register}/>
                            </CardText>
                        </Card>
                    </div>

                </div>
            </div>
        );
    }
}

export default PageRegister;
