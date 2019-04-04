import React, {Component} from 'react';
import {Row, Col} from 'reactstrap';
import Paper from 'material-ui/Paper';
import {List, ListItem} from 'material-ui/List';
import Subheader from 'material-ui/Subheader';
import ReactEcharts from 'echarts-for-react';
import '../App.css';
import userTotal from '../echarts/user/userTotal';
import userGrowth from "../echarts/user/userGrowth";
import userSource from "../echarts/user/userSource";
import userDistribution from "../echarts/user/userDistribution";

class PageDataVisualization extends Component {
    constructor(props) {
        super(props);
        this.state = {
            option: '用户来源',
            userTotal:[],
            userGrowth:[],
        }
    }

    componentWillMount() {

    }

    handleOption = (e) => {
        this.setState({option: e});
    }

    getEchart = () => {
        switch (this.state.option) {
            case '用户总数':
                return (<ReactEcharts
                    option={userTotal()}
                    key={'用户总数'}
                />);
            case '用户增长':
                return (<ReactEcharts
                    option={userGrowth()}
                    key={'用户增长'}
                />);
            case '用户分布':
                return (<ReactEcharts
                    option={userDistribution()}
                    key={'用户分布'}
                />);
            case '用户来源':
                return (<ReactEcharts
                    option={userSource()}
                    key={'用户来源'}
                />);
            default:
                return;
        }
    };

    render() {
        return (
            <div className='body'>
                <h1 className='title-left'>西咸公交大数据可视化</h1>
                <Row>
                    <Col xs="2">
                        <Paper>
                            <List>
                                <Subheader>数据列表</Subheader>
                                <ListItem primaryText="用户"
                                          nestedItems={[
                                              <ListItem
                                                  key='用户总数'
                                                  primaryText="用户总数"
                                                  onClick={() => {
                                                      this.handleOption('用户总数')
                                                  }}/>,
                                              <ListItem
                                                  key='用户增长'
                                                  primaryText="用户增长"
                                                  onClick={() => {
                                                      this.handleOption('用户增长')
                                                  }}
                                              />,
                                              <ListItem
                                                  key='用户分布'
                                                  primaryText="用户分布"
                                                  onClick={() => {
                                                      this.handleOption('用户分布')
                                                  }}
                                              />,
                                              <ListItem
                                                  key='用户来源'
                                                  primaryText="用户来源"
                                                  onClick={() => {
                                                      this.handleOption('用户来源')
                                                  }}
                                              />,
                                          ]}/>
                            </List>
                        </Paper>
                    </Col>
                    <Col xs="10">
                        <Paper style={{minHeight: '400px', padding: '0 10px'}}>
                            <Subheader>{this.state.option}</Subheader>
                            <div>
                                {this.getEchart()}
                            </div>
                        </Paper>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default PageDataVisualization;
