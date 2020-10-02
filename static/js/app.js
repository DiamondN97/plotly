// 153 data subjects
function buildData(sample)
{
        d3.json("../samples.json").then((data)=>{
        var otu_labels = data.samples.map(d => d.otu_labels[0]);
        var otu_ids = data.samples.map(d => d.otu_ids[0]);
        var sample_values = data.samples.map(d => d.sample_values[0])
        var wfreq = data.metadata.map(d => d.wfreq);
        var metadata = data.metadata;
        var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
        // var samples = data.samples;
        // console.log('otu_labels', otu_labels);
        // console.log('otu_ids', otu_ids);
        // console.log('sample_values', sample_values);
        // console.log('wfreq',wfreq);
        // console.log('metadata', metadata);
        // console.log('samples', samples);
        var panel = d3.select("#sample-metadata");
        panel.html("");
        // console.log("dropdown", dropdown)
        Object.entries(resultArray[0]).forEach(([key, value]) => { panel.append("h6").text(`${key}: ${value}`);
        // console.log(key, value);


        
    });
});


}

function buildCharts(sample){

    d3.json("../samples.json").then((data) =>{
        var samples = data.samples;
        var result_list = samples.filter(sampleObj => sampleObj.id == sample);
        var results = result_list[0];
        var sample_values = results.sample_values;
        var otu_ids = results.otu_ids;
        var otu_labels = results.otu_labels;
        var metadata = data.metadata;
        // var y_value = otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse();
        
        // bar graph
        
        var bar_data = [
            {
            x: sample_values.slice(0, 10).reverse(),
            y: otu_ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
            text: otu_labels.slice(0, 10).reverse(),
            type: "bar",
            orientation: "h",
            }
        ];
        var bar_layout = {
            title: "Top 10 Bacteria Cultures"
        };

        Plotly.newPlot("bar", bar_data, bar_layout);

        // bubble graph
        var bubble_data = [
            {
                x: otu_ids,
                y: sample_values,
                text: otu_labels,
                mode: "markers",
                marker: {
                    size: sample_values,
                    color: otu_ids,
                    colorscale: "Earth"
                }
            } 
        ]; 
        var bubble_layout = {
            title: "Bacteria Samples",
            margin: { t: 0},
            // showlegend: false,
            hovermode: "closest",
            xaxis: {title: "OTU ID"},
        };

        Plotly.newPlot("bubble", bubble_data, bubble_layout);

    })
}


function init() {
    
    var dropdownMenu = d3.select("#selDataset");

    d3.json("../../samples.json").then((data)=>{

        var sampleNames = data.names;
        
        sampleNames.forEach((sample) => {
            dropdownMenu
                .append("option")
                .text(sample)
                .property("value", sample);
        });

        // Using first sample data to create initial charts
        var firstSample = sampleNames[0];
        buildCharts(firstSample);
        buildData(firstSample);
    });
}

function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildData(newSample);
  }

init();