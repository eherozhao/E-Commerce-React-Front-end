export default function dataAlertArray1(data, time, max) {
    return {
        title: {
            // text: '用户数量面积图',
            // subtext: '数据来自西安兰特水电测控技术有限公司',
            // x: 'center',
            // align: 'right'
        },
        // toolbox: {
        //     feature: {
        //         restore: {},
        //         saveAsImage: {}
        //     }
        // },
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
        // legend: {
        //     data:['用户人数'],
        //     x: 'left'
        // },
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
            data: time,
        },
        yAxis: [{
            // name: 'value',
            // type: 'value'
        }],
        series: [{
            name: 'value',
            data: data,
            // areaStyle: {},
            type: 'line',
            smooth: true,
            markLine: {
                data: [
                    // {type: 'max', name: '阈值'},
                    {yAxis: max}
                ]
            }
        }]
    };
}