 var eleResults = ["election-results-1940.csv", "election-results-1944.csv",
                        "election-results-1948.csv", "election-results-1952.csv",
                        "election-results-1956.csv", "election-results-1944.csv", 
                        "election-results-1964.csv", "election-results-1968.csv", 
                        "election-results-1972.csv", "election-results-1976.csv", 
                        "election-results-1980.csv", "election-results-1984.csv", 
                        "election-results-1988.csv", "election-results-1992.csv", 
                        "election-results-1996.csv", "election-results-2000.csv", 
                        "election-results-2004.csv", "election-results-2008.csv", 
                        "election-results-2012.csv", "election-results-2016.csv" ];

var currentEle = eleResults[19];

var yearChart = d3.select("body")
                            .append("svg")
                            .attr("padding", 50)
                            .attr("width", 1100)
                            .attr("height", 50)
                            .attr("class", "timeline");
                            
var previous = eleResults[19];  

 function drawYearChart(data){
                

    var circle = d3.scaleLinear()
        .domain([0, 19])
        .range([20, 980]);   
    var line =  d3.scaleLinear()
                .domain([0, 19])
                .range([20, 980]);
    yearChart.selectAll("*").remove();
    yearChart.append("svg")
                .attr("padding", 50)
                .attr("width", 1100)
                .attr("height", 50)
                .attr("class", "timeline");
    

    yearChart
    .append("line")
    .attr("x1",0)
    .attr("x2", 980)
    .attr("y1", 20)
    .attr("y2", 20)
    .style("stroke-dasharray", ("2, 2"))
    .style("stroke", "gray")
    .style("stroke-width", 1);   

   

    yearChart.selectAll('circle')
        .data(data)
        .enter()
        .append('circle')
        .attr('r', 10)
        .attr('cx', function(d,i) {
            return circle(+i);
        })
        .attr("cy", 20)
        .style('fill', function(d) {
            if(d.PARTY=="D"){
              return "#87CEFA";
            }
            else{
              return "#F08080";
            }
        })
        .style("stroke", function(d,i){
            if(currentEle == eleResults[i]){
                // console.log(eleResults[i]);
              return "black";
            }
            else{
              return 0;
            }
        })
        .on("click", function(d,i) {
                previous = currentEle;
                currentEle = eleResults[i];
                brushListHighlight = [];  

                // console.log("brushListHighlight");
                // console.log(brushListHighlight); 
                
                drawEleVoteChart();
                drawVotePercentageChart();
                d3.csv("yearwise-winner.csv",function(data) {                
                    drawYearChart(data);
                });
                d3.csv(currentEle, function(data) {                         
                    drawTileChart(data);
                })                    
    });
     
   yearChart.selectAll('text')
            .data(data)
            .enter()
            .append("text")
            .text(function(d){
                return d.YEAR;
            })
            .attr("x", function(d,i) {
                return line(+i);
            })
            .attr("y", function() {
                return 45;
            })
            .attr("text-anchor","middle")
            .attr("font-size", "9px")
            .attr("fill", "black");
}

 d3.csv("yearwise-winner.csv",function(data) {                
     drawYearChart(data);
 });
