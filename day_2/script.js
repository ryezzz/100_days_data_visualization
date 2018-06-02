var parseTime = d3.timeParse("%Y-%m-%d")
var monthParse = d3.timeParse("%m")
var yearParse = d3.timeParse("%Y")
    
d3.dsv(',', 'data/TOTALSA.csv', function(d) {
         

        var split = d.DATE.split("-")
        var year = split[0]
        return {
            date: parseTime(d.DATE),
            year: yearParse(+split[0]),
            month: monthParse(+split[1]),
            totalSA: +d.TOTALSA
        }
        
    }).then(function(data) {
//Render chart/legend/everything that has an SVG on first load and resize    
        $(window).on('resize', function() {
            d3.selectAll('svg')
              .remove()
            renderHeatmap(data)
        });
    
        renderHeatmap(data)
});


function renderHeatmap(data) {


//variables for the svgs. These need to be created in the render function rather than globally beause of my remove method   
    var chartSVG = d3.selectAll('.chartWrapper').append('svg'),
        legendSvg = d3.selectAll('.legendWrapper').append('svg'),
        width = function returnWidth(itemToMeasure) {return parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))},
        height = function returnWidth(itemToMeasure) {return parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))},
        widthChart = width(chartSVG),
        heightChart = height(chartSVG),
        widthLegend = width(legendSvg)
        
//Responsive Variables
    var tickAttributes = new Object(),
        legendAttributes = new Object(),
        chartAttributes = new Object()
        chartAttributes.rectHeight = heightChart/12;

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) | window.innerWidth < 600) {
        chartAttributes.rectWidth = widthChart / 12
        tickAttributes.text_size = 50
    }
    else {
        chartAttributes.rectWidth = widthChart / 12
        tickAttributes.text_kerning = 50
    }
    
    // var timeScale = d3.scaleTime()
    // console.log(timeScale(d3.extent(data, function(d) { return d.month })))
        
        
    var yDomain = d3.extent(data, function(d) {return d.month}),
        
        xDomain = d3.extent(data, function(d){return d.year}),
                
        yScaleChart =  d3.scaleTime()
                      .domain(yDomain)
                      .rangeRound([0, heightChart]),
        xScaleChart = d3.scaleTime()
                      .domain(xDomain)
                      .rangeRound([0, widthChart]),
        
         colorScaleChart = d3.scaleLinear()
                            .domain(d3.extent(data, function(d) {return d.totalSA}))
                            .range([0, 1]);

//First, render the chart with the responsive variables defined above
    function renderChart() {

        chartSVG.attr('width', widthChart)

        var formatYear = d3.timeFormat("%Y")
        var formatMonth = d3.timeFormat("%m")
        console.log(xDomain)
        var rectWidth = formatYear(xDomain[1])-formatYear(xDomain[0]),
            rectHeight = formatMonth(yDomain[1])-formatMonth(yDomain[0])

        
        chartSVG.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', widthChart/rectWidth)
            .attr('height',  heightChart/rectHeight)
            .attr('y', function(d){ return yScaleChart(d.month)})
            .attr('x', function(d){ return xScaleChart(d.year)})
            .attr('fill', function(d){return 'orange'})
            .attr('opacity', function(d){return colorScaleChart(d.totalSA)})
    }

    renderChart()


//Second, render the legend
    function renderLegend() {


        legendSvg.attr('width', parseInt(d3.select(legendSvg.node().parentNode).style('width')))
    }

    renderLegend()

}