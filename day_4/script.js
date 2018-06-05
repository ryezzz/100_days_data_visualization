// modified from: https://stackoverflow.com/questions/49534470/d3-js-v5-promise-all-replaced-d3-queue
var files = ["data/ndvi.json", "data/gdp.json", "data/productivity.json"];
var promises = [];

files.forEach(function(url) {
    promises.push(d3.json(url))
});

Promise.all(promises).then(function(values) {
            render(values[0])

        $(window).on('resize', function() {
        d3.selectAll('svg').remove()
        d3.selectAll('.tooltip').remove()
        render(values[0])
    });
    
});


function render(data){
    var svg = d3.selectAll('.chart')
                .append('svg')
                .attr('width', window.innerWidth)
                .attr('height', window.innerHeight)
                
    svg.selectAll('.circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('class','circle')
        .attr('r', window.innerWidth/10)
        .attr('cx', window.innerWidth/2)
        .attr('cy', window.innerHeight/2)
    
    
}