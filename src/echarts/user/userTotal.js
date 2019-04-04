import myDate from '../date'
import myData from '../data'
export default function userTotal() {
    return {
        title : {
            text: '每日用户订票人数',
            subtext: '数据来自西咸公交集团',
            x: 'center',
            align: 'right'
        },
        toolbox: {
            feature: {
                restore: {},
                saveAsImage: {}
            }
        },
        tooltip : {
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
            data:['订票人数'],
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
            type: 'category',
            data: myDate.createFakeDate(),
        },
        yAxis: {
            name: '每日订票人数(人)',
            type: 'value'
        },
        series: [{
            name:'订票人数',
            data:  myData.total(1000,360,0.05),
            areaStyle: {},
            type: 'line',
            smooth: true
        }]
    };
}