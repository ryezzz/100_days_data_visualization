
// load data using d3.dsv: this format also works with CSV and avoids for loop: can parse data before loading all of it.
// https://github.com/d3/d3-dsv

d3.dsv(",", "data/ECN_2012_US_55A1_with_ann.csv", function(d) {
  
  return {
    year: new Date(+d['YEAR.id'], 0, 1), // convert "Year" column to Date
    state: d["GEO.display-label"],
    business_type: d['NAICS.display-label'],
    year_income: d.PAYANN
  };

    
}).then(function(data) {
    
    renderScatterplot(data)
    
    $(window).on('resize', function(){
         d3.select('svg')
        .remove()
         renderScatterplot(data)
    });
    
});


function renderScatterplot (data){

    var svg = d3.selectAll('.chartsWrapper')
                .append('svg')
                
    var wrapper = d3.select(svg.node().parentNode)
    
    d3.select(window).on("resize." + wrapper.attr("class"), console.log('resized'));

    var width = parseInt(wrapper.style("width")),
        height = parseInt(wrapper.style("height"))

///////////Width media queries: this is ugly, but is there another way????////////////
//window method returns device pixil width which is super high for phones, lower per inch on computers
//therefore I can't use the window method on both

    var tickAttributes = {text_size:0, text_kerning:0}

    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
        var circleRadius = width/20
        tickAttributes.text_size = 50
    } else {
        circleRadius = width/10
        tickAttributes.text_kerning = 50
    }
    
    console.log(tickAttributes.text_size)

//-----------------------end media queries----------------------------------


    svg.attr('width', width)
       .attr('height', height)
       

    var circle = svg.selectAll('.circle')
                .data(data)
                .enter()
                .append('circle')
                .attr('class', 'circle')
                .attr('r', circleRadius)
                .attr('cx', 20)
                .attr('cy', 20)
                .style('fill', 'black')
    
}


