import React, {Component} from 'react';
import {Breadcrumb, BreadcrumbItem, Container, Row, Col} from 'reactstrap';
import config from '../config'
import {Link} from 'react-router-dom';
import {createHashHistory} from 'history';
import axios from "axios/index";
import FlatButton from 'material-ui/FlatButton';
import Dialog from 'material-ui/Dialog';
import RaisedButton from 'material-ui/RaisedButton';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import Snackbar from 'material-ui/Snackbar';
// import myVerifate from "../JavaScript/verificate";
import {
    blueGrey400,
    grey50,
} from 'material-ui/styles/colors';
import {
    Step,
    Stepper,
    StepLabel,
} from 'material-ui/Stepper';
import Checkbox from 'material-ui/Checkbox';
import * as hashHistory from "antd";
import MyCard from "../components/card";
import param from "../components/param";
// import Cookies from "js-cookie";

var _ = require('lodash');

class PageBuyProduct extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: '',
            productInfo: {},
            open: false,//是否出现弹窗
            stepIndex: 0,//弹窗的页面号码
            protocol: true,
            userId: '',
            salesChannel: 'online',
            quantity: 1,

            snackbarStatus: false,
            snackbarMessage: '',
        }
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        let that = this;
        axios.get(config.ip + '/triplehao/superadmin/getproductbyid', {
            params: {
                ProductId: id,
            }
        })
            .then(function (res) {
                // let index = _.findIndex(res.data.price, function (o) {
                //     return o.hours == 40;//默认初试价格为40节课程
                // });
                // console.log(res.data);
                console.log();
                // console.log(country)
                // const data = res.data.product;
                that.setState({
                    productInfo: res.data.product[0],
                    id: id,
                    // nowPrice: res.data.price,
                    // country: country
                })
            })
            .catch(function (error) {
                console.log(error);
            });
        // this.context.router.push({
        //     pathname:'/shoppingCart',
        //     query:{
        //         name: this.state.productInfo.name,
        //         price: this.state.productInfo.price,
        //     }
        // });
    }
    //
    // handleClass = (e) => {
    //     let that = this;
    //     let index = _.findIndex(this.state.price, function (o) {
    //         return o.hours == e.target.value;
    //     });
    //     this.setState({
    //         academicHour: e.target.value,
    //         nowPrice: this.state.price[index].pricefee
    //     });
    // };
    // renderPrice = () => {
    //
    //
    // }

    //打开弹窗
    handleOpen = () => {
        this.setState({open: true});
    };
    //关闭弹窗
    handleClose = () => {
        this.setState({open: false});
    };

    //
    handleNext2 = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
    };
    //下一步
    handleNext = () => {
        const {stepIndex} = this.state;
        this.setState({
            stepIndex: stepIndex + 1,
            finished: stepIndex >= 2,
        });
        let that = this;
        let param = new URLSearchParams();
        param.append("product", this.state.productInfo.name);
        param.append("price", this.state.productInfo.price);
        param.append("salesChannel", this.state.salesChannel);
        param.append("quantity", this.state.quantity);
        axios.post(config.ip + '/triplehao/superadmin/addorder', param)
            .then(function (response)
            {
                console.log(param);
                console.log(response);
                switch (response.data.code) {
                    case '200':
                        that.handleSnackbarOpen('You have placed order');
                        that.setState({setInfoDialog: false});
                        break;
                    default:
                        that.handleSnackbarOpen('Failed');
                }

            })
    };
    //上一步
    handlePrev = () => {
        const {stepIndex} = this.state;
        if (stepIndex > 0) {
            this.setState({stepIndex: stepIndex - 1});
        }
    };
    // 勾选同意协议
    handleProtocol = (e) => {
        this.setState((oldState) => {
            return {
                protocol: !oldState.protocol,
            };
        });
    };



    renderStepActions(step) {
        return (
            <div style={{margin: '12px 0 0 0'}}>
                <RaisedButton
                    label='Next Step'
                    disableTouchRipple={true}
                    disableFocusRipple={true}
                    primary={true}
                    onClick={this.handleNext2}
                    style={{marginRight: 12}}
                />
                {step > 0 && (
                    <FlatButton
                        label="Back"
                        disabled={this.state.stepIndex === 0}
                        disableTouchRipple={true}
                        disableFocusRipple={true}
                        onClick={this.handlePrev}
                    />
                )}
            </div>
        );
    }

    //弹窗中美一步的内容
    getStepContent(stepIndex) {
        switch (stepIndex) {
            case 0:
                return (
                    <div className='body'>
                        <h3>Order</h3>
                        <div style={{margin: '20px 0', fontSize: '24px', fontWeight: '700'}}>
                            <label>Product ：</label>
                            <span>{this.state.productInfo.name}</span>
                        </div>
                        <div style={{margin: '20px 0', fontSize: '24px', fontWeight: '700'}}>
                            <label>Prices ：</label>
                            <span>${this.state.productInfo.price}</span>
                        </div>
                        {/*<div style={{margin: '20px 0', fontSize: '20px', fontWeight: '700'}}>*/}
                        {/*<label>Price ：</label>*/}
                        {/*<span>{this.state.teacherInfo.professionaltitle}</span>*/}
                        {/*</div>*/}
                        <div style={{margin: '20px 0', fontSize: '20px', fontWeight: '700'}}>
                            <label> Category：</label>
                            <span>{this.state.productInfo.category}</span>
                        </div>
                        {this.renderStepActions(this.state.stepIndex)}

                    </div>
                );
            case 1:
                return (
                    <div className='body'>
                        <div className='protocol'>
                            {/*<p>尊敬的学员:</p>*/}
                        </div>
                        <Checkbox
                            label=" I agree "
                            onCheck={this.handleProtocol}
                            checked={!this.state.protocol}
                        />
                        <div style={{margin: '12px 0 0 0'}}>
                            <RaisedButton
                                label='Submit'
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                primary={true}
                                onClick={this.handleNext}
                                style={{marginRight: 12}}
                                disabled={this.state.protocol}
                            />
                            <FlatButton
                                label="Back"
                                disabled={this.state.stepIndex === 0}
                                disableTouchRipple={true}
                                disableFocusRipple={true}
                                onClick={this.handlePrev}
                            />
                        </div>
                    </div>
                );
            default:
                return (
                    <div className='body'>You have placed your order!</div>
                );
        }
    }

    renderDialog = () => {
        const customContentStyle = {
            width: '100%',
            maxWidth: 'none',
        };
        const actions = [
            <FlatButton
                label="Close"
                primary={true}
                onClick={this.handleClose}
            />,

        ];
        return (<Dialog
            // title="开始报名"
            actions={actions}
            modal={true}
            contentStyle={customContentStyle}
            open={this.state.open}
            autoScrollBodyContent={true}
        >
            <Stepper
                activeStep={this.state.stepIndex}
                // orientation="vertical"
            >
                <Step>
                    <StepLabel>Order Detail</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Read Policy</StepLabel>
                </Step>
                <Step>
                    <StepLabel>Submit</StepLabel>
                </Step>
            </Stepper>
            {this.getStepContent(this.state.stepIndex)}
        </Dialog>)
    };


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

    // renderCart = () => {

        // var data = {name: this.state.productInfo.name, price: this.state.productInfo.price};
        // var path = {
        //     pathname:'/shoppingCart',
        //     query:data,
        // }
        // hashHistory.push(path);
        // alert('Add success');
    //     return (
    //                 <param url={'shoppingCart/'+this.state.productInfo.productID}/>
    //         )
    //
    // };

    // submitInfo = () =>
    // {
    //     let that = this;
    //     let param = new URLSearchParams();
    //     param.append("product", this.state.productInfo.name);
    //     param.append("price", this.state.productInfo.price);
    //     axios.post(config.ip + '/triplehao/superadmin/addorder', param)
    //         .then(function (response)
    //         {
    //             console.log(response);
    //             switch (response.data.code) {
    //                 case '200':
    //                     that.handleSnackbarOpen('You have placed order');
    //                     that.setState({setInfoDialog: false});
    //                     break;
    //                 default:
    //                     that.handleSnackbarOpen('Failed');
    //             }
    //
    //         })
    // };

    render() {
        return (
            <div className='body'>
                {this.renderDialog()}
                <Breadcrumb>
                    <BreadcrumbItem active><Link className={'link'} to='/productlist'>Products List</Link></BreadcrumbItem>
                </Breadcrumb>
                <FloatingActionButton style={{position: 'fixed', bottom: '100px', right: '30px'}}>
                    <Link to="/shoppingCart">
                        <p style={{fontSize: '14px'}}>Order</p>
                    </Link>
                </FloatingActionButton>
                <Snackbar
                    open={this.state.snackbarStatus}
                    message={this.state.snackbarMessage}
                    autoHideDuration={4000}
                    onRequestClose={this.handleSnackbarClose}
                />
                <div>
                    <Row>
                        <Col>
                            <img src={this.state.productInfo.url} width={600} height={426} alt=""
                                 style={{borderRadius: '10px'}}/>
                        </Col>
                        <Col>
                            <div>
                                <div style={{margin: '20px 0', fontSize: '24px', fontWeight: '700'}}>
                                    <label>Products ：</label>
                                    <span>{this.state.productInfo.name}</span>
                                </div>
                                <div style={{margin: '20px 0', fontSize: '24px', fontWeight: '700'}}>
                                    <label>Category ：</label>
                                    <span>{this.state.productInfo.category}</span>
                                </div>

                                <div style={{margin: '20px 0', fontSize: '24px', fontWeight: '700'}}>
                                    <label>Price ：</label>
                                    <span>${this.state.productInfo.price}</span>
                                </div>
                                <RaisedButton
                                    onClick={this.handleOpen}
                                    label={<span style={{fontSize: '15px'}}>Buy now</span>}
                                    style={{margin: '0 10px 0 0 '}}
                                    buttonStyle={{height: '72px', width: '160px'}}
                                    backgroundColor={blueGrey400} labelColor={grey50}
                                    // keyboardFocused={true}
                                />
                                {/*<RaisedButton*/}
                                    {/*// onClick={this.componentWillMount}*/}
                                    {/*label={<span style={{fontSize: '15px'}}>Add to Cart</span>}*/}
                                    {/*style={{marginTop: '40px', left:'100px'}}*/}
                                    {/*buttonStyle={{height: '72px', width: '160px'}}*/}
                                    {/*backgroundColor={blueGrey400} labelColor={grey50}*/}
                                    {/*// keyboardFocused={true}*/}
                                {/*/>*/}
                            </div>
                        </Col>
                    </Row>
                </div>
            </div>
        );
    }
}

export default PageBuyProduct;
