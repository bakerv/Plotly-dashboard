let data = d3.json("data/samples.json").then((rawData) => {
    let names = rawData.names;
    var dataSet = 0;

    function populateMenu() {
        // generate options for the select menu, and link the associated index with the id option
        // This linkage will be used to select which data set to display
        names.forEach((id,index) =>{
            let selectMenu = d3.select("#dataSet");
            let dataOption = selectMenu.append("option")
            dataOption.text(id);
            dataOption.attr('value',index);
        })
    };

    function displayData(id) {
        // extract information from the JSON
        let bacteria = rawData.samples[id]
        let subject = rawData.samples[id].id;
        let config = {responsive: true};

        function hBarPlot() {
            // isolate the top 10 items from the data set.
            // The data comes sorted by sample values descending
            let seqReads = bacteria.sample_values.slice(0,10).reverse();
            let otuIds = [];
            let bacteriaName = bacteria.otu_labels.slice(0,10).reverse();
            bacteria.otu_ids.slice(0,10).forEach(element => otuIds.push(`OTU ${element}`));
            
            // Set up parameters for Plotly
            let bacteriaTrace = [{
                x: seqReads,
                y: otuIds.reverse(),
                type:"bar",
                name: '',
                hovertemplate: bacteriaName,
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
            //Pass bar chart into the div using Plotly
            Plotly.newPlot("bacteriaCounts", bacteriaTrace, bacteriaLayout, config);
        }

        function bubblePlot() {
            // set up data and parameters for Plotly
            let bubbleTrace = [{
                x:bacteria.otu_ids,
                y: bacteria.sample_values,
                text: bacteria.otu_labels,
                mode: 'markers',
                name:"",
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
            // Pass bubble chart into the div using Plotly
            Plotly.newPlot("bubbleChart", bubbleTrace, bubbleLayout, config);
        }

        function metaTable() {
            let individualMetadata = rawData.metadata[id];
            let displayKeys = ["ID:","Ethnicity:","Gender:","Age:","Location:","BB Type:","Wash Freq:"]
           
            // set up data and parameters for plotly
            let metadataTrace = [{
                type: 'table',
                header:{
                    line: {color: 'white'}
                },
                columnwidth:[1,1],
                cells: {
                    values: [displayKeys,Object.values(individualMetadata)],
                    align: ["right","left"],
                    height:30,
                    font: {family: "Arial", size: 14, color: ["black"]},
                    line:{color: 'white'},
                    pad: 0
                }
            }];
            let metadataLayout = {
                title: `Participant Demographics`
            }
            // Pass table into the div using Plotly
            Plotly.newPlot("demographics", metadataTrace, metadataLayout)
        }

        try {
            hBarPlot();
        }
        catch {}

        try {
            bubblePlot();
        }
        catch{}

        try {
        metaTable();
        }
        catch{}
    };

    function selectData() {
       let selectMenu = d3.select("#dataSet");
       dataSet = selectMenu.property("value");
       displayData(dataSet);    
    };
    populateMenu();
    displayData(dataSet);
    
    d3.selectAll("#dataSet").on("change", selectData);
});