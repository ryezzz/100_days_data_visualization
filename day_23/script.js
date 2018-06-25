var bootstrapClass = 'col-12'

var container = d3.select("#countryContainer")
            //   .append("div")
            //   .attr('class', 'container')
            //   .attr('id', 'countryContainer')
               
var key = container
          .append('div')
          
var togglingTitleFontSize = '2vw';

var allcountries = []

var countriescheckforrepeat = [];
        var countriesNotRepeated = [];
        
        
var togglingTitleFontSize = '1.5vw';

var margin = {top: 40, right:0 , bottom: 14, left: 0},
    width = window.innerWidth- margin.left - margin.right,
    height = window.innerHeight+5000- margin.top - margin.bottom;
    

// if(window.innerWidth<500){
//     width = window.innerWidth/1.2
// }  

var unParsedData =[];
        
//Positive and Negative Bar Chart          
var x = d3.scaleLinear()
          .range([0,width]);
          
var y = d3.scaleBand()
          .rangeRound([height,0])
          .padding(0.3);
          
var colorArray = ["#0a97d9", "#6254a8", "#2f9969", "#fcc30b", "#a21942"]

var z = d3.scaleOrdinal()
        // .range(d3.schemePaired);26bde2
          .range(["#2f9969", "#a21942", "#0a97d9", "#6254a8", "#fd9d24", "#fcc30b"]); 
          
//Stacked Area Chart
var parseDate = d3.timeParse("%Y");

// d3.timeYears(1990, 2014[ 2]);

var classArrayForInteraction = [];
          
//This is an array of all the different income categories     
var objectKeys = [];

// Where I put my key value pairs of colors
var objectColors = []



