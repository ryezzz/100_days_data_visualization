var parseTime = d3.timeParse("%Y");

//Connecting each element to CSS Grid
d3.dsv(',', 'data/RSAHORUSQ156S.csv', function(d) {
    var dateArr = d.DATE.split('-');
    console.log(dateArr[0])

    function renameQuarter(testNum) {
        //Rename Quarters
        if (testNum == "01") {
            return "Q1"
        }
        else if (testNum == '04') {
            return "Q2"
        }
        else if (testNum == '07') {
            return "Q3"
        }
        else {
            return "Q4"
        }
    }
    return {
        // year: parseTime(dateArr[0]),
        key: parseTime(dateArr[0]),
        quarter: renameQuarter(dateArr[1]),
        // homeownership_rate: d.RSAHORUSQ156S
        value: d.RSAHORUSQ156S
    }

}).then(function(data) {
    var groupByTime = data
    var groupByQuarters = d3.nest()
        .key(function(d) { return d.quarter; })
        .entries(data);

    render(groupByTime, groupByQuarters)

})


var chartSvg = d3.select('#chart')
    .append('svg')

var legendSvg = d3.select('#legend')
    .append('svg')

var buttonOne = d3.select('buttonOne')


function returnParentHeight(itemToMeasure) {
     return parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))
}

function returnParentWidth(itemToMeasure) {
    return parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))
}

function render(dataset1, dataset2) {
//Stuff that won't change
    chartSvg.style('background-color', 'blue')

//Stuff that will change on window resize
    function responsiveUpdatedVariables() {
        
        var chartWidth = returnParentWidth(chartSvg),
            chartHeight = returnParentHeight(legendSvg)
        
        chartSvg.attr('height', chartHeight)
        chartSvg.attr('width', chartWidth)
    }

    responsiveUpdatedVariables()
    
////Stuff that will change on button click
    function changingData (changingVariables){
        
    }
    
    changingData(dataset1)
    
    $(window).on('resize', function() {
        responsiveUpdatedVariables()
    });

    
    buttonOne.on('click', function() {
        //Change d on dataset
    })
    


}


//Finally understand the power of promise chaining for maintaining speed but chaining asyncronous callbacks