var parseYear = d3.timeParse("%Y");
var parseMonth = d3.timeParse("%m");
var parseDate = d3.timeParse("%Y-%m-%d");
//Connecting each element to CSS Grid
d3.dsv(',', 'data/DGS10.csv', function(d) {
    // console.log(d)
    var dateArr = d.DATE.split('-');
    if (+d.DGS10 && dateArr[0] > 2012) {
        return {
            date: parseDate(d.DATE),
            month: dateArr[1],
            year: dateArr[0],
            key: parseYear(dateArr[0]),
            value: +d.DGS10
        }
    }

}).then(function(data) {
    var groupByTime = data
    var groupByYear = d3.nest()
        .key(function(d) { return d.year; })
        .entries(data);
        
    var groupByMonth = d3.nest()
        .key(function(d) { return d.month; })
        .entries(data);

    render(groupByTime, groupByMonth)

})


var chartSvg = d3.select('#chart')
    .append('svg')

var circleG = chartSvg
    .append('g')

var legendSvg = d3.select('#legend')
    .append('svg')

var buttonOne = d3.select('#buttonOne')


function returnParentHeight(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))
}

function returnParentWidth(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))
}




function render(groupByYear, groupByMonth) {


    //Stuff that won't change
    // chartSvg.style('background-color', 'lightgray')

    var xScale = d3.scaleTime()
    // .domain(d3.extent(groupByYear, function(d){return d.date}))


    var yScale = d3.scaleLinear()
        .domain(d3.extent(groupByYear, function(d) { return d.value }))




    var circles =
        circleG.selectAll('circle')
        .data(groupByYear)
        .enter()
        .append('circle')
        .attr('r', 0)

    var g = chartSvg.append(g)
    //Stuff that will change on window resize





    function responsiveUpdatedVariables(changingVar) {
        //define hight/width on resize
        var chartWidth = returnParentWidth(chartSvg),
            chartHeight = returnParentHeight(chartSvg)

        //Change attributes of chart itself on resize
        chartSvg
            // .transition()
            .attr('height', chartHeight)
            .attr('width', chartWidth)

        // Change overall xScale on resize
        xScale.range([0, chartWidth])

        yScale.range([chartHeight, 0])

        // Change circle width on resize
        circles
            .transition()
            .duration(300)
            .attr('cx',
                function(d) {
                    return xScale(d[changingVar])
                })
            .attr('cy', function(d) { return yScale(d.value) })
            .attr('r', chartHeight/250)



    }



    changingData()


    var checkVal = true;

    ////Stuff that will change on button click
    function changingData() {
        if (checkVal) {
            checkVal = false
            var passVar = "month"
            buttonOne.text("Monthly Aggregate: 10-Year Treasury Constant Maturity Rate 2013-2018")
        }
        else {
            checkVal = true
            passVar = "date"
            buttonOne.text("10-Year Treasury Constant Maturity Rate 2013-2018")
        }


        xScale
            .domain(d3.extent(groupByYear, function(d) { return d[passVar] }))

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