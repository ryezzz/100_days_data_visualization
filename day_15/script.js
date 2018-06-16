var parseYear = d3.timeParse("%Y");
var parseMonth = d3.timeParse("%m");
var parseDate = d3.timeParse("%Y-%m-%d");
var formatYear = d3.timeFormat('%Y')
//Connecting each element to CSS Grid



var files = ["data/LNU04027662.csv", "data/UNRATE.csv"];
var promises = [];

files.forEach(function(url) {
    //Parse/clean the data on first load: this needs to be conditional because it's specific to the datasets
    promises.push(d3.csv(url, function(d) {
        if (d.LNU04027662) {

            return {
                //averaging year only
                date: parseDate(d.DATE),
                value: +d.LNU04027662
            }
            //I used conditionals to deal with two different lables on two different datasets
        }
        else if (d.UNRATE && +d.DATE.split("-")[0]>=1992) {
            return {
                date: parseDate(d.DATE),
                value: +d.UNRATE,
                // gdp: d["GDP per capita growth (annual %) [NY.GDP.PCAP.KD.ZG]"]
            }
        }
    }))
});


//Complete the promise and render chart
Promise.all(promises).then(function(data) {
    render(data[0], data[1])

})


var chartSvg = d3.select('#chart')
    .append('svg')

var rectG = chartSvg
    .append('g')

var legendSvg = d3.select('#legend')
    .append('svg')

var buttonOne = d3.select('#buttonOne')
    .text('Total Unemployed')


function returnParentHeight(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))
}

function returnParentWidth(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))
}




function render(data1, data2) {
    
     var rects = rectG.selectAll('rect')
            .data(data1)
            .enter()
            .append('rect')
            .attr('class', 'bar')
            .on("mouseover", function(d) {
                console.log(d.date)

            })
     var xAxisG = chartSvg.append('g')
     
    
            
    changingData()


    var checkVal = true;

    ////Stuff that will change on button click
    function changingData() {
        if (checkVal) {
            checkVal = false
            var data = data1
            buttonOne.text("Educated Unemployed")
        }
        else {
            checkVal = true
            data = data2
            buttonOne.text("Total Unemployed")
        }
        


        
        rects
            .data(data)
        //     .enter()
        //     .append('rect')
        //     .attr('class', 'bar')
        //     .on("mouseover", function(d) {
        //         console.log(d.date)

        //     })

        responsiveUpdatedVariables(data)


        d3.select(window).on("resize", function(d) {
            responsiveUpdatedVariables(data)

        })

    }

    function responsiveUpdatedVariables(data) {
        // console.log(rects)


        var width = returnParentWidth(chartSvg)
        var height = returnParentHeight(chartSvg)

        chartSvg.attr('width', width)
                .attr('height', height)
                
        var widthArr = d3.map(data, function(d) { return d.date }).keys()

        var scaleWidth = d3.scaleBand()
            .domain(d3.map(data, function(d) { return d.date }).keys())
            .range([0, width])
            
        var scaleWidthAxis = d3.scaleBand()
            .domain(d3.map(data, function(d) { return formatYear(d.date) }).keys())
            .range([0, width])
            
        var scaleZ = d3.scaleLinear()
            .domain(d3.extent(data, function(d) { return d.value }))
            .range([1, 0])

        var scaleX = d3.scalePoint()
            .domain(widthArr)
            .range([0, width])
        var xAxis = xAxisG.call(d3.axisBottom(scaleWidthAxis)
                                   .tickValues(d3.map(data, function(d) { return formatYear(d.date) }).keys()))
        rects
            .transition()
            .duration(1000)
            .attr('x', function(d) { console.log (d); return scaleX(d.date) })
            .attr('width', function(d) { return scaleWidth.bandwidth() })
            .attr('height', height)
            // .style('fill', '#dd760f')
            .style('opacity', function(d) { return scaleZ(d.value) })


    }











    buttonOne.on('click', function() {
        changingData()
    })



}


//Finally understand the power of promise chaining for maintaining speed but chaining asyncronous callbacks