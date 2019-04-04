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



export default class commodity extends React.Component {
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
            productList: [],
            name: '',
            price: null,
            inventoryAmount: null,
            category: '',
            snackbarStatus: false,
            snackbarMessage: '',

            setInfoDialog: false,
        };
    }

    componentWillMount()
    {
        window.scrollTo(0,0);
        let that = this;
        axios.get(config.ip+'/triplehao/superadmin/listproduct',{
            params: {}
        })
            .then(function (res) {
                const data = res.data.productList;
                that.setState({productList: data})
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

    handleName = (e) => {
        this.setState({name: e.target.value});
    }

    handlePrice = (e) => {
        this.setState({price: e.target.value});
    }

    handleInventoryAmount = (e) => {
        this.setState({inventoryAmount: e.target.value});
    }

    handleCategory = (e) => {
        this.setState({category: e.target.value});
    }

    onSearch = () => {
        const searchKeyword = this.state.searchKeyword;
        if (searchKeyword === '') {
            let that = this;
            axios.get(config.ip+'/triplehao/superadmin/listproduct',{
                params: {}
            })
                .then(function (res) {
                    const data = res.data.productList;
                    that.setState({productList: data})
                })
                .catch(function (error) {
                    console.log(error);
                });
            return;
        }
        let that = this;
        let param = new URLSearchParams();
        param.append("keyword", this.state.searchKeyword);
        axios.post(config.ip + '/triplehao/superadmin/getproductbyname', param)
            .then(function (response)
            {
                console.log(response.data);
                const data = response.data.productList;
                that.setState({productList:data})

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
        param.append("name", this.state.name);
        param.append("price", this.state.price);
        param.append("inventoryAmount", this.state.inventoryAmount);
        param.append("category", this.state.category);
        axios.post(config.ip + '/triplehao/superadmin/addproduct', param)
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
                    title="Add product"
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
                        hintText="Please enter the name"
                        floatingLabelText="Name"
                        floatingLabelFixed={true}
                        value={this.state.name}
                        onChange={this.handleName}
                    /><br/>

                    <TextField
                        hintText="Please enter the price"
                        floatingLabelText="Price"
                        floatingLabelFixed={true}
                        value={this.state.price}
                        onChange={this.handlePrice}
                    /><br/>

                    <TextField
                        hintText="Please enter the inventory amount"
                        floatingLabelText="Inventory amount"
                        floatingLabelFixed={true}
                        value={this.state.inventoryAmount}
                        onChange={this.handleInventoryAmount}
                    /><br/>

                    <TextField
                        hintText="Please enter the category"
                        floatingLabelText="Category"
                        floatingLabelFixed={true}
                        value={this.state.category}
                        onChange={this.handleCategory}
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
                    data={this.state.productList}
                    options={{
                        // defaultSortName: 'timestart',
                        // defaultSortOrder: 'asc',
                        noDataText: 'Information is Empty',
                    }} striped hover pagination>
                    <TableHeaderColumn
                        // dataSort={true}
                        isKey
                        dataField='name'>
                        Name
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        // dataSort={true}
                        dataField='price'>
                        Price
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        // dataSort={true}
                        dataField='inventoryAmount'
                        >
                        Inventory amount
                    </TableHeaderColumn>
                    <TableHeaderColumn
                        // dataSort={true}
                        dataField='category'
                        >
                        Category
                    </TableHeaderColumn>
                </BootstrapTable>
            </div>
        );
    }
}
