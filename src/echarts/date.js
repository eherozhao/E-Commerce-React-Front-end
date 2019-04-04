let myDate = {
    createFakeDate: () => {
        let month = 1;
        let day = 1;
        let date = [];
        for (; month <= 12; month++) {
            for (; day <= 30; day++) {
                let temp = '2017/' + month + '/' + day;
                date.push(temp);
            }
            day = 1;
        }
        return date;
    },
    timestamp: (data) => {
        let date = new Date(data);//如果date为13位不需要乘1000
        let Y = date.getFullYear() + '-';
        let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
        let D = (date.getDate() < 10 ? '0' + (date.getDate()) : date.getDate()) + ' ';
        let h = (date.getHours() < 10 ? '0' + date.getHours() : date.getHours()) + ':';
        let m = (date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes()) + ':';
        let s = (date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds());
        return Y + M + D + h + m + s;
    },
};
export default myDate