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

var tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0.5);

var width = 700;
var height = 500;
var rectWidth = 50;
var rectHeight = 40;

var tileChart = d3.select("body")
    .append("svg")
    .attr("width", 1000)
    .attr("height", 500)
    .attr("padding", 50);  

var domain = [-60,-50,-40,-30,-20,-10,0,10,20,30,40,50,60 ];


//Color range for global color scale
var range = ["#0066CC", "#0080FF", "#3399FF", "#66B2FF", "#99ccff", "#CCE5FF", "#ffcccc", "#ff9999", "#ff6666", "#ff3333", "#FF0000", "#CC0000"];
    
//Global colorScale to be used consistently by all the charts
var colorScale = d3.scaleQuantile().domain(domain).range(range); 

           


var states = [ ["AK", 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "ME"],
               [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, "VT", "NH"],
               [0, "WA", "ID", "MT", "ND", "MN", "IL", "WI", "MI", "NY", "RI", "MA"],
               [0, "OR", "NV", "WY", "SD", "IA", "IN", "OH", "PA", "NJ", "CT", 0],
               [0, "CA", "UT", "CO", "NE", "MO", "KY", "WV", "VA", "MD", "DC", 0],
               [0, 0, "AZ", "NM", "KS", "AR", "TN", "NC", "SC", "DE", 0, 0],
               [0, 0, 0, 0, "OK", "LA", "MS", "AL", "GA", 0, 0, 0],
               [0, "HI", 0, 0,"TX", 0, 0, 0, 0, "FL", 0, 0] ]; 

function getIdx(array, value) {
    for (var i = 0; i <= array.length - 1; i++) {
        var x = array[i].indexOf(value);
        if (x > -1) {
            return [i, x];
        }
    }
} 

