import React, {Component} from 'react';
import {Table} from 'reactstrap';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Snackbar from 'material-ui/Snackbar';
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import '../App.css';
class PageAuthorityManagement extends Component {
    constructor(props) {
        super(props);
        this.state = {
            dialog: {
                open: false,
                id: '',
            },
            snackbar: {
                open: false,
            },
            userList: [
                [0, 1, 2],
                [4],
                [],
            ],
            userOption: [
                {value: '0', label: 'user0'},
                {value: '1', label: 'user1'},
                {value: '2', label: 'user2'},
                {value: '3', label: 'user3'},
                {value: '4', label: 'user4'},
            ]
        }
    }

    handleUser = (user) => {
        let userList = Object.assign([], this.state.userList);
        userList[this.state.dialog.id] = user;
        this.setState({userList});
    };
    handleDialogOpen = (id) => {
        let dialog = Object.assign({}, this.state.dialog);
        dialog.open = true;
        dialog.id = id;
        this.setState({
            dialog: dialog
        });
    };

    handleDialogClose = () => {
        let dialog = Object.assign({}, this.state.dialog);
        dialog.open = false;
        this.setState({
            dialog: dialog
        });
    };

    handleSnackbarClose = () => {
        let snackbar = this.state.snackbar;
        snackbar.open = false;
        this.setState({snackbar: snackbar})
    };
    submit = () => {
        let dialog = Object.assign({}, this.state.dialog);
        dialog.open = false;
        let snackbar = this.state.snackbar;
        snackbar.open = true;
        this.setState({
            dialog: dialog,
            snackbar: snackbar
        })
    };

    render() {
        const actions = [
            <FlatButton
                label="取消"
                primary={true}
                onClick={this.handleDialogClose}
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
                    title={'Group' + this.state.dialog.id}
                    actions={actions}
                    modal={false}
                    open={this.state.dialog.open}
                    onRequestClose={this.handleDialogClose}
                >
                    <div style={{minHeight: '300px'}}>
                        <h3 className='title-left'>Users</h3>
                        <Select
                            multi
                            onChange={this.handleUser}
                            options={this.state.userOption}
                            placeholder="请添加User"
                            removeSelected={this.state.removeSelected}
                            simpleValue
                            value={this.state.userList[this.state.dialog.id]}
                        />
                    </div>
                </Dialog>
                <Snackbar
                    open={this.state.snackbar.open}
                    message={'Group' + this.state.dialog.id + '被修改'}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                />
                <h1 className='title-left'>权限管理</h1>
                <Table>
                    <thead style={{textAlign: 'center'}}>
                    <tr>
                        <th>#</th>
                        <th>Group</th>
                        <th>描述</th>
                        <th>Users</th>
                    </tr>
                    </thead>
                    <tbody style={{textAlign: 'center'}}>
                    <tr>
                        <th scope="row">0</th>
                        <td>group0</td>
                        <td>测试</td>
                        <td><RaisedButton label="详情" primary={true} onClick={() => this.handleDialogOpen(0)}/></td>
                    </tr>
                    <tr>
                        <th scope="row">1</th>
                        <td>group1</td>
                        <td>测试</td>
                        <td><RaisedButton label="详情" primary={true} onClick={() => this.handleDialogOpen(1)}/></td>
                    </tr>
                    <tr>
                        <th scope="row">2</th>
                        <td>group2</td>
                        <td>测试</td>
                        <td><RaisedButton label="详情" primary={true} onClick={() => this.handleDialogOpen(2)}/></td>
                    </tr>
                    </tbody>
                </Table>
            </div>
        );
    }
}

export default PageAuthorityManagement;
