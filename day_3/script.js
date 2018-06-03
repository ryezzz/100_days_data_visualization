var yearParse = d3.timeParse("%Y")

function returnParentMeasurements(itemToMeasure) { 
    var measurementObj = new Object
    var width = parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))
    var height = parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))
    measurementObj.width = width;
    measurementObj.height = height;
    return(measurementObj)
}



d3.dsv(',', 'data/rinvbfQvQd.csv', function(d) {

    var arr = d.DATE.split(":");
    var year = yearParse(+arr[0])
    console.log(year)
    var qu = arr[1]
    
    return {
        date: d.DATE,
        year: year,
        qu: qu,
        col: +d.rinvbf18Q2,
    }

}).then(function(data) {
    //Render chart/legend/everything that has an SVG on first load and resize    
   
    renderScatterplot(data)
    
    $(window).on('resize', function() {
        d3.selectAll('svg').remove()
        renderScatterplot(data)
    });
    
});



function renderScatterplot(data){
    
    console.log(data)
    
    var chartSvg = d3.select('#chartContainer').append('svg') 

    var legendSvg = d3.select('#legendContainer').append('svg')
    
    var chartMeasurements = returnParentMeasurements(chartSvg),
        legendMeasurements = returnParentMeasurements(legendSvg)
        
    var xScale = d3.scaleTime()
                 .domain(d3.extent(data, function(d) { return d.year }))
                 .range ([0, chartMeasurements.width])
                 
    var yScale = d3.scaleLinear()
                 .domain(d3.extent(data, function(d) { return d.col }))
                 .range ([chartMeasurements.height, 0])
    var colorScale = d3.scaleOrdinal()
                       .domain(d3.map(data, function(d) { return d.col; }).keys())
                       .range(['red', 'green', 'blue', 'yellow']);

        
    legendSvg.attr('width',  legendMeasurements.width)
             .attr('height', legendMeasurements.height)
             
             
    chartSvg.selectAll('.circle')
             .data(data)
             .enter()
             .append('circle')
             .attr('class', 'circle')
             .attr('r', 1)
             .attr('cx', function(d){ return xScale(d.year)})
             .attr('cy', function(d){ return yScale(d.col)})
             .style('fill', function(d){ return colorScale(d.col)})
             
    chartSvg.attr('width', chartMeasurements.width)
             .attr('height', chartMeasurements.height)
             
}