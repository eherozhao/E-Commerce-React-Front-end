export default function userDistribution() {
    let echarts = require('echarts');
    echarts.registerMap('China', require('../static/China'));
    return {
        title: {
            // text: '用户分布图',
            // x: 'center',
            // align: 'right'
        },
        tooltip: {
            trigger: 'item',
            formatter: '{b}<br/>{c} (人)'
        },
        legend:{
            height:'1000px',
            width:'1000px',
        },
        visualMap: {
            min: 0,
            max: 15000,
            text: ['High', 'Low'],
            realtime: false,
            calculable: true,
        },
        grid: {
            top: '0%',
            left: '0%',
            right: '0%',
            bottom: '0%',
            containLabel: true
        },
        series: [
            {
                // name: '人数',
                type: 'map',
                map: 'China',
                itemStyle: {
                    normal: {label: {show: true}},
                    emphasis: {label: {show: true}}
                },
                data: [
                    {name: '台湾', value: 501},
                    {name: '河北', value: 3023},
                    {name: '山西', value: 1023},
                    {name: '内蒙古', value: 2030},
                    {name: '辽宁', value: 1023},
                    {name: '吉林', value: 3001},
                    {name: '黑龙江', value: 1021},
                    {name: '江苏', value: 4001},
                    {name: '浙江', value: 5092},
                    {name: '安徽', value: 2765},
                    {name: '江西', value: 2354},
                    {name: '山东', value: 2354},
                    {name: '河南', value: 1023},
                    {name: '湖北', value: 932},
                    {name: '湖南', value: 93},
                    {name: '广东', value: 2134},
                    {name: '广西', value: 90},
                    {name: '海南', value: 3},
                    {name: '贵州', value: 500},
                    {name: '四川', value: 2045},
                    {name: '云南', value: 100},
                    {name: '西藏', value: 0},
                    {name: '陕西', value: 90},
                    {name: '甘肃', value: 402},
                    {name: '青海', value: 300},
                    {name: '宁夏', value: 90},
                    {name: '新疆', value: 1293},
                    {name: '北京', value: 13902},
                    {name: '天津', value: 9002},
                    {name: '上海', value: 15477},
                    {name: '重庆', value: 8293},
                    {name: '香港', value: 30},
                    {name: '澳门', value: 12},

                ],
            }
        ]
    }
}