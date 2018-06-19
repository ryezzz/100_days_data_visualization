


var yearParse = d3.timeParse("%Y")

function returnParentMeasurements(itemToMeasure) {
    var measurementObj = new Object
    var width = parseInt(d3.select(itemToMeasure.node().parentNode).style('width'))
    var height = parseInt(d3.select(itemToMeasure.node().parentNode).style('height'))
    measurementObj.width = width;
    measurementObj.height = height;
    return (measurementObj)
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
        d3.selectAll('.tooltip').remove()
        renderScatterplot(data)
    });

});


  
  
function renderScatterplot(data) {
    function noscroll() {
  window.scrollTo( 0, 0 );
}

// add listener to disable scroll
window.addEventListener('scroll', noscroll);

// Remove listener to disable scroll
    document.body.addEventListener('touchmove', function(event) {
    console.log(event.source);
      event.preventDefault();
  }, {
    passive: false,
    useCapture: true
  });


    var chartSvg = d3.select('#chartContainer').append('svg')

    var legendSvg = d3.select('#legendContainer').append('svg')

    var chartMeasurements = returnParentMeasurements(chartSvg),
        legendMeasurements = returnParentMeasurements(legendSvg)

    var xScale = d3.scaleTime()
        .domain(d3.extent(data, function(d) { return d.year }))
        .range([0, chartMeasurements.width])

    var yScale = d3.scaleLinear()
        .domain(d3.extent(data, function(d) { return d.col }))
        .range([chartMeasurements.height, 0])
    var colorScale = d3.scaleOrdinal()
        .domain(d3.map(data, function(d) { return d.q; }).keys())
        .range(['red', 'green', 'blue', 'orange']);

    var x = d3.scaleLinear()
        .range([chartMeasurements.width, 0])

    var y = d3.scaleLinear()
        .range([0, chartMeasurements.height])

    legendSvg.attr('width', legendMeasurements.width)
        .attr('height', legendMeasurements.height)

    var circleG = chartSvg.append('g')
        .attr('class', 'circleG')
        .attr("transform", "translate(" + 0 + "," + -30 + ")");

    var formatYear = d3.timeFormat('%y')

    var tooltip = d3.select("body")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("z-index", "10")
        .style("visibility", "hidden")

    circleG.selectAll('.circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class', function(d) { return "a" + formatYear(d.year) + "_" + Math.round(d.col) + "a" })
        .attr('r', 1)
        .attr('cx', function(d) { return xScale(d.year) })
        .attr('cy', function(d) { return yScale(d.col) })
        .style('fill', function(d) { return colorScale(d.col) })

    chartSvg.attr('width', chartMeasurements.width)
        .attr('height', chartMeasurements.height)

    chartSvg.append('g')
        .attr('class', 'xAxis')
        .call(d3.axisBottom(xScale))
        .attr("transform", "translate(" + 0 + "," + (chartMeasurements.height - 30) + ")")
    chartSvg.append('g')
        .attr('class', 'yAxis')
        //   .call(d3.axisLeft(yScale))
        .attr("transform", "translate(" + 20 + "," + 0 + ")")

    var voronoi = d3.voronoi()
        .x(function(d) { return xScale(d.year); })
        .y(function(d) { return yScale(d.col); })
        .extent([
            [0, 0],
            [chartMeasurements.width, chartMeasurements.height]
        ]);

    var voronoiGroup = chartSvg.append("g")
        .attr("class", "voronoi")
        .attr("transform", "translate(" + 0 + "," + -30 + ")");



    voronoiGroup.selectAll("path")
        .data(voronoi(data).polygons())
        .enter().append("path")
        .attr("d", function(d) { return d ? "M" + d.join("L") + "Z" : null; })
        .style('opacity', '0')
        .on('mousemove', mouseover)
        .on('touchmove', touchmove)
        .on('mouseout', mouseout)

    function mouseover(d) {
        d3.selectAll(".a" + formatYear(d.data.year) + "_" + Math.round(d.data.col) + "a").transition().duration(80).attr('r', 5);
        tooltip.html(d.data.col)
            .style('visibility', 'visible')
            .style("top", (event.pageY - 20) + "px")
            .style("left", (event.pageX + 20) + "px")
    }

    function mouseout(d) {
        d3.selectAll(".a" + formatYear(d.data.year) + "_" + Math.round(d.data.col) + "a").transition().duration(80).attr('r', 1);
        tooltip.style('visibility', 'hidden')
    }
    
    function touchmove(d) {
        d3.selectAll(".a" + formatYear(d.data.year) + "_" + Math.round(d.data.col) + "a").transition().duration(80).attr('r', 5);
        tooltip.html(d.data.col)
            .style('visibility', 'visible')
            .style("top", (event.pageY - 20) + "px")
            .style("left", (event.pageX + 20) + "px")
    }

    

}

