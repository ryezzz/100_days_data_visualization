

var width = window.innerWidth / 1.2,
    height = window.innerHeight / 1.1;


        // $(document.body).css('overflow-y', 'hidden'); 
        // $('*').filter(function(index) {
        //     return $(this).css('display') == 'block';
        // }).css('overflow-y', 'hidden');

var allOptions = d3.selectAll('.allOptions');


render(5, 500, 50);


var cockroachNumberSlider = d3.select('#cockroachNumberInput');

var shelterNumberSlider = d3.select('#shelterNumberInput')

var capacityNumberSlider = d3.select('#capacityNumberInput')

var output1 = document.querySelector('#shelterOutput');

var output2 = document.querySelector('#roachOutput');

var output3 = document.querySelector('#capacityOutput');




shelterNumberSlider.on('input', function() {
    d3.selectAll("svg").remove();
    shelterNumberSlider = (this.value);
    cockroachNumberSlider = $("#cockroachNumberInput").val();
    capacityNumberSlider = $("#capacityNumberInput").val();
    render(shelterNumberSlider, cockroachNumberSlider, capacityNumberSlider);
    output1.value = this.value;
});


cockroachNumberSlider.on('input', function() {
    d3.selectAll("svg").transition().remove();
    cockroachNumberSlider = (this.value);
    shelterNumberSlider = $("#shelterNumberInput").val();
    capacityNumberSlider = $("#capacityNumberInput").val();
    output2.value = this.value;
    render(shelterNumberSlider, cockroachNumberSlider, capacityNumberSlider);
});

capacityNumberSlider.on('input', function() {
    d3.selectAll("svg").remove();
    capacityNumberSlider = (this.value);
    shelterNumberSlider = $("#shelterNumberInput").val();
    cockroachNumberSlider = $("#cockroachNumberInput").val();
    output3.value = this.value;
    render(shelterNumberSlider, cockroachNumberSlider, capacityNumberSlider);
});


function gcd(a, b) {
    a = Math.abs(a);
    b = Math.abs(b);
    if (b > a) {
        var temp = a;
        a = b;
        b = temp;
    }
    while (true) {
        if (b == 0) return a;
        a %= b;
        if (a == 0) return b;
        b %= a;
    }
}




document.getElementById("rangeInput");


