

let data = d3.json("data/samples.json").then((rawData) => {
    
    let bacteria = rawData.samples[0];
    let lastElement = bacteria.sample_values.length -1;

    let individualMetadata = rawData.metadata[0];
    let names = rawData.names
    


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

    console.log(rawData);
    console.log(names);


    function populateMenu(){
        names.forEach((id,index) =>{
            let selectMenu = d3.select("#dataSet");
            let dataOption = selectMenu.append("option")
            dataOption.text(id);
            dataOption.attr('value',index);
        })

        // use d3 to set the cursor on specific html tags
        
    };

    populateMenu();
        

});

        // Fill the data table using the values from each object in the data set
        inputData.forEach((ufoReport) => {
            let row = tbody.append("tr");
            Object.entries(ufoReport).forEach(([key,value]) => {
                let cell = row.append("td");
                cell.text(value);
            })
        })

        // Create table header using they keys from the data object
        let header = thead.append("tr");
        Object.entries(inputData[0]).forEach(([key,value]) => {
            let contents = header.append("th");
            contents.text(key);
        })
