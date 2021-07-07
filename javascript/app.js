let data = d3.json("data/samples.json").then((rawData) => {
    function displayData(id) {
        // extract information from the JSON
        let bacteria = rawData.samples[id];
        let lastElement = bacteria.sample_values.length -1;
        let individualMetadata = rawData.metadata[id];
        let names = rawData.names;
        let subject = rawData.samples[id].id;

        let otuIds = [];
        bacteria.otu_ids.forEach(element => otuIds.push(`OTU ${element}`));

        var x_value = [];
        if (bacteria.sample_values.length > 10) {
            x_value = bacteria.sample_values;
        }
            else {
            x_value = bacteria.sample_values;
        }
        
        // Set up parameters for Plotly
        let bacteriaTrace = [{
            x: x_value,
            y: otuIds,
            type:"bar",
            name: '',
            hovertemplate: bacteria.otu_labels,
            orientation:"h",
        }];

        let bacteriaLayout = {
            title:{
                text: `Participant ${subject}, Top 10 Bacteria Species Present`
            }, 
            xaxis: {
                title:{
                    text:"Sequencing Reads"
                }
            }
        };

        let bubbleTrace = [{
            x:bacteria.otu_ids,
            y: bacteria.sample_values,
            text: bacteria.otu_labels,
            mode: 'markers',
            marker: {
                size: bacteria.sample_values,
                color: bacteria.otu_ids
            },
            hovertemplate: 
                "<b>%{text}</b><br>" +
                "%{xaxis.title.text}: %{x}<br>" +
                "%{yaxis.title.text}: %{y}"
        }];

        let bubbleLayout = {
            title: `Participant ${subject}, Species Distribution`,
            xaxis: {
                title:{
                    text: 'Operational Taxonomic Unit'
                }
            },
            yaxis:{
                title:{
                    text: 'Sequencing Reads'
                }
            }
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
       displayData(dataSet);    
    };
        
    displayData(0);
    d3.selectAll("#dataSet").on("change", selectData);
});