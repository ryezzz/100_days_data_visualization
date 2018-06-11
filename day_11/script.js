var parseYear = d3.timeParse("%Y");
var parseMonth = d3.timeParse("%m");
var parseDate = d3.timeParse("%Y-%m-%d");
//Connecting each element to CSS Grid

d3.dsv(',', 'data/DGS10.csv', function(d) {


}).then(function(data) {
    
render(data, 2)
})


var chartSvg = d3.select('#chart')
    .append('svg')

var circleG = chartSvg
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


    //Stuff that won't change
   
    //Stuff that will change on window resize

    function responsiveUpdatedVariables(changingVar) {
      console.log(changingVar)
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