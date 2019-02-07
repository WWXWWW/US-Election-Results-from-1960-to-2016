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

function drawVotePercentageChart(){
    drawvotePercentageChart();
}
var votePercentageChart = d3.select("body")  
    .append("svg")
    .attr("width", 900)
    .attr("height", 100);



function drawvotePercentageChart(){
    votePercentageChart.selectAll("*").remove();
   
    d3.csv(currentEle,function(d){
          console.log('testonD');
          console.log(currentEle);
          console.log(d); 
          console.log('enddddd');
        return {
            D_Nominee : d.D_Nominee,
            R_Nominee : d.R_Nominee,
            I_Nominee : d.I_Nominee,
            D_Votes : +d.D_Votes,
            R_Votes : +d.R_Votes,
            I_Votes : +d.I_Votes
        };
    },function(data){
        var i=0;
        var totalV=0;
        var totalD=0;
        var totalR=0;
        var totalI=0;

        for(i=0;i<data.length;i++){

            totalD+=data[i].D_Votes;
            totalR+=data[i].R_Votes;
            totalI+=data[i].I_Votes;
            totalV=totalV+data[i].D_Votes+data[i].R_Votes+data[i].I_Votes;
            
        }

       var percentD = totalD/totalV;
       var percentR = totalR/totalV;
       var percentI = totalI/totalV;

       var I_N = data[0].I_Nominee;
       var R_N = data[0].R_Nominee;
       var D_N = data[0].D_Nominee;

       if(percentI>0){
            votePercentageChart.selectAll()
                .data([0])
                .enter()
                .append("text")
                .attr("x", function(d) { 
                    return 10; 
                })
                .attr("y", function(d) { 
                    return 30; })
                .text( function (d) { 
                    return I_N + ": " +((percentI) * 100).toFixed(1) + '%';
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "14px")
                .attr("fill", "green");

            votePercentageChart.selectAll()
                .data([0])
                .enter()
                .append("rect")
                .attr("x",function(d,i){
                    return 10;
                })
                .attr("y",function(d){
                    return 50;
                })
                .attr("width", function(d,i){
                    return percentI*850;
                 })
                .attr("height", function(d){
                    return 20;
                })
                .attr("fill", function(d,i){
                   return "green";
                })
                .attr("stroke", "pink")
                .attr("stroke-width", "1px")
                .on("mouseover", function(d){
                    tooltip.html(
                                "<ul><li style=\"color:green; font-size:10;\">" +  I_N + ": " + totalI + "(" + (percentI*100).toFixed(1) + "%)</li><br>" +
                                "<li style=\"color:blue; font-size:10;\">" +  D_N + ": " + totalD + "(" + (percentD*100).toFixed(1) + "%)</li><br>" +
      							"<li style=\"color:red; font-size:10;\">" + R_N + ": " + totalR + "(" + (percentR*100).toFixed(1) + "%)</li></ul>"
                    )
                    .style("left",(d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px" )
                    .style("opacity", 0.8);
                })
                .on("mouseout", function() {
                    tooltip.style("opacity", 0);
                });

            votePercentageChart.selectAll()
                .data([0])
                .enter()
                .append("text")
                .attr("x", function(d) { 
                    return 10+percentI*850+percentD*500; 
                })
                .attr("y", function(d) { 
                    return 30; 
                })
                .text( function (d) { 
                    return D_N +": "+((percentD) * 100).toFixed(1) + '%';
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "14px")
                .attr("fill", "#0080FF");
       }
        else{
        votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { return 10+percentI*850; })
            .attr("y", function(d) { return 20; })
            .text( function (d) { return D_N;})
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("fill", "#0080FF");
        
        votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { return 10+percentI*850; })
            .attr("y", function(d) { return 40; })
            .text( function (d) { return ((percentD) * 100).toFixed(1) + '%';})
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "#0080FF");
       }
       
       
       
       
       votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return 10+percentI*850;
            })
            .attr("y",function(d){
                return 50;
            })
            .attr("width", function(d,i){
                return percentD*850;
             })
            .attr("height", function(d){
                return 20;
            })
            .attr("fill", function(d,i){
               return "#0080FF";
            })
            .attr("stroke", "pink")
            .attr("stroke-width", "1px")
            .on("mouseover", function(d){
                if(totalI>0){
                    tooltip.html(
                            "<ul><li style=\"color:green; font-size:10;\">" +  I_N + ": " + totalI + "(" + (percentI*100).toFixed(1) + "%)</li><br>" +
                            "<li style=\"color:blue; font-size:10;\">" +  D_N + ": " + totalD + "(" + (percentD*100).toFixed(1) + "%)</li><br>" +
  							"<li style=\"color:red; font-size:10;\">" + R_N + ": " + totalR + "(" + (percentR*100).toFixed(1) + "%)</li></ul>"
                    )
                    .style("left",(d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px" )
                    .style("opacity", 0.8);
                }
                else{
                    tooltip.html(
                            "<li style=\"color:blue; font-size:10;\">" +  D_N + ": " + totalD + "(" + (percentD*100).toFixed(1) + "%)</li><br>" +
  							"<li style=\"color:red; font-size:10;\">" + R_N + ": " + totalR + "(" + (percentR*100).toFixed(1) + "%)</li></ul>"
                    )
                    .style("left",(d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px" )
                    .style("opacity", 0.8);
                }
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });
    
    
    votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { return 10+percentI*850+percentD*850+percentR*850-100; })
            .attr("y", function(d) { return 20; })
            .text( function (d) { return R_N})
            .attr("font-family", "sans-serif")
            .attr("font-size", "14px")
            .attr("fill", "red");        
    votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { return 10+percentI*850+percentD*850+percentR*850-55; })
            .attr("y", function(d) { return 40; })
            .text( function (d) { return ((percentR) * 100).toFixed(1) + '%';})
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "red");     

        votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                return percentI*850+percentD*850 + 10;
            })
            .attr("y",function(d){
                return 50;
            })
            .attr("width", function(d,i){
                return percentR*850;
             })
            .attr("height", function(d){
                return 20;
            })
            .attr("fill", function(d,i){
               return "#FF0000";
            })
            .attr("stroke", "pink")
            .attr("stroke-width", "1px")
            .on("mouseover", function(d){
                if(totalI>0){
                    tooltip.html(
                            "<ul><li style=\"color:green; font-size:10;\">" +  I_N + ": " + totalI + "(" + (percentI*100).toFixed(1) + "%)</li><br>" +
                            "<li style=\"color:blue; font-size:10;\">" +  D_N + ": " + totalD + "(" + (percentD*100).toFixed(1) + "%)</li><br>" +
  							"<li style=\"color:red; font-size:10;\">" + R_N + ": " + totalR + "(" + (percentR*100).toFixed(1) + "%)</li></ul>"
                    )
                    .style("left",(d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px" )
                    .style("opacity", 0.8);
                }
                else{
                    tooltip.html(
                            "<li style=\"color:blue; font-size:10;\">" +  D_N + ": " + totalD + "(" + (percentD*100).toFixed(1) + "%)</li><br>" +
  							"<li style=\"color:red; font-size:10;\">" + R_N + ": " + totalR + "(" + (percentR*100).toFixed(1) + "%)</li></ul>"
                    )
                    .style("left",(d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px" )
                    .style("opacity", 0.8);
                }
            })
            .on("mouseout", function() {
                tooltip.style("opacity", 0);
            });
    votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("rect")
            .attr("x", function(d) { return 425; })
            .attr("y", function(d) { return 48; })
            .attr("width", function(d,i){
                return 2;
             })
            .attr("height", function(d){
                return 25;
            })
            .attr("fill", function(d,i){
               return "black";
            })
            
    votePercentageChart.selectAll()
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { return 470; })
            .attr("y", function(d) { return 45; })
            .text( function (d) { return "Popular Vote (50%)";})
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");
       
    });
}