// modified from: https://stackoverflow.com/questions/49534470/d3-js-v5-promise-all-replaced-d3-queue
//https://stackoverflow.com/questions/21976567/write-objects-into-file-with-node-js
//https://github.com/d3/d3-fetch/issues/19
var d3 = require("d3");
var poly = require("node-fetch-polyfill")
var fs = require('fs');


if (typeof fetch !== 'function') {
    global.fetch = require('node-fetch-polyfill');
}
const csv = require('d3-fetch').csv;

var files = ["https://hundred-day-ryez.c9users.io/day_4/data/malawi_landsat_5_7_8_1990-2018.csv", "https://hundred-day-ryez.c9users.io/day_4/data/worldBank.csv"];
var promises = [];

files.forEach(function(url) {
    //Parse/clean the data on first load: this needs to be conditional because it's specific to the datasets
    promises.push(csv(url, function(d) {
        if (d.date) {

            return {
                //averaging year only
                date: d.date.split('-')[2],
                ndvi: +d.ndvi
            }
            //I used conditionals to deal with two different lables on two different datasets
        }
        else if (d["GDP per capita growth (annual %) [NY.GDP.PCAP.KD.ZG]"]) {
            return {
                date: d.Time,
                productivity: d['Agriculture, value added per worker (constant 2010 US$) [NV.AGR.EMPL.KD]'],
                // gdp: d["GDP per capita growth (annual %) [NY.GDP.PCAP.KD.ZG]"]
            }
        }
    }))
});


//Complete the promise and render chart
Promise.all(promises).then(function(data) {

    var gdp = []
    var productivity = []
    var combo = new Object
    var worldBank = data[1]
    var ndvi = d3.nest()
        .key(function(d) { return d.date; }) //NB: use "d.year", not "year"
        .rollup(function(v) { return d3.mean(v, function(d) { return d.ndvi; }); })
        .entries(data[0]);
    //move object generation to promises    
    worldBank.forEach(function(d) {
        var newObj = new Object()
        var newObj2 = new Object()
        newObj.key = d.date
        newObj.value = d.gdp
        newObj2.key = d.date
        newObj2.value = d.productivity
        console.log(newObj2)
        gdp.push(newObj)
        productivity.push(newObj2)
    })
   
    combo.gdp = gdp
    combo.productivity = productivity
    combo.ndvi = ndvi
    
    return combo
    
}).then(function(data) {
    
    fs.writeFile('data/ndvi.json', JSON.stringify(data.ndvi, null, 2), 'utf-8');
    fs.writeFile('data/productivity.json', JSON.stringify(data.productivity, null, 2), 'utf-8');
    fs.writeFile('data/gdp.json', JSON.stringify(data.ndvi, null, 2), 'utf-8');

})





// change all values to key/value pairs
