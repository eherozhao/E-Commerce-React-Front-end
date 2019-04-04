let myData = {
    total: (start, length, variables) => {
        let array = [];
        for (let i = 0; i <= length; i++) {
            let change = start * variables * Math.random();
            if (Math.floor(change) % 4 === 0) {
                change = change * -1;
            }
            start = start + change;
            array.push(Math.floor(start));
        }
        return array;
    },
    proportion: (start, length, variables) => {
        let array = [];
        for (let i = 0; i <= length; i++) {
            let change = start * variables * Math.random();
            if (Math.floor(change) % 4 === 0) {
                change = change * -1;
            }
            start = start + change;
            array.push(Math.floor(start));
        }
        let proportion = [];
        for (let i = 0; i <= length; i++) {
            let change = 100 * array[i] / array[i - 7];
            proportion.push(change);
        }
        return proportion;
    },


};
export default myData