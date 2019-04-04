import myDate from '../date'
import myData from '../data'

export default function userGrowth() {
    return {
        title: {
            text: '用户增长曲线图',
            x: 'center',
            align: 'right'
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                animation: false,
                label: {
                    backgroundColor: '#505765'
                }
            }
        },
        legend: {
            data: ['同比', '环比'],
            x: 'left'
        },
        dataZoom: [
            {
                show: true,
                realtime: true,
            },
            {
                type: 'inside',
                realtime: true,
            }
        ],
        xAxis: {
            name: '日期',
            type: 'category',
            data: myDate.createFakeDate(),
        },
        yAxis: {
            name: '百分比',
            type: 'value'
        },
        series: [
            {
                name: '同比',
                data: myData.proportion(1000,360,0.05),
                type: 'line',
                smooth: true
            },
            {
                name: '环比',
                data: myData.proportion(1000,360,0.05),
                type: 'line',
                smooth: true
            },
        ]
    };
}