export default function userSource() {
    return {
        title : {
            text: '客流分布占比图',
            subtext: '数据来自西咸公交集团',
            x: 'center',
            align: 'right'
        },
        tooltip: {
            trigger: 'item',
            formatter: "{a} <br/>{b}: {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            data: ['电视塔', '西咸集团', '西咸人才大厦', '西咸大厦', '行政中心', '曲江新开门转盘', '会展中心', '西部云谷', '辛家庙', '沣西管委会']
        },
        series: [
            {
                name: '客流占比',
                type: 'pie',
                selectedMode: 'single',
                radius: [0, '30%'],

                label: {
                    normal: {
                        position: 'inner'
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: [
                    {value: 335, name: '公交线路(E1)', selected: true},
                    {value: 679, name: '公交线路(E2)'},
                    {value: 1548, name: '公交线路(E3)'}
                ]
            },
            {
                name: '客流占比',
                type: 'pie',
                radius: ['40%', '55%'],
                label: {
                    normal: {
                        formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
                        backgroundColor: '#eee',
                        borderColor: '#aaa',
                        borderWidth: 1,
                        borderRadius: 4,
                        // shadowBlur:3,
                        // shadowOffsetX: 2,
                        // shadowOffsetY: 2,
                        // shadowColor: '#999',
                        // padding: [0, 7],
                        rich: {
                            a: {
                                color: '#999',
                                lineHeight: 22,
                                align: 'center'
                            },
                            // abg: {
                            //     backgroundColor: '#333',
                            //     width: '100%',
                            //     align: 'right',
                            //     height: 22,
                            //     borderRadius: [4, 4, 0, 0]
                            // },
                            hr: {
                                borderColor: '#aaa',
                                width: '100%',
                                borderWidth: 0.5,
                                height: 0
                            },
                            b: {
                                fontSize: 16,
                                lineHeight: 33
                            },
                            per: {
                                color: '#eee',
                                backgroundColor: '#334455',
                                padding: [2, 4],
                                borderRadius: 2
                            }
                        }
                    }
                },
                data: [
                    {value: 335, name: '电视塔'},
                    {value: 310, name: '西咸大厦'},
                    {value: 234, name: '行政中心'},
                    {value: 135, name: '曲江新开门转盘'},
                    {value: 1048, name: '会展中心'},
                    {value: 251, name: '西部云谷'},
                    {value: 147, name: '辛家庙'},
                    {value: 102, name: '沣西管委会'}
                ]
            }
        ]
    }
}


