

let data = d3.json("data/samples.json").then((rawData) => {
    
    let bacteria = rawData.samples[0];
    let lastElement = bacteria.sample_values.length -1;

    let individualMetadata = rawData.metadata[0];
    


    // need to add interactive feature to adjust number of visible bars
    let bacteriaTrace = [{
        x: bacteria.sample_values.reverse().slice(lastElement-11,lastElement-1),

        text: data.otu_labels,
        type:"bar",
        orientation:"h"
    }];
    //need to improve layout

    let bacteriaLayout = {
        title: "I hope this works!"
    };

    let bubbleTrace = [{

        x:bacteria.otu_ids,
        y: bacteria.sample_values,
        text: bacteria.otu_labels,
        mode: 'markers',
        marker: {
            size: bacteria.sample_values,
            color: bacteria.otu_ids,
        }
    }];

    let bubbleLayout = {
        title: "This should also work"
    };

    let metadataTrace = [{
        type: 'table',
        header: {
            values: [["Participant Demographics"]],
            align: "center"
        },
        cells: {
            values: [Object.keys(individualMetadata),Object.values(individualMetadata)],
            align: "center",
            font: {family: "Arial", size: 11, color: ["black"]}
        }

    }];

    Plotly.newPlot("bacteriaCounts", bacteriaTrace, bacteriaLayout);
    Plotly.newPlot("bubbleChart", bubbleTrace, bubbleLayout);
    Plotly.newPlot("demographics", metadataTrace)

    console.log(individualMetadata);
    console.log(individualMetadata);
});
