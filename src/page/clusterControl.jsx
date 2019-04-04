import React, {Component} from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import {Table} from 'reactstrap';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import '../App.css';
import axios from 'axios';
import config from "../config";

class PageClusterControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            status: ['开启', '开启', '关闭'],
            open: false,
            dialog: {
                id: '',
                action: '',
            },
            snackbar: false,
        }
    }

    handleOpen = (id, action) => {
        this.setState({
            open: true,
            dialog: {
                id: id,
                action: action,
            }
        });
    };

    handleClose = () => {
        this.setState({open: false});
    };
    handleRequestClose = () => {
        this.setState({
            snackbar: false,
        });
    };
    submit = () => {
        let that = this;
        let status = Object.assign([], this.state.status);
        status[this.state.dialog.id] = this.state.dialog.action;
        setTimeout(function () {
                axios.get(
                    config.ip + '/cluterControl',
                    {
                        params: {
                            topic:'集群控制',
                            id: that.state.dialog.id,
                            action:that.state.dialog.action,
                        }
                    })
                    .then(function (res) {
                        console.log(res);
                    })
                that.setState({
                    status: status,
                    open: false,
                    snackbar: true,
                })
            }
            , 1);
    };


    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleClose}
            />,
            <FlatButton
                label="确定"
                primary={true}
                keyboardFocused={true}
                onClick={this.submit}
            />,
        ];
        return (
            <div className='body'>
                <Dialog
                    title={'集群' + this.state.dialog.id}
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                >
                    您是否确定{this.state.dialog.action}集群{this.state.dialog.id}
                </Dialog>
                <Snackbar
                    open={this.state.snackbar}
                    message={'集群' + this.state.dialog.id + '已经被' + this.state.dialog.action}
                    autoHideDuration={4000}
                    onRequestClose={this.handleRequestClose}
                />
                <h1 className='title-left'>集群控制</h1>
                <Table>
                    <thead style={{textAlign: 'center'}}>
                    <tr>
                        <th>#</th>
                        <th>集群名</th>
                        <th>状态</th>
                        <th>操作</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: 'center'}}>
                    <tr>
                        <th scope="row">0</th>
                        <td>集群0</td>
                        <td>{this.state.status[0]}</td>
                        <td>
                            <RaisedButton label="开启" primary={true} onClick={() => this.handleOpen(0, '开启')}/>
                            <RaisedButton label="关闭" secondary={true} onClick={() => this.handleOpen(0, '关闭')}/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>集群1</td>
                        <td>{this.state.status[1]}</td>
                        <td>
                            <RaisedButton label="开启" primary={true} onClick={() => this.handleOpen(1, '开启')}/>
                            <RaisedButton label="关闭" secondary={true} onClick={() => this.handleOpen(1, '关闭')}/>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>集群2</td>
                        <td>{this.state.status[2]}</td>
                        <td>
                            <RaisedButton label="开启" primary={true} onClick={() => this.handleOpen(2, '开启')}/>
                            <RaisedButton label="关闭" secondary={true} onClick={() => this.handleOpen(2, '关闭')}/>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default PageClusterControl;
