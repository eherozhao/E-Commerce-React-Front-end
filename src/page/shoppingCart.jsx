import React, {Component} from 'react';
// import Cookies from "js-cookie";
import axios from "axios/index";
import config from "../config";
// import myDate from '../JavaScript/date';
import {BootstrapTable, TableHeaderColumn} from 'react-bootstrap-table';
import '../../node_modules/react-bootstrap-table/dist/react-bootstrap-table-all.min.css';
import {Button, Row, Col} from 'reactstrap';
import Dialog from 'material-ui/Dialog';
// import DatePicker from 'material-ui/DatePicker';
// import TimePicker from 'material-ui/TimePicker';
import FlatButton from 'material-ui/FlatButton';
import Snackbar from 'material-ui/Snackbar';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import TextField from 'material-ui/TextField';
// import MyAvatar from '../components/avatar';

class PageShoppingCart extends Component {
    constructor(props) {
        super(props);
        // this.name=""+(props.location.query) ? props.location.query.name : null;
        // this.price=""+(props.location.query) ? props.location.query.price : null;
        this.state = {
            // endlesson: [],
            // nochooselesson: [],
            // onlesson: [],
            //  onlessonSelect: '',//已阅时间 被选中
            // noChooseLessonDialog: false,//增加空余时间弹窗
            // noChooseLessonDay: '',//空余时间-day
            // noChooseLessonHour: '',//空余时间-hour
            // noChooseLessonSelect: '',//空余时间 被选中
            orderList:[],
            productName:'',
            price:'',
            salesChannel:'online',
            quantity:1,
            totalCost:'',

        }
    }

    componentWillMount() {
        let id = this.props.match.params.id;
        let that = this;
        axios.get(config.ip + '/triplehao/superadmin/listorder', {
            params: {}
        })
            .then(function (res) {
                const data = res.data.orderList;
                that.setState({orderList: data})
            })
            .catch(function (error) {
                console.log(error);
            });
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


    dialogSetInfoOpen = () => {
        this.getInfo();
        this.setState({setInfoDialog: true});
    };
    dialogSetInfoClose = () => {
        this.setState({setInfoDialog: false});
    };

    // submitSetInfo = () => {
    //     let that = this;
    //     let param = new URLSearchParams();
    //     param.append("newName", this.state.info.teachername);
    //     param.append("newMail", this.state.info.teacherEmail);
    //     // param.append("role", Cookies.get('siegerRole'));
    //     axios({
    //         method: 'post',
    //         url: config.ip + '/TtaiWeb/Oweb/setInfo',
    //         // headers: {
    //         //     'token': Cookies.get('siegerToken')
    //         // },
    //         data: param,
    //     })
    //         .then(function (res) {
    //             console.log(res);
    //             switch (res.data.code) {
    //                 case '200':
    //                     that.handleSnackbarOpen('修改成功');
    //                     that.setState({setInfoDialog: false});
    //                     break;
    //                 default:
    //                     that.handleSnackbarOpen('修改失败，请重试');
    //             }
    //         })
    // }

    render() {
        return (
            <div className="body">
                <Dialog>
                    <Row>
                        <Col>
                            <span>{this.name}</span>
                        </Col>
                        <Col>
                            <span>{this.price}</span>
                        </Col>
                    </Row>
                </Dialog>
                {/*<FloatingActionButton*/}
                {/*style={{*/}
                {/*position: 'fixed',*/}
                {/*top: '100px',*/}
                {/*right: '30px'*/}
                {/*}}*/}
                {/*onClick={this.dialogSetInfoOpen}>*/}
                {/*<p style={{fontSize: '12px'}}>个人信息</p>*/}
                {/*</FloatingActionButton>*/}
                <h2 className='title'>Order</h2>
                <div>
                    {/*<Button onClick={this.deleteNoChooseLesson} style={{marginBottom: 10}}>remove</Button>*/}
                    <BootstrapTable
                        version='4'
                        data={this.state.orderList}
                        options={{
                            // defaultSortName: 'timestart',
                            defaultSortOrder: 'asc',
                            noDataText: 'Order is Empty',
                        }} striped hover pagination>
                        <TableHeaderColumn
                            // dataSort={true}
                            isKey
                            dataField='orderId'>
                            Order ID
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            // dataSort={true}
                            dataField='productName'>
                            Product Information
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            // dataSort={true}
                            dataField='salesChannel'>
                            sales_channel
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            // dataSort={tr
                            dataField='quantity'>
                            Amount
                        </TableHeaderColumn>
                        <TableHeaderColumn
                            dataField='totalCost'>
                            Total Cost
                        </TableHeaderColumn>
                    </BootstrapTable>
                </div>
                {/*<Button onClick={this.startClass} style={{marginLeft:1000}}>Check Out</Button>*/}

            </div>
        );
    }
}
// PageShoppingCart.contextTypes = {router: React.PropTypes.func.isRequired};
export default PageShoppingCart;
