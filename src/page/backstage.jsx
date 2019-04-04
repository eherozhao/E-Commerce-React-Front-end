import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import { Row, Col, Icon, message } from 'antd';
import axios from "axios";
import config from "../config";
// import { getStatisticData } from 'api';
// import './detail.less'
// import PageProductList from "./productList";

class PageBackstage extends Component {
    constructor(props){
        super();
        this.state={
            productCount: 0,
            userCount: 0,
            orderCount: 0
        }
    };

    componentDidMount() {
        this._isMounted = true;
        document.title = 'backstage';
        let that = this;
        axios.get(config.ip+'/triplehao/superadmin/getproductcount', {
            params: {}
        })
            .then(function (res) {
                console.log(res.data);
                that.setState({productCount: res.data.productCount})
            })
            .catch(function (error) {
                console.log(error);
            });
        axios.get(config.ip+'/triplehao/superadmin/getcustomercount',{
            params: {}
        })
            .then(function (res) {
                console.log(res.data);
                that.setState({userCount: res.data.customerCount})

            })
            .catch(function (error) {
                console.log(error);
            });
    }
    //
    // getUserCount = () =>{
    //     this._isMounted = true;
    //     let that = this;
    //     axios.get(config.ip+'/triplehao/superadmin/getcustomercount',{
    //         params: {}
    //     })
    //         .then(function (res) {
    //             console.log(res.data);
    //             that.setState({userCount: res.data.customerCount})
    //
    //         })
    //         .catch(function (error) {
    //             console.log(error);
    //         });
    // }

    componentWillUnmount() {
        this._isMounted = false;
    }
    render() {
        // const { productCount, userCount, orderCount } = this.state;
        return (
            <div class="detail">
                {/*<PageTitle title={'首页'} />*/}
                <Row gutter={96}>
                    <Col span={8}>
                        <div class="color-box-brown">
                            <p class="count">{this.state.productCount}</p>
                            <p class="desc">
                                <Icon type="shop" />
                                <Link to="/commodity">
                                    <span>Total Products</span>
                                </Link>
                            </p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div class="color-box-green">
                            <p class="count">{this.state.userCount}</p>
                            <p class="desc">
                                <Icon type="user" />
                                <span>Total customers</span>
                            </p>
                        </div>
                    </Col>
                    <Col span={8}>
                        <div class="color-box-blue">
                            <p class="count">{this.state.orderCount}</p>
                            <p class="desc">
                                <Icon type="file" />
                                <Link to="/store">
                                    <span>Total Stores</span>
                                </Link>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PageBackstage;

