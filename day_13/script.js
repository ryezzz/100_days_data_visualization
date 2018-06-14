var parseYear = d3.timeParse("%Y");
var parseMonth = d3.timeParse("%m");
var parseDate = d3.timeParse("%Y-%m-%d");
//Connecting each element to CSS Grid

d3.dsv(',', 'data/LNU04027662.csv', function(d) {
return {
    date: parseDate(d.DATE),
    unrate: +d.LNU04027662
    }

}).then(function(data) {
console.log(data)
render(data, 2)
})


var chartSvg = d3.select('#chart')
    .append('svg')

var rectG = chartSvg
    .append('g')

var legendSvg = d3.select('#legend')
    .append('svg')

var buttonOne = d3.select('#buttonOne')
    .text('Sort By Month')


function returnParentHeight(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))
}

function returnParentWidth(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))
}




function render(groupByYear, groupByMonth) {
    
    var rects = rectG.selectAll('rect')
                .data(groupByYear)
                .enter()
                .append('rect')
                .attr('class', 'bar')
                .on("mouseover", function(d){
                    console.log(d.date)

                })
                
    
    function responsiveUpdatedVariables(changingVar) {
        var width = returnParentWidth(chartSvg)
        var height = returnParentHeight(chartSvg)
        // d3.map(data, function(d) { return d.year; }).keys()
        chartSvg.attr('width', width)
                .attr('height', height)
     var widthArr = d3.map(groupByYear, function(d){return d.date}).keys()
     
     var scaleWidth = d3.scaleBand()
                      .domain(d3.map(groupByYear, function(d){return d.date}).keys())
                      .range([0, width])
     var scaleZ = d3.scaleLinear()
                    .domain(d3.extent(groupByYear, function(d){return d.unrate}))
                    .range([1,0])
    
    var scaleX = d3.scalePoint()
        .domain(widthArr)
        .range([0, width])
        
        rects
            .attr('x', function(d){return scaleX(d.date)})
            .attr('width', function(d){return scaleWidth.bandwidth()})
            .attr('height', height)
            .style('fill', '#dd760f')
            .style('opacity',  function(d){return scaleZ(d.unrate)})

    console.log(scaleX(parseYear("Thu Jan 01 1948 00:00:00 GMT-0500 (Eastern Standard Time)")))

            }



    changingData()


    var checkVal = true;

    ////Stuff that will change on button click
    function changingData() {
        if (checkVal) {
            checkVal = false
            var passVar = "month"
            buttonOne.text("Sort By Year")
        }
        else {
            checkVal = true
            passVar = "date"
            buttonOne.text("Sort By Month")
        }


        responsiveUpdatedVariables(passVar)


        d3.select(window).on("resize", function(d) {
            responsiveUpdatedVariables([passVar])

        })

    }




    buttonOne.on('click', function() {
        changingData()
    })



}


//Finally understand the power of promise chaining for maintaining speed but chaining asyncronous callbacks