function drawTileChart(data) {
    console.log("new");
    tileChart.selectAll("*").remove();
    tileChart.selectAll("rect")
        .data(data)
        .enter()
        .append("rect")
        .attr( "x", function(d) {
            return getIdx(states, d.Abbreviation)[1] * 52;

        })
        .attr( "y", function(d) { 
            return getIdx(states, d.Abbreviation)[0] * 42 + 10 ;
        })
        .attr("width", rectWidth)
        .attr("height", rectHeight)
        .attr("fill", function(d){
                
            if((parseFloat(d.I_Percentage)>parseFloat(d.D_Percentage))&&(parseFloat(d.I_Percentage) > parseFloat(d.R_Percentage))){
                return "green";
            }
            else if(parseFloat(d.D_Percentage) > parseFloat(d.R_Percentage)){
                //return colorScale(parseFloat(d.D_Percentage)); 
               // console.log("d.D_Percentage: " + parseFloat(d.D_Percentage));
               // console.log("d.R_Percentage: " + parseFloat(d.R_Percentage));
               var differenceD = parseFloat(d.R_Percentage)-parseFloat(d.D_Percentage);
               //console.log(-differenceD);
               return colorScale(differenceD);

            }
            else {
                //return colorScale(-parseFloat(d.R_Percentage));  
                var differenceR = parseFloat(d.R_Percentage)-parseFloat(d.D_Percentage);
                //console.log("dR" + differenceR);
                return colorScale(differenceR);
            }
            
        })

        .on("mouseover", function(d){
            if((parseFloat(d.I_Percentage)>parseFloat(d.D_Percentage))&&(parseFloat(d.I_Percentage) > parseFloat(d.R_Percentage))){
                tooltip.html(
                    "<p3 style=\"color:green;font-size:14;font-weight: bold;\">" + d.State + "</p3>" +
                    "<p4 style=\"font-size:14; \"> Electoral Votes: " + parseFloat(d.Total_EV) + "</p4>" +
                    "<ul><li style=\"color:blue; font-size:10;\">" + d.D_Nominee + ": " + parseFloat(d.D_Votes) + " votes "+ "(" + parseFloat(d.D_Percentage) + "%)</li><br>" +
                    "<li style=\"color:red; font-size:10;\">" + d.R_Nominee + ": " + parseFloat(d.R_Votes) + " votes "+ "(" + parseFloat(d.R_Percentage) + "%)</li><br>"+
                    "<li style=\"color:green; font-size:10;\">" + d.I_Nominee + ": " + parseFloat(d.I_Votes) + " votes "+ "(" + parseFloat(d.I_Percentage) + "%)</li></ul>"
                )   
                .style("left", (d3.event.pageX) + "px")
                .style("top", (d3.event.pageY) + "px")
                .style("opacity", 1);
            }
            else if (parseFloat(d.D_Percentage) < parseFloat(d.R_Percentage)) {
            var INominee = "N/A";
                var Ivotes = 0;
                var IPercentage = 0;

                if(parseFloat(d.I_Percentage) > 0){
                    INominee = d.I_Nominee;
                    Ivotes = parseFloat(d.I_Votes);
                    IPercentage = parseFloat(d.I_Percentage);
                } 
            tooltip.html(
                "<p3 style=\"color:red;font-size:14;font-weight: bold;\">" + d.State + "</p3>" +
                "<p4 style=\"font-size:14;\"> Electoral Votes: " + parseFloat(d.Total_EV) + "</p4>" +
                "<ul><li style=\"color:blue; font-size:10;\">" + d.D_Nominee + ": " + parseFloat(d.D_Votes) + " votes "+ "(" + parseFloat(d.D_Percentage) + "%)</li><br>" +
                "<li style=\"color:red; font-size:10;\">" + d.R_Nominee + ": " + parseFloat(d.R_Votes) + " votes "+ "(" + parseFloat(d.R_Percentage) + "%)</li><br>" +
                "<li style=\"color:green; font-size:10;\">" + INominee  + ": " + Ivotes + " votes " + "(" + IPercentage + "%)</li></ul>"
            )   
            
            .style("left", (d3.event.pageX) + "px")
            
            } else {
                var INominee = "N/A";
                var Ivotes = 0;
                var IPercentage = 0;

                if(parseFloat(d.I_Percentage) > 0){
                    INominee = d.I_Nominee;
                    Ivotes = parseFloat(d.I_Votes);
                    IPercentage = parseFloat(d.I_Percentage);
                } 
            tooltip.html(
                "<p3 style=\"color:red;font-size:14;font-weight: bold;\">" + d.State + "</p3>" +
                "<p4 style=\"font-size:14;\"> Electoral Votes: " + parseFloat(d.Total_EV) + "</p4>" +
                "<ul><li style=\"color:blue; font-size:10;\">" + d.D_Nominee + ": " + parseFloat(d.D_Votes) + " votes "+ "(" + parseFloat(d.D_Percentage) + "%)</li><br>" +
                "<li style=\"color:red; font-size:10;\">" + d.R_Nominee + ": " + parseFloat(d.R_Votes) + " votes "+ "(" + parseFloat(d.R_Percentage) + "%)</li><br>" +
                "<li style=\"color:green; font-size:10;\">" + INominee  + ": " + Ivotes + " votes " + "(" + IPercentage + "%)</li></ul>"
            )   
            
            .style("left", (d3.event.pageX) + "px")
           
            }
        })                    
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        });
      
   

    tileChart.selectAll("text")
        .data(data)
        .enter()
        .append("text")
        .text(function(d){
            return (d.Abbreviation);
        })
        .attr("text-anchor","middle")
        .attr("x", function(d) {
            return getIdx(states, d.Abbreviation)[1] * 52 + rectWidth / 2;
        })
        .attr("y", function(d) {
            return getIdx(states, d.Abbreviation)[0] * 42 +  + 10 + (rectHeight / 2);
        })
        .attr("font-family", "sans-serif")
        .attr("font-size", "10px")
        .attr("fill", "black")

        .attr("fill",function(d){
            //console.log(d.State);
            if(brushListHighlight.includes(d.State)){
                console.log("brushListHighlight");
                return "yellow";
            }
            
        })
        
        .style("font-weight",function(d){
           
            if(brushListHighlight.includes(d.State)){
                
                return "bold";
            }
            
        })
        .on("mouseover", function(d){
            if((parseFloat(d.I_Percentage)>parseFloat(d.D_Percentage))&&(parseFloat(d.I_Percentage) > parseFloat(d.R_Percentage))){
                    tooltip.html(
                        "<p3 style=\"color:green;font-size:14;font-weight: bold;\">" + d.State + "</p3>" +
                        "<p4 style=\"font-size:14;\"> Electoral Votes: " + parseFloat(d.Total_EV) + "</p4>" +
                        "<ul><li style=\"color:blue; font-size:10;\">" + d.D_Nominee + ": " + parseFloat(d.D_Votes) + " votes "+ "(" + parseFloat(d.D_Percentage) + "%)</li><br>" +
                        "<li style=\"color:red; font-size:10;\">" + d.R_Nominee + ": " + parseFloat(d.R_Votes) + " votes "+ "(" + parseFloat(d.R_Percentage) + "%)</li><br>"+
                        "<li style=\"color:green; font-size:10;\">" + d.I_Nominee + ": " + parseFloat(d.I_Votes) + " votes "+ "(" + parseFloat(d.I_Percentage) + "%)</li></ul>"
                    )   
                    .style("left", (d3.event.pageX) + "px")
                    .style("top", (d3.event.pageY) + "px")
                    .style("opacity", 1);
                }
            else if (parseFloat(d.D_Percentage) < parseFloat(d.R_Percentage)) {
                var INominee = "N/A";
                var Ivotes = 0;
                var IPercentage = 0;

                if(parseFloat(d.I_Percentage) > 0){
                    INominee = d.I_Nominee;
                    Ivotes = parseFloat(d.I_Votes);
                    IPercentage = parseFloat(d.I_Percentage);
                } 
            tooltip.html(
                "<p3 style=\"color:red;font-size:14;font-weight: bold;\">" + d.State + "</p3>" +
                "<p4 style=\"font-size:14;\"> Electoral Votes: " + parseFloat(d.Total_EV) + "</p4>" +
                "<ul><li style=\"color:blue; font-size:10;\">" + d.D_Nominee + ": " + parseFloat(d.D_Votes) + " votes "+ "(" + parseFloat(d.D_Percentage) + "%)</li><br>" +
                "<li style=\"color:red; font-size:10;\">" + d.R_Nominee + ": " + parseFloat(d.R_Votes) + " votes "+ "(" + parseFloat(d.R_Percentage) + "%)</li><br>" +
                "<li style=\"color:green; font-size:10;\">" + INominee  + ": " + Ivotes + " votes " + "(" + IPercentage + "%)</li></ul>"
            )   
            
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .style("opacity", 0.8);
            } else {
                var INominee = "N/A";
                var Ivotes = 0;
                var IPercentage = 0;

                if(parseFloat(d.I_Percentage) > 0){
                    INominee = d.I_Nominee;
                    Ivotes = parseFloat(d.I_Votes);
                    IPercentage = parseFloat(d.I_Percentage);
                } 
            tooltip.html(
                "<p3 style=\"color:blue;font-size:14;font-weight: bold;\">" + d.State + "</p3>" +
                "<p4 style=\"font-size:14;\"> Electoral Votes: " + parseFloat(d.Total_EV) + "</p4>" +
                "<ul><li style=\"color:blue; font-size:10;\">" + d.D_Nominee + ": " + parseFloat(d.D_Votes) + " votes "+ "(" + parseFloat(d.D_Percentage) + "%)</li><br>" +
                "<li style=\"color:red; font-size:10;\">" + d.R_Nominee + ": " + parseFloat(d.R_Votes) + " votes "+ "(" + parseFloat(d.R_Percentage) + "%)</li><br>" +
                "<li style=\"color:green; font-size:10;\">" + INominee  + ": " + Ivotes + " votes " + "(" + IPercentage + "%)</li></ul>"
            )   
            
            .style("left", (d3.event.pageX) + "px")
            .style("top", (d3.event.pageY - 28) + "px")
            .style("opacity", 0.8);
            }
        })
        .append("tspan").text(function(d){ 
            return parseFloat(d.Total_EV);
        })
        .attr("x", function(d) {
            return getIdx(states, d.Abbreviation)[1] * 52 + rectWidth / 2;
        })
        .attr("y", function(d) {
            return getIdx(states, d.Abbreviation)[0] * 42 + 25 + rectHeight / 2;
        })
        .on("mouseout", function() {
            tooltip.style("opacity", 0);
        })
        ;
}

drawEleVoteChart();
drawVotePercentageChart();

d3.csv(eleResults[19], function(data) {                
    drawTileChart(data);
    drawColorCode();
});


