let data = d3.json("data/samples.json").then((rawData) => {
    function displayData(id) {
        // extract information from the JSON
        let bacteria = rawData.samples[id];
        let lastElement = bacteria.sample_values.length -1;
        let individualMetadata = rawData.metadata[id];
        let names = rawData.names;
        var x_value = [];

        if (bacteria.sample_values.length > 10) {
            x_value = bacteria.sample_values.reverse().slice(lastElement-11,lastElement-1);
        }
            else {
            x_value = bacteria.sample_values.reverse();
        }
        
        // Set up parameters for Plotly
        let bacteriaTrace = [{
            x: x_value,
            text: data.otu_labels,
            type:"bar",
            orientation:"h"
        }];

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

        //console.log(rawData);
        //console.log(names);


        function populateMenu(){
            names.forEach((id,index) =>{
                let selectMenu = d3.select("#dataSet");
                let dataOption = selectMenu.append("option")
                dataOption.text(id);
                dataOption.attr('value',index);
            })
        };

        populateMenu();
    };

    function selectData(){
       let selectMenu = d3.select("#dataSet");
       let dataSet = selectMenu.property("value");
       console.log(dataSet);
       displayData(dataSet);    
    };
        
    displayData(0);
    console.log(rawData.samples[133])
    

    d3.selectAll("#dataSet").on("change", selectData);
});



        // // Fill the data table using the values from each object in the data set
        // inputData.forEach((ufoReport) => {
        //     let row = tbody.append("tr");
        //     Object.entries(ufoReport).forEach(([key,value]) => {
        //         let cell = row.append("td");
        //         cell.text(value);
        //     })
        // })

        // // Create table header using they keys from the data object
        // let header = thead.append("tr");
        // Object.entries(inputData[0]).forEach(([key,value]) => {
        //     let contents = header.append("th");
        //     contents.text(key);
        // })