function render(shelterNumberInput, roachNumberInput, capacityNumberInput) {

    var shelterNumber = shelterNumberInput;

    var roachcapacity = capacityNumberInput; //25

    var roachNumber = roachNumberInput; //50

    var forceNumber = 5;

    var shelterSize = width / 2 / shelterNumber;
    //*1.25
    var roachSizeLarge = shelterSize / Math.sqrt(roachcapacity);

    var roachSizeSmall = shelterSize / Math.sqrt(roachcapacity * 1.9);


    var allTestValues = [];



    //Start generating roach distribution based on shelter number, shelter capacity and shelter size: They will choose the maximum density for all insects based on shelter capacity.



    for (var i = 0; i < roachNumber; i++) {
        allTestValues.push(i);
    }




    function makeOddEven(number) {

        if (number % 2 != 0) {
            return number * 1;
        }
        else {
            return number * 1;
        }

    }



    var testForMax = [];

    for (var i = makeOddEven(roachNumber); i > 0; i--) {
        var roachTest = makeOddEven(roachNumber) / allTestValues[i]
        if (roachTest <= roachcapacity) {
            testForMax.push(roachTest)
        }
    }


    function checkIfForceLargerThanshelter() {
        var forceforcheck = makeOddEven(roachNumber) / d3.max(testForMax)
        if (forceforcheck < shelterNumber) {
            d3.select('#forceNumberOverallText')
                .html(" they will choose to stay both tightly clustered and evenly divided in <span id='forceNumberText' class='uniqueInput'></span> shelters.")
                .style('color', '#696d72');
            return forceforcheck
        }
        else {
            d3.select('#forceNumberOverallText')
                .html(" they will fill all shelters to capacity and overflow.")
                .style('color', '#ffffff');
            return shelterNumber
        }

    }

    forceNumber = checkIfForceLargerThanshelter();









    d3.select('#roachNumberText')
        .text(" " + roachNumberInput + " ");

    d3.select('#shelterNumberText')
        .text(" " + shelterNumberInput + " ");

    d3.select('#roachcapacityText')
        .text(" " + capacityNumberInput + " ");

    d3.select('#forceNumberText')
        .text(" " + forceNumber + " ");


    var nodes = d3.range(forceNumber).map(function(i) {
        console.log(i)
        return {
            fixed: true,
            type: Math.random() * 3 | 4,
            radius: 3,
            // type: i,
            x: (i + .6) * (width * 1.1 / shelterNumber),
            y: height / 1.5
        };
    });



    var shelterNodes = d3.range(shelterNumber).map(function(i) {
        return {
            fixed: true,
            type: Math.random() * 5 | 0,
            radius: shelterSize,
            type: i,
            x: (i + .6) * (width * 1.1 / shelterNumber),
            y: height / 1.5
        };
    });


    var force = d3.layout.force()
        .gravity(0)
        .charge(0)
        .nodes(nodes)
        .size([width, height])
        .on("tick", ticked);

    var svg = d3.select("body").append("svg")
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight)
        .attr("id", "containgSVG")
        .on("mousemove", mousemoved)
        .on("touchmove", mousemoved);


    var containingCircle = svg.selectAll(".containingCircle")
        .data(shelterNodes)
        .enter().append("circle")
        .attr("class", "containingCircle")
        .attr("r", function(d) { return d.radius; })
        .style("stroke", function(d) { return "#dbdbdb"; })
        .style("opacity", .5)
        .style("stroke-width", function(d) { return 3; });




    force.start();

    var nodeNumberArr = [];


    function getRandomIntForSize(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //The maximum is exclusive and the minimum is inclusive
    }



    var p0;

    function mousemoved() {
        var fixed = document.getElementById('containgSVG');
        var input = document.getElementsByClassName('input');

  fixed.addEventListener('touchmove', function(event) {
    console.log(event.source);
      event.preventDefault();
  }, {
    passive: false,
    useCapture: true
  });


        nodeNumberArr.push(1);
        var p1 = d3.mouse(this);
        p0 = p1;
        var node = {
            radius: getRandomIntForSize(roachSizeLarge, roachSizeSmall),
            ///this is where I hange the force to include all circles
            //No type leads to great drawing tool
            type: Math.random() * forceNumber | 0,
            x: p1[0],
            y: p1[1],
            px: (p0 || (p0 = p1))[0],
            py: p0[1],
            rx: 10,
            ry: 18
        };


        if (nodeNumberArr.length <= roachNumber) {
            svg.append("circle")
                .data([node])

                .attr("r", function(d) { return d.radius - 2; })
                .style("fill", function(d) { return "#70cbd3"; })
                .transition()
                .delay(100000)
                .attr("r", 1e-6)
                .each("end", function() { nodes.splice(6, 1); })
                .remove();
            nodes.push(node);
            force.resume();
        }
    }


    function ticked(e) {
        var q = d3.geom.quadtree(nodes),
            k = e.alpha * 0.1,
            i = 0,
            n = nodes.length,
            o;

        while (++i < n) {
            o = nodes[i];
            if (o.fixed) continue;
            c = nodes[o.type];
            o.x += (c.x - o.x) * k;
            o.y += (c.y - o.y) * k;
            q.visit(collide(o));
        }
// What is D? THIS IS WHERE THE PROBLEM HAPPENS: 
        svg.selectAll("circle")
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }


    function collide(node) {
        var r = node.radius + 10,
            nx1 = node.x - r,
            nx2 = node.x + r,
            ny1 = node.y - r,
            ny2 = node.y + r;
        return function(quad, x1, y1, x2, y2) {
            if (quad.point && (quad.point !== node)) {
                var x = node.x - quad.point.x,
                    y = node.y - quad.point.y,
                    l = Math.sqrt(x * x + y * y),
                    r = node.radius + quad.point.radius;
                if (l < r) {
                    l = (l - r) / l * .5;
                    node.px += x * l;
                    node.py += y * l;
                }
            }
            return x1 > nx2 ||
                x2 < nx1 ||
                y1 > ny2 ||
                y2 < ny1;
        };
        
        
    }



}

