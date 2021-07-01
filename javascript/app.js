

let data = d3.json("data/samples.json").then((rawData) => {
    
    let bacteria = rawData.samples[0];

    let bacteriaTrace = {
        x: bacteria.sample_values,
        y: bacteria.otu_ids,
        text: data.otu_labels,
        type:"bar",
        orientation:"h"
    };

    let bacteriaLayout = {
        title: "I hope this works!"
    };

    let individualBacteria = [bacteriaTrace];
    Plotly.newPlot("bacteriaCounts", individualBacteria, bacteriaLayout)

    console.log(data);
    console.log(rawData.samples[0]);
});

