import React from 'react';
import { Button, message } from 'antd';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import PropTypes from 'prop-types';
import axios from "axios/index";
import config from "../config";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import {Breadcrumb, BreadcrumbItem, Container, Row, Col} from 'reactstrap';
import {Link} from "react-router-dom";



export default class store extends React.Component {
    static propTypes = {
        // defaultSearchType: PropTypes.string.isRequired,
        optionList: PropTypes.array.isRequired,
        onSearch: PropTypes.func.isRequired
        // width: PropTypes.string
    };
    constructor(props){
        super();
        this.state = {
            // searchType: this.props.defaultSearchType,
            searchKeyword: '',
            // optionList: [
            //     { key: 'productId', value: '商品ID' },
            //     { key: 'productName', value: '商品名称' }
            // ]
            storeList: [],
            storeId:null,
            address: '',
            storeManager: '',
            snackbarStatus: false,
            snackbarMessage: '',

            setInfoDialog: false,
        };
    }

    componentWillMount()
    {
        window.scrollTo(0,0);
        let that = this;
        axios.get(config.ip+'/triplehao/superadmin/liststore',{
            params: {}
        })
            .then(function (res) {
                const data = res.data.storeList;
                that.setState({storeList: data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    // onChange = (searchKeyword) => {
    //     // const name = e.target.name;
    //     // const value = e.target.value;
    //     this.setState({searchKeyword});
    // };

    handleChangeKeyword = (e) => {
        this.setState({searchKeyword:e.target.value});
    }

    //snackbar 打开
    handleSnackbarOpen = (snackbarMessage) => {
        this.setState({
            snackbarMessage: snackbarMessage,
            snackbarStatus: true,
        });
    };
    //snackbar 关闭
    handleSnackbarClose = () => {
        this.setState({
            snackbarStatus: false,
        });
    };

    handleStoreId = (e) => {
        this.setState({storeId: e.target.value});
    }

    handleAddress = (e) => {
        this.setState({address: e.target.value});
    }

    handleStoreManager = (e) => {
        this.setState({storeManager: e.target.value});
    }


    onSearch = () => {
        const searchKeyword = this.state.searchKeyword;
        if (searchKeyword === '') {
            let that = this;
            axios.get(config.ip+'/triplehao/superadmin/liststore',{
                params: {}
            })
                .then(function (res) {
                    const data = res.data.storeList;
                    that.setState({storeList: data})
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
        let that = this;
        let param = new URLSearchParams();
        param.append("keyword", this.state.searchKeyword);
        axios.post(config.ip + '/triplehao/superadmin/getproductbyname', param)
            .then(function (response)
            {
                console.log(response.data);
                const data = response.data.storeList;
                that.setState({storeList:data})

            })
            .catch(function (error)
            {
                console.log(error);

            });
        // this.props.onSearch(searchT searchKeyword);
    };
    onKeyUp = e => {
        if (e.keyCode === 13) {
            this.onSearch();
        }
    };

    submitSetInfo = () =>
    {
        let that = this;
        let param = new URLSearchParams();
        param.append("address", this.state.address);
        param.append("storeManager", this.state.storeManager);
        axios.post(config.ip + '/triplehao/superadmin/addstore', param)
            .then(function (response)
            {
                console.log(response);
                switch (response.data.code) {
                    case '200':
                        that.handleSnackbarOpen('Submit success');
                        that.setState({setInfoDialog: false});
                        break;
                    default:
                        that.handleSnackbarOpen('Submit failed');
                }

            })
    };

    dialogSetInfoOpen = () => {
        // this.getInfo();
        this.setState({setInfoDialog: true});
    };
    dialogSetInfoClose = () => {
        this.setState({setInfoDialog: false});
    };

    render() {
        const searchKeyword = this.state;
        // const { defaultSearchType, optionList } = this.props;
        return (
            <div style={{display: 'inline-block',
                padding: '15px 0'}}>
                <Breadcrumb>
                    <BreadcrumbItem active><Link className={'link'} to='/backstage'>Backstage</Link></BreadcrumbItem>
                </Breadcrumb>
                <Dialog
                    title="Add store"
                    actions={
                        [
                            <FlatButton
                                label="cancel"
                                primary={true}
                                onClick={this.dialogSetInfoClose}
                            />,
                            <FlatButton
                                label="submit"
                                primary={true}
                                keyboardFocused={true}
                                onClick={this.submitSetInfo}
                            />,
                        ]
                    }
                    modal={false}
                    open={this.state.setInfoDialog}
                    onRequestClose={this.dialogSetInfoClose}
                >
                    <TextField
                        hintText="Please enter the address"
                        floatingLabelText="Address"
                        floatingLabelFixed={true}
                        value={this.state.address}
                        onChange={this.handleAddress}
                    /><br/>

                    <TextField
                        hintText="Please enter the store manager"
                        floatingLabelText="Store manager"
                        floatingLabelFixed={true}
                        value={this.state.storeManager}
                        onChange={this.handleStoreManager}
                    /><br/>

                </Dialog>
                <Snackbar
                    open={this.state.snackbarStatus}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                />
                <FloatingActionButton
                    style={{
                        position: 'fixed',
                        top: '100px',
                        right: '30px'
                    }}
                    onClick={this.dialogSetInfoOpen}>
                    <p style={{fontSize: '25px'}}>+</p>
                </FloatingActionButton>


                <input
                    style={{margin_right: '20px',
                        height: '32px',
                        line_height: '32px',
                        padding: '0 10px',
                        border: 'solid 1px #ccc'}}
                    name="searchKeyword"
                    type="text"
                    placeholder="Keyword"
                    onChange={this.handleChangeKeyword.bind(this)}
                    defaultValue={this.state.searchKeyword}
                    // onKeyUp={this.onKeyUp}
                />
                <Button type="primary" onClick={this.onSearch}>
                    Search
                </Button>
                <BootstrapTable
                    version='4'
                    // selectRow={{
                    //     mode: 'radio',
                    //     clickToSelect: true,
                    //     onSelect: this.selectOnLesson,
                    // }}
                    data={this.state.storeList}
                    options={{
                        // defaultSortName: 'timestart',
                        // defaultSortOrder: 'asc',
                        noDataText: 'Information is Empty',
                    }} striped hover pagination>
                    <TableHeaderColumn
                        // dataSort={true}
                        isKey
                        dataField='storeId'>
                        Store id
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        // dataSort={true}
                        dataField='address'>
                        Address
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        // dataSort={true}
                        dataField='storeManager'
                    >
                        Store manager
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
