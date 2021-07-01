d3.json("data/samples.json").then((rawData) => {
    let data = rawData;
    console.log(data);
})
// let bacteriaTrace = {
//     x:,
//     y:,
//     text:,
//     type:,
//     orientation:
// }
plotly.newPlot("BbacteriaCounts", individualBacteria, bacteriaLayout)