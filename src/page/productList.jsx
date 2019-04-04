import React, {Component} from 'react';
import config from '../config';
import MyCard from '../components/card';
import axios from "axios/index";
import FloatingActionButton from 'material-ui/FloatingActionButton';
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import Link from "react-router-dom/es/Link";
import Select from 'react-select';
import 'react-select/dist/react-select.css';
import RaisedButton from 'material-ui/RaisedButton';
import './productList.css';
import '../App.css'





class PageProductList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            productList: [],
            open: false,
            keyword: '',
        }
    }

    componentWillMount() {
        window.scrollTo(0, 0);
        let that = this;
        axios.get(config.ip+'/triplehao/superadmin/listproduct', {
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

    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    renderProduct = () => {
        console.log(this.state.productList)
        if (!Array.isArray(this.state.productList)) {
            console.log('this.state.teacherList is not a array')
            return;
        }
        return this.state.productList.map((item, index) => {
            return (
                <div style={{
                    display: 'inline-block'
                }}
                     key={index}
                    // onClick={() => this.channelName(item.channelName)}
                >
                    <MyCard
                        img={item.url}
                        title={item.name}
                        subTitle={item.price}
                        body={item.category}
                        url={'buyProduct/'+item.productID}
                        // target='_target'
                    />
                </div>
            )
        });
    };

    handleChangeKeyword = (keyword) => {
        this.setState({keyword});
    }


    plan = () => {
        let that = this;
        let param = new URLSearchParams();//https://www.jianshu.com/p/042632dec9fb 适配spring mvc
        param.append("keyword", this.state.keyword.value);
        console.log(this.state.keyword.value);
        axios.post(config.ip + '/triplehao/superadmin/searchtype', param)
            .then(function (response) {
                console.log(response.data)
                const data = response.data.productList;
                that.setState({productList: data})
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    render() {
        return (
            <div >
                <div className={"body"}>
                    <div className={'class-select'}>
                        <div  className={'class-select-item'}>
                            {/*<input*/}
                                {/*style={{margin_right: '20px',*/}
                                    {/*height: '32px',*/}
                                    {/*line_height: '32px',*/}
                                    {/*padding: '0 10px',*/}
                                    {/*border: 'solid 1px #ccc'}}*/}
                                {/*name="searchKeyword"*/}
                                {/*type="text"*/}
                                {/*placeholder="Keyword"*/}
                                {/*value={}*/}
                                {/*onChange={this.onChange}*/}
                                {/*onKeyUp={this.onKeyUp}*/}
                            {/*/>*/}
                            <Select
                                name="productList"
                                clearable={false}
                                placeholder='Search'
                                value={this.state.keyword}
                                onChange={this.handleChangeKeyword}
                                options={[
                                    {value: '1', label: 'Price high to low'},
                                    {value: '2', label: 'Price low to high'},
                                    {value: '3', label: 'Tablet'},
                                    {value: '4', label: 'Headphone'},
                                    {value: '5', label: 'Accessories'},
                                    {value: '6', label: 'Cell Phone'},
                                    {value: '7', label: 'Television'},
                                    {value: '8', label: 'Camera'},
                                ]}
                            />
                            <RaisedButton label={<span style={{fontSize: '18px'}}>Search</span>}
                                          primary={true}
                                          buttonStyle={{height: '36px', width: '103px'}}
                                          onClick={this.plan}
                            />
                        </div>
                    </div>
                </div>
                <FloatingActionButton style={{position: 'fixed', bottom: '100px', right: '30px'}}>
                    <Link to="/order">
                        <p style={{fontSize: '14px'}}>Order</p>
                    </Link>
                </FloatingActionButton>
                {/*<Dialog*/}
                    {/*title="Shopping Cart"*/}
                    {/*actions={<FlatButton*/}
                        {/*label="确定"*/}
                        {/*primary={true}*/}
                        {/*keyboardFocused={true}*/}
                        {/*onClick={this.handleClose}*/}
                    {/*/>}*/}
                    {/*modal={false}*/}
                    {/*open={this.state.open}*/}
                    {/*onRequestClose={this.handleClose}*/}
                {/*>*/}
                    {/*<div style={{textAlign:'center'}}>请添加客服微信</div>*/}
                {/*</Dialog>*/}
                <div className="body">
                    <h1 className='title'>Products</h1>
                    <div className='content-c'>
                        <div className='content-wrap'>
                            <div style={{
                                fontSize: '40px',
                                // backgroundImage: "url('https://drive.google.com/file/d/1jRhehYlpDD8bvN0pMuFs3Tw4MpPF8_ap/view')",
                                backgroundRepeat: 'no-repeat',
                                backgroundSize: '100%',
                                height: '675px',
                                borderRadius: '10px',
                            }}>
                                <div>
                                    {this.renderProduct()}
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default PageProductList;
