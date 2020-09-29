d3.json("../../samples.json").then((data)=>{
    var otu_labels = data.samples.map(d => d.otu_labels[0]);
    var otu_ids = data.samples.map(d => d.otu_ids[0]);
    var sample_values = data.samples.map(d => d.sample_values[0])
    var wfreq = data.metadata.map(d => d.wfreq);
    // console.log(otu_labels);
    // console.log(otu_ids);
    // console.log(sample_values);
    // console.log(wfreq);
});