//End overlay


    
//This is an array of ALL countries combined with their change listed              
    
        
function render(data, i){
    
    
    
    function parseClass(objectkey){
     return objectkey.replace('aIncome', "Income")
                 .replace('bIncome', "Income")
                 .replace('cIncome', "Income")
                 .replace('dIncome', "Income")
                 .replace('eIncome', "Income")
                 .replace('by', "by the ")
                 .replace('twenty', " quintile of the population ")
                 .replace(/_/g, ' ')}
                 
                 
                 
                 
    
      objectColors.sort(function(b, a) {
  var nameA = a.Category.toUpperCase(); // ignore upper and lowercase
  var nameB = b.Category.toUpperCase(); // ignore upper and lowercase
  if (nameA < nameB) {
    return -1;
  }
  if (nameA > nameB) {
    return 1;
  }
    
    

  // names must be equal
  return 0;
});
    // objectColors = objectColors.sort()
     
            
            
    
    

      
    var chartDiv = d3.select('body')
     .append('div')
     .attr('id', 'FullCountryChart')
     .attr('class', 'chartDiv');
     

     
     


         var chartsRow = d3.select("#countryRow")
                    // .append('div')
                    // .attr('class', 'row')
                    // .attr('id', '#countryRow')


        // var togglingTitle =  chartsRow
        //                     .append('div')
        //                     .attr('class', bootstrapClass)
        //                     .attr('id', "togglingTitle")


                // .attr("class", "tooltip")				
                // .style("opacity", 0);
              
//one overall svg for everything    
        var svgContainer = 
                chartsRow
              .append('div')
              .attr('class',bootstrapClass)
              
              
         var tool = d3.select("body")
             .append('div')
            .attr('class', 'tool')
    //  .attr('class', 'chartDiv');       
      var div = d3.selectAll(".tool")

              
           var svg = svgContainer //   d3.select("#countryContainer")
              .append("svg")
              .attr("width", width )
              .attr("height", height)
              .attr("class", 'barChartSVG')
              .append("g")
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .attr("width", width)
              
              svg.append('rect')
              .attr("width", width)
              .attr("height", width)

//adding mini chart titles
         svg
        .append("text")      // text label for the x axis
        .attr("class", "miniTitles")
        .attr("x", width/4 )
        .attr("y", -10)
        .style("text-anchor", "middle")
        // .html("+" );
        
            svg
        .append("text")      // text label for the x axis
        .attr("class", "miniTitles")
        .attr("x", width/1.3)
        .attr("y", -10)
        .style("text-anchor", "middle")
        // .html("-" );
        
          svg
        .append("text")      // text label for the x axis
        .attr("class", "miniTitles")
        .attr("x", width/2 )
        .attr("y", -24)
        .style("text-anchor", "middle")
        // .html("Neg. Change" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" + "&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp" +"Pos. Change" );
        .html("Most Change" );

        
  
  
  
    var keyContainer = d3.select('#mainTitleRow')
                            .append('div')
                            .attr('class', 'legend')
                            .append('svg')
                            .attr('width', 148)
                            .attr('height', 150)
                            .append('g')
                            .attr('class', 'keycontainer')
                            .style('left', 2000)
                            .style('visibility', 'hidden')
                            
                            
                    var keys = keyContainer.selectAll('rect')
                    .data(objectColors)
                    .enter()
                    .append('rect')
                    .attr("x", 10)
                    .attr("y", function(d,i){return i*17})
                    .attr('width', 148)
                    .attr('height', 15)
                    .attr('class', 'key')
                 .attr('fill', function(d) { return d.color})
                 
              var yforkey = d3.scaleLinear().range([0, 100]);

                     var arr = [40, 70, 100, 130, 160]
                    keyContainer
                    .selectAll('.keyText')
                    .data(objectColors)
                    .enter()
                    .append('text')
                    .attr('class', 'keyText')
                    .style('fill', 'white')
                    .style('opacity', .7)
                    .attr('x',15)
                    .attr('y', function(d,i){return i*17 +12})
                    .html(function(d){return parseClass(d.Category).replace("Income share held by the ","").replace("of the population ","")})
            
    
    
    

var countriesFullObject = [];
        
        
        
        
        
        ///Yey! This javascript method prevents repetition
                var listofuniquecountries = Array.from(new Set(countriesNotRepeated))

                //start adding elements to my single country objects. I want Country, Start year/end year, change.
                
                objectKeys.forEach(function(overallLoop) {
                    
                       
                        listofuniquecountries.forEach(function(d){
                            var singleCountryObject = new Object();
                            singleCountryObject.Country = d;
                            singleCountryObject.Category = overallLoop;
        
                            
                            // {quintile change array:  country, quintile, max year, min year, change;; [years]},{[years]},{[years]}
                            
                                            //gather the years of each country and stick the min and max in object
                                                    var eachCountryYears = []
                            
                                             data.forEach(function(alldata){
                                                if(alldata.Country_Name == d){  
                                                    eachCountryYears.push(alldata.Time)
                                                }
                                             });
                                            singleCountryObject.StartingYear = d3.min(eachCountryYears)
                                            singleCountryObject.MiddleYear = d3.median(eachCountryYears)
                                            singleCountryObject.EndingYear = d3.max(eachCountryYears)
                                            
                                            
                                            
                                            
                                            data.forEach(function(alldata){
                                                var valuesChange = [];
                                                
                                                
                                                if(alldata.Time == singleCountryObject.EndingYear && singleCountryObject.Country == alldata.Country_Name){  
                                                    
                                                    singleCountryObject.EndingYearValue = alldata[overallLoop]
                                                    
                                                    valuesChange.push(alldata[overallLoop])
                                                    
                                                    
                                                    
                                                } else if (alldata.Time == singleCountryObject.StartingYear && singleCountryObject.Country == alldata.Country_Name){  
        
                                                    singleCountryObject.StartingYearValue = alldata[overallLoop]
                                                    valuesChange.push(alldata[overallLoop])
            
                                                }
                                                
                                             });
                                             
                                             
                                             
                                               function posOrNegChange (startyearvalueinput,endyearvalueinput){
                                                if (startyearvalueinput <= endyearvalueinput){
                                                  return 100-startyearvalueinput/endyearvalueinput*100
                                                  } else { return (100-endyearvalueinput/startyearvalueinput*100)*-1
                                                  }
                                                }
                
                                             
                                             
                                             singleCountryObject.Change = posOrNegChange(singleCountryObject.StartingYearValue, singleCountryObject.EndingYearValue);

                                            
                                            //find all the values for all quintiles 
                            
                            //pushes object into array
                            
                            if(singleCountryObject.Change){
                           countriesFullObject.push(singleCountryObject)
                            }
                        });
                        
                        
                })

countriesFullObject.sort(function(obj2, obj1) {
	// Ascending: first age less than the previous
	return Math.abs(obj1.Change) - Math.abs(obj2.Change);
});

             x.domain([-100, 100]);
             y.domain(countriesFullObject.map(function(d) { return d.Category; }));
///This is where I start building my chart with modified data                
//  countriesFullObject.forEach(function(allChangeInnerLoop){
     
         var format = d3.format(".1f");
        
                    
                    
    //     bar.append("rect")
    // .attr("width", x)
    // .attr("height", barHeight - 1);
       var leastChange =
         svg
        .append("text")      // text label for the x axis
        .data(countriesFullObject)
        .attr("class", "miniTitles")
        .attr("id", "leastChange")
        .attr("x", width/2)
        .attr("y", height/9)
        .style("text-anchor", "middle")
        .html("Least Change" );

// bar.append("text")
//     .attr("x", function(d) { return x(d) - 3; })
//     .attr("y", barHeight / 2)
//     .attr("dy", ".35em")
//     .text(function(d) { return d; });
    
    var maxMinChangeForTopLable = []
    
    countriesFullObject.forEach(function(d){
        maxMinChangeForTopLable.push(d.Change)
    });
    

    
    function round5(x)
{
    return Math.ceil(x/5)*5;
}
    
         var maxChange =
         svg
         .data(countriesFullObject)
        .append("text")      // text label for the x axis
        .attr("class", "minTitles")
        .attr("id", "maxChange")
        .attr("x", function(){
                    return x(round5(d3.max(maxMinChangeForTopLable)+5))
                    })
        .attr("y", -20)
        .style("text-anchor", "middle")
        // .style("fill", "#000000")
        .html(function(){ return round5(d3.max(maxMinChangeForTopLable))+ "%"});
        
        
        
        
   var minChange =
         svg
         .data(countriesFullObject)
        .append("text")      // text label for the x axis
        .attr("class", "minTitles")
        .attr("id", "minChange")
        .attr("x", function(){
                    return x(round5(d3.max(maxMinChangeForTopLable)+5)*-1)
                    })
        .attr("y", -20)
        .style("text-anchor", "middle")
        // .style("fill", "#000000")
        .html(function(){ return round5(d3.max(maxMinChangeForTopLable))*-1+ "%"});
        
        
  var minChangeLine =
         svg
         .data(countriesFullObject)
        .append("line")      // text label for the x axis
        .attr("class", "minTitles")
        .attr("id", "minChangeLine")
        .attr("x1", function(){
                    return x(round5(d3.max(maxMinChangeForTopLable)+5)*-1 -2)
                    })
        .attr("x2", function(){
                    return x(round5(d3.max(maxMinChangeForTopLable)+6))
                    })
        .attr("y1", -15)
        .attr("y2", -15)
        .style('stroke', "#a5acb7")
        .style('stroke-width', .5)


        
        var rect = svg.selectAll(".anything")
                .data(countriesFullObject)
                .enter()
                .append("rect")
                .attr("class", function(d){ return d.Country+"singleBar"})
                .attr("id", function(d){return d.Category+d.Country+d.StartingYear})
                                // .attr("id", function(d){return d.Category+d.Country+d.StartingYear})

                .attr("x", function(d){
                    return d.Change < 0 ? x(d.Change) : x(0);
                    })
    //             .transition().duration(300)
    			.attr("width", function(d){
    				return d.Change < 0 ? x(d.Change * -1) - x(0) : x(d.Change) - x(0);
    				})


                .attr("y", function(d, i){
                    return i*(height/1800);
                    })
    			.attr("height", 1)
    			.attr("fill", function(d) {
                        for(var i=0; i<objectColors.length; i++){
            		         if(d.Category === objectColors[i].Category){
            		            return objectColors[i].color ;
            		         }
            			}
    		    	})
    		    
               .on('click', function(d, callback){
                   
                //   console.log(this)
                   
                  var tempCountry = d.Country;
                   
                       svg.selectAll( "rect")
                   
                       .style('opacity', function(d){
                          if (this.className.baseVal != tempCountry+ 'singleBar'){
                           
                              return ".1"
                          } else {
                              return '1'
                          }
                       })
                    //   //Second Click
                    
                                    //   .on('click', function(d){
                                          
                                    //       var tempCountry2 = tempCountry;
                                    //       svg.selectAll( "rect")
                                   
                                    //   .style('opacity', function(d){
                                    //       if (this.className.baseVal === tempCountry2+ 'singleBar'){
                                           
                                    //           return "1"
                                    //       }
                                    //   })
                           
                           
                    //   })
                   

                    //   d3.selectAll( "."+d.Country+'singleBar')
                    //   .style('fill', '#000000')
                   
               })
    		   .on("mouseover", function(d) {
    		       

    		       d3.selectAll(".keycontainer")
    		                .transition()
    		                .duration(300)		

    		                .style('visibility', 'visible')
    		      // d3.select(d.Category+d.Country+d.StartingYear+"text")
    		      //          .style('visibility','visible')
    		       
    		      
    		       
    		       d3.select( "#"+ d.Category+d.Country+d.StartingYear)
    		                    .attr("opacity", ".3")
    		                  //  .attr("stroke-width, '3px")
    		                    
    		                    .attr("font-size", 30)
                    div.attr("x", "0")
                    div.transition()
                        .duration(200)		
                        .style("opacity", .9);		
                    div	.html(function() {
                         var thisText =  "<b>" + d.Country.replace('_', ' ') + " from " + d.StartingYear + " to " + d.EndingYear + ":" + "</b>" + "</br>"+ "<span class = 'classColor'>" + parseClass(d.Category) + "</span>"+ increasedDecreased(d.Change) + "&nbspfrom " + format(d.StartingYearValue) + " to " + format(d.EndingYearValue) + " percent, " + "a change of " + format(d.Change) + " percent."
                        return thisText;	

                      })
                      
                
                      ////LEFT DEAL WITH LATER
                        .style("left", (testMousepositionX(d3.event.pageX)) + "px")		
                        .style("top", (testMouseposition(d3.event.pageY - 28)) + "px");	
                        
                    //this is how I tartgeted the Y attribute of each rect
                        var mouseY = this.y.baseVal.value
                        
                    d3.select ('#' + d.Category+d.Country+d.StartingYear+"text")
                    // .style ('fill', '#000000')
                    .attr("y", function(){
                        return mouseY +7
                    })
                    .attr("x", function(d){
                    if(d.Change<0){
                        return x(d.Change) -60 ;
                    } else { return x(d.Change) +10 }
                    
                    
                    // return d.Change < 0 ? x(d.Change) : x(0);
                    })
                    .attr("dy", ".35em")
                    // .delay(10)
                    .transition()
                    .duration(200)
                     .style('opacity', 1)    
                        //END MOUSEOUT
                    })					
                
                .on("mouseout", function(d, i) {
                    
                 d3.select ('#' + d.Category+d.Country+d.StartingYear+"text")
                                    .transition()
                                    .duration(200)
                                      .style('opacity', 0)    


                d3.select( "#"+ d.Category+d.Country+d.StartingYear)
                
                .attr("opacity", "1")
                    		.attr("fill", function(d) {
                        for(var i=0; i<objectColors.length; i++){
            		         if(d.Category === objectColors[i].Category){
            		            return objectColors[i].color ;
            		         }
            			}
    		    	})

                    div.transition()		
                        .duration(500)		
                        .style("opacity", 0);	
                })
    		    	
    		    	//Test mouse position to avoid overlap
      		    	function testMouseposition(mousepos){
    		    	    if(mousepos<400){
    		    	        return 300
    		    	    } else { return mousepos }
    		    	        
    		    	    };
    		    	
    		    	
    		    	//Test mouse position to avoid overlap
      		    	function testMousepositionX(mousepos){
    		    	    if(mousepos<width/2){
    		    	        return 70
    		    	    } else { return width-width/4 }
    		    	        
    		    	    };
    
    
    	var ticks = svg.selectAll('.innerText')
                    .data(countriesFullObject)
                    .enter()
                    .append('text')	  //  	testMouseposition(d3.event)
                    .attr('class', 'innerText')
                    .attr('id', function(d){ return d.Category+d.Country+d.StartingYear+"text"})
                    .style('opacity', 0)
                    // .style('fill', "#000000")
                    .text(function(d){return format(d.Change) + "%";})   


      d3.selectAll(".classColor")
          .data(countriesFullObject)
          .style("color", function(d) {
                        for(var i=0; i<objectColors.length; i++){
            		         if(d.Category === objectColors[i].Category){
            		            return objectColors[i].color ;
            		         }
            			}
    		    	})
      

     keyContainer.on('click', function(d){
    //   console.log(this)  
       
          svg.selectAll('rect')
                .style('opacity', 1)
         
     })
      svg.on('mouseover', function(d){
          
            svg.selectAll('rect')
            
                    .transition()
                      .duration(500)

                     .attr("y", function(d, i){
                        return i*(height/300);
                        }) 
                            .delay(10)
                        .transition()

                        .duration(300)
                        .attr('height', 15)
            


                        
            // d3.select("#lineSide")
            //         .attr("x1", width/10 )
            //         .attr("y1", height-50)
            //       .attr("x2", width/10 )
            //         .attr("y2", 10)
                    
            d3.select("#leastChange")
                 .attr("y", height/1.5)
                 
           
           
          

})





function increasedDecreased(positiveneg){
     if(positiveneg<0){
         return "decreased"
     } else {return "increased"};
 }



     
     
     

    }
    
    
    
    
    
    

    //LAYER INTERACTIVITY
    d3.csv ("data/wdialldata.csv", type, function(error, data){
        
            // if (error) console.log(error);
        data.forEach(function(d){
        d.Country_Name = d.Country_Name.replace(" ", "_")    
        d.Time = +d.Time
            // console.log(d.Country_Name)
           
        // console.log(d.Time)
    
        });
            
            
        var country1 = []
        var country2 = []
        var country3 = []
         




         //Create object Keys so I can send each numeric key through program
         
         function loopthroghObjectKeys(){
            var keys = Object.keys(data[0])
    
            for(var i=0; i<keys.length; i++){
            if(keys[i]!="Country_Name"&& keys[i]!="Time"&& keys[i]!="Country_Code"){

                    objectKeys.push(keys[i]);
                }
            } 
         }
         
        loopthroghObjectKeys();
        
        function createColorPairs (){ 
        for(var i = 0; i<colorArray.length; i++){
        var colorObject = new Object;
        colorObject.color = colorArray[i];
        colorObject.Category = objectKeys[i];
        objectColors.push(colorObject)
        }
        }
        
        createColorPairs ()
        
 
         // End Create Object Keys
         

         
         var cleaned = [];
         
        data.forEach(function(d){
            
            
            
        // var countriescheckforrepeat = [];
        // var countriesNotRepeated = [];
        
        
        
        

      for( var i = 0; i<objectKeys.length; i++){ 
    
    //I'm only analyzing data with full year values for all quintiles
    //I'm putting all country names in one place
          if (d[objectKeys[i]]*1){
            cleaned.push(d);
            countriesNotRepeated.push(d.Country_Name)
          }
          
          
        //   d.Country_Name[i]
          
          
            }

        countriescheckforrepeat.push(cleaned.Country_Name)
        

     
            });  
            

      
         
         
                
         
         
         
            

        render(cleaned)
        // render(country1)
        // render(country3)
       
       
    
    
    
    /// make a different d3 select all for each item in array of classes
    /// when that thing is selected turn all instances of it black
    
    
    // var selectorOne = d3.selectAll(body)
    //       .on("mouseover", function(d,i){classArrayForInteraction[i].style("fill", "#000000");})
    });
    
    
    // console.log(countriescheckforrepeat)

    
    
    function type(d, i, columns) {
                    //  unParsedData.push(d)

  //This turns the year and stuff into integers
//   d.Time = parseDate(d.Time);
//   for (var i = 2, n = columns.length; i < n; ++i) d[columns[i]] = d[columns[i]]/100;
  return d;
}    
    
    
     






    

/// If I hover over THIS class, return THIS paragraph associated with this class


