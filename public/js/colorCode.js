 var colorCode = d3.select("body")
    .append("svg")
    .attr("left",100)
    .attr("width", 850)
    .attr("height", 60);

var value = [" -60.0 to -50.0", " -50.0 to -40.0", " -40.0 to -30.0", " -30.0 to -20.0", " -20.0 to -10.0", " -10.0 to 0.0", " 0.0 to 10.0", " 10.0 to 20.0", " 20.0 to 30.0", " 30.0 to 40.0", " 40.0 to 50.0", " 50.0 to 60.0" ];

function drawColorCode(){
        colorCode.selectAll("*").remove();

        colorCode.selectAll("rect")
            .data(colorScale.range())
            .enter()
            .append("rect")
            .attr("x", function(d, i){
                    return i*70;
            })
            .attr("y", 10)
            .attr("width", 900)
            .attr("height", 7)
            .attr("stroke", "white")
            .attr("stroke-width", "1px")
            .attr("fill", function(d) {
                     return d;
            });   
            
        colorCode.selectAll("text")
            .data(value)
            .enter()
            .append("text")
            .text(function(d){
                return d;
            })                    
            .attr("x", function(d, i) {
                return i * 70 + 5;
            })
            .attr("y", 30)
            .attr("font-family", "sans-serif")
            .attr("font-size", "10px")
            .attr("fill", "black");        
}
