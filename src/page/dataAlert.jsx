import React, {Component} from 'react';
import '../App.css';
import config from '../config'
import axios from 'axios';
import RaisedButton from 'material-ui/RaisedButton';
import ReactEcharts from 'echarts-for-react';
import dataAlertArray1 from "../echarts/dataAlert/array1";
import myDate from '../echarts/date';

class PageDataAlert extends Component {
    constructor(props) {
        super(props);
        this.state = {
            array1: [],
            array1Value: [],
            array1Time: [],
            array1Max: 0,
            arrayControl: null,
            // over: 0,//0未超过阈值，1超过阈值
            preValue: NaN,//上次超过max的value
        }
    }

    getArray1 = () => {
        console.log('正在监控')
        const that = this;
        axios.get(config.ip + '/dataAlert',
            {
                params: {
                    // over: that.state.over,
                    preValue: that.state.preValue,
                }
            })
            .then(function (res) {
                const data = res.data.data;
                // console.log(data);
                const time = res.data.time;
                // const over = res.data.over;
                const preValue = res.data.preValue;
                let array1 = Object.assign([], that.state.array1);
                let array1Value = Object.assign([], that.state.array1Value);
                let array1Time = Object.assign([], that.state.array1Time);
                array1.push({
                    id: data.id,
                    value: data.value,
                    max: data.max,
                });
                array1Value.push(data.value);
                array1Time.push(myDate.timestamp(time));
                // console.log(data.max)
                that.setState({
                    array1: array1,
                    array1Value: array1Value,
                    array1Time: array1Time,
                    array1Max: data.max,
                    // over: over,
                    preValue: preValue,
                })
            })
            .catch(function (err) {
                console.log(err);
            })
        // console.log(this.state.array1)
    };
    startWatchArray1 = () => {
        let arrayControl = setInterval(this.getArray1, 1000);
        this.setState({arrayControl: arrayControl})
    };
    endWatchArray1 = () => {
        clearInterval(this.state.arrayControl);
    };

    render() {
        return (
            <div className='body'>
                <h1 className='title-left'>数据预警</h1>
                <div>
                    <RaisedButton label="开始监控" style={{marginRight: '30px'}} primary={true}
                                  onClick={() => this.startWatchArray1(0)}/>
                    <RaisedButton label="结束监控" secondary={true} onClick={() => this.endWatchArray1(0)}/>
                    <ReactEcharts
                        option={dataAlertArray1(this.state.array1Value, this.state.array1Time, this.state.array1Max)}
                        key={'用户总数'}
                    />
                </div>

            </div>
        );
    }
}

export default PageDataAlert;
