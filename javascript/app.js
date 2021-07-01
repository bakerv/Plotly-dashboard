

let data = d3.json("data/samples.json").then((rawData) => {
    
    let bacteria = rawData.samples[0];
    let lastElement = bacteria.sample_values.length -1;
    let bacteriaTrace = {
        x: bacteria.sample_values.reverse().slice(lastElement-11,lastElement-1),

        text: data.otu_labels,
        type:"bar",
        orientation:"h"
    };

    let bacteriaLayout = {
        title: "I hope this works!"
    };

    let individualBacteria = [bacteriaTrace];
    Plotly.newPlot("bacteriaCounts", individualBacteria, bacteriaLayout)

    console.log(rawData)
    console.log(lastElement)
});

