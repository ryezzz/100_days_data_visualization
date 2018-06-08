var parseYear = d3.timeParse("%Y");
var parseMonth = d3.timeParse("%m");
//Connecting each element to CSS Grid
d3.dsv(',', 'data/CPIAUCSL.csv', function(d) {
    console.log(d)
    var dateArr = d.DATE.split('-');
    console.log(dateArr[0])

    return {
        month: parseMonth(dateArr[1]),
        key: parseYear(dateArr[0]),
        value: d.CPIAUCSL
    }

}).then(function(data) {
    var groupByTime = data
    var groupByMonth = d3.nest()
        .key(function(d) { return d.month; })
        .entries(data);

    render(groupByTime, groupByMonth)

})


var chartSvg = d3.select('#chart')
    .append('svg')

var chargG = chartSvg
    .append('g')

var legendSvg = d3.select('#legend')
    .append('svg')

var buttonOne = d3.select('buttonOne')


function returnParentHeight(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))
}

function returnParentWidth(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))
}

function render(groupByMonth, groupByYear) {

    console.log(groupByMonth, groupByYear)
    //Stuff that won't change
    chartSvg.style('background-color', 'lightgray')

    //Stuff that will change on window resize
    function responsiveUpdatedVariables() {

        var chartWidth = returnParentWidth(chartSvg),
            chartHeight = returnParentHeight(legendSvg)

        chartSvg.attr('height', chartHeight)
        chartSvg.attr('width', chartWidth)

        var x = d3.scaleTime()
        .domain(d3.extent(groupByMonth, function(d) { return d.month; }))
        .range([0, chartWidth]);


        var simulation = d3.forceSimulation(groupByYear)
            .force("x", d3.forceX(function(d) { return x(d.value); }).strength(1))
            .force("y", d3.forceY(chartHeight / 2))
            .force("collide", d3.forceCollide(1))
            .stop();

        for (var i = 0; i < 120; ++i) simulation.tick();

        chargG.append("g")
            .attr("class", "axis axis--x")
            .attr("transform", "translate(0," + chartHeight + ")")

        var cell = chargG.append("g") 
                // .class('cell')
                .selectAll("g").data(d3.voronoi()
                .extent([0, chartWidth])
                .x(function(d) { return d.x; })
                .y(function(d) { return d.y; })
                .polygons(groupByMonth)).enter().append("g");

            cell.append("circle")
                .data(groupByMonth)
                .attr("r", 3)
                .attr("cx", function(d) { return x(d.month); })
                .attr("cy", function(d) { return chartHeight; })
        
            cell.append("path")
                .data(groupByMonth)
                .attr("d", function(d) { return "M" + d.join("L") + "Z"; });

        
            }

    responsiveUpdatedVariables()

    ////Stuff that will change on button click
    function changingData(changingVariables) {

    }


    $(window).on('resize', function() {
        responsiveUpdatedVariables()
    });


    buttonOne.on('click', function() {
        //Change d on dataset
    })



}


//Finally understand the power of promise chaining for maintaining speed but chaining asyncronous callbacks