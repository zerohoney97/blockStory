let dummycoinprice = [
{
    start:[10],
    end:[15],
    max:[20],
    min:[10],
},{
    start:[15],
    end:[10],
    max:[17],
    min:[9],
},
]


function coin(prices){
    let start = prices[0]
    let end = price[prices.length - 1];
    let max = Math.max(...prices);
    let min = Math.min(...prices);

    return{start, end, max, min};
}