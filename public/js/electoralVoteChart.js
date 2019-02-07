
var eleVoteChart = d3.select("body")
    .append("svg")
    .attr("x",20)
    .attr("y",50)
    .attr("padding", 60)
    .attr("width", 900)
    .attr("height", 60);

                
var currentEle = eleResults[19];
var totalValue = 0;
var I = [];
var D = [];
var R = [];

function drawEleVoteChart(){
    eleVoteChart.selectAll("*").remove();
    eleVoteChart.append("svg")
        .attr("x",20)
        .attr("y",10)
        .attr("padding", 60)
        .attr("width", 900)
        .attr("height", 50);
    
    var brush = d3.brushX()
                .extent([[10, 20], [860, 45]])
                .on("start brush", brush)
                .on("end", brushend);
    I=[];
    D=[];
    R=[];


    d3.csv(currentEle,function(d){
        return {
            State : d.State,
            Abbreviation :  d.Abbreviation,
            Total_EV : + d.Total_EV,
            D_Percentage : + d.D_Percentage,
            R_Percentage : + d.R_Percentage,
            I_Percentage : + d.I_Percentage
        };
    },function(data){
        
        
        totalValue=0;
        var sumI = 0;
        var sumD = 0;
        var sumR = 0;

        //find sum of R D I and the total value
        // loop through the data array and add up values

        for (var i = 0; i < data.length; i++) {
           
            if((data[i].I_Percentage>data[i].D_Percentage) && (data[i].I_Percentage>data[i].R_Percentage)){

                sumI += data[i].Total_EV;
                I[I.length] = data[i];

            }else if ((data[i].R_Percentage>data[i].D_Percentage) && (data[i].R_Percentage>data[i].I_Percentage)){
                
                sumR+=data[i].Total_EV;
                R[R.length]=data[i]; 

            } else if((data[i].D_Percentage>data[i].I_Percentage) && (data[i].D_Percentage>data[i].R_Percentage)){
        
                sumD+=data[i].Total_EV;
                D[D.length]=data[i];

            } else{
                
                D[D.length]=data[i];
                sumD+=data[i].Total_EV; 
            }

             totalValue+=data[i].Total_EV;
        }
      
        //sort the R_Percentage and D_Percentage

        R.sort(function(a, b){
            return (a.R_Percentage - a.D_Percentage)-(b.R_Percentage - b.D_Percentage)}
            );
        D.sort(function(a, b){
            return (a.R_Percentage - a.D_Percentage)-(b.R_Percentage - b.D_Percentage)}
            );
      
        
        var n = 0;
        var x = 10;

        // drawI 
        if(I.length>0){
               
        eleVoteChart.selectAll("text")
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { 
                return x; 
            })
            .attr("y", function(d) { 
                return 20; 
            })
            .text( function (d) { return sumI;})
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "green");

        eleVoteChart.selectAll()
            .data(I)
            .enter()
            .append("rect")
            .attr("x",function(d,i){
                if(i==0)
                    return 10;
                else{
                    x+=I[i-1].Total_EV/totalValue*1000;
                    return x;
                }
            })
            .attr("y",function(d){
                return 25;
            })
            .attr("width", function(d,i){
                return I[i].Total_EV/totalValue*1000;
             })
            .attr("height", function(d){
                return 20;
            })
            .attr("fill", function(d,i){
               return "green";
            })
            .attr("stroke", "white")
            .attr("stroke-width", "1px");
           
        
            x+=I[I.length-1].Total_EV/totalValue*1000;
        }


        // draw D
        eleVoteChart.selectAll()
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { 
                return x; 
            })
            .attr("y", function(d) { 
                return 20; 
            })
            .text( function (d) { 
                return sumD;
            })
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "blue");

        eleVoteChart.selectAll()
            .data(D)
            .enter()
            .append("rect")
            .attr("x",function(d,i){                
                if(i==0)
                    return x;
                else{ 
                    x+=D[i-1].Total_EV/totalValue*850;
                    return x;
                }
                   
            })
            .attr("y",function(d){
                return 25;
            })
            .attr("width", function(d,i){
                return D[i].Total_EV/totalValue*850;
             })
            .attr("height", function(d){
                return 20;
            })
            .attr("fill", function(d,i){
               var differD = d.R_Percentage - d.D_Percentage;
               return colorScale(differD);
            })
            .attr("stroke", "white")
            .attr("stroke-width", "1px");

        //draw R
        x+=D[D.length-1].Total_EV/totalValue*850;

        eleVoteChart.selectAll()
            .data(R)
            .enter()
            .append("rect")
            .attr("x",function(d,i){ 
                if(i != 0) x+=R[i-1].Total_EV/totalValue*850;
                return x;
            })
            .attr("y",function(d){
                return 25;
            })
            .attr("width", function(d,i){
                return R[i].Total_EV/totalValue*850;
             })
            .attr("height", function(d){
                return 20;
            })
            .attr("fill", function(d,i){
                var differR = d.R_Percentage - d.D_Percentage;
               return colorScale(differR);
            })
            .attr("stroke", "white")
            .attr("stroke-width", "1px");
        

        eleVoteChart.selectAll()
            .data([0])
            .enter()
            .append("text")
            .attr("x", function(d) { 
                return x-20; })
            .attr("y", function(d) { 
                return 20; })
            .text( function (d) { 
                return sumR;})
            .attr("font-family", "sans-serif")
            .attr("font-size", "15px")
            .attr("fill", "red");
                

            eleVoteChart.selectAll()
                .data([0])
                .enter()
                .append("rect")
                .attr("x", function(d) { 
                    return 450; })
                .attr("y", function(d) { 
                    return 23; 
                })
                .attr("width", function(d,i){
                    return 2;
                 })
                .attr("height", function(d){
                    return 27;
                })
                .attr("fill", function(d,i){
                   return "black";
                })
            

             eleVoteChart.selectAll()
                .data([0])
                .enter()
                .append("text")
                .attr("x", function(d) { 
                    return 450;
                 })
                .attr("y", function(d) { 
                    return 20;
                 })
                .text( function (d) { 
                    return "Electroal Vote (270 needed to win)";
                })
                .attr("font-family", "sans-serif")
                .attr("font-size", "10px")
                .attr("fill", "black");

            eleVoteChart.selectAll()
                .data(data)
                .enter()
                .append("g")
                .attr("class", "brush")
                .call(brush);
    });
    
    
            
}

//part of brush and brushend function found online 

function brush() {
  var select = d3.event.selection,
      x0 = s[0],
      x1 = s[1],
      dx = s[1][0] - x0;
}

var brushListHighlight = [];

function brushend() {
  
    var x = 10;
    var brushList = [];
    var s = d3.event.selection;
    if(I.length>0){
        
        for( var i=0;i<I.length;i++){
            if(((x>=s[0])&&(x<=s[1])
                ||((x+I[i].Total_EV/totalValue*850)
                    >=s[0])&&(x+I[i].Total_EV/totalValue*850)
                <=s[1])||((x<=s[0])&&((x+I[i].Total_EV/totalValue*850)>=s[1]))){
                
                brushList[brushList.length] = I[i].State;
            }
            x += I[i].Total_EV/totalValue*850;
        }  
       
    }
   
    for(var i=0;i < D.length; i++){
        if(((x>=s[0]) && (x<=s[1])||((x+D[i].Total_EV/totalValue*850)
            >=s[0])&&(x+D[i].Total_EV/totalValue*850)<=s[1])||
            ((x<=s[0])&&((x+D[i].Total_EV/totalValue*850)>=s[1]))){

            brushList[brushList.length] = D[i].State;
        }
        x += D[i].Total_EV/totalValue*850;
    }

    for(var i=0;i < R.length;i++){
        if(((x>=s[0])&&(x<=s[1])||((x+R[i].Total_EV/totalValue*850)>=s[0])
            &&(x+R[i].Total_EV/totalValue*850)<=s[1])
            ||((x<=s[0])&&((x+R[i].Total_EV/totalValue*850)>=s[1]))){

            brushList[brushList.length] = R[i].State;
        }
        x += R[i].Total_EV/totalValue*850;
    } 
    
    document.querySelector('span').innerHTML = "";
    for(var i = 0;i < brushList.length; i++){
        document.querySelector('span').innerHTML = document.querySelector('span').innerHTML + '<li>' + brushList[i] + '<br />'; 
    }
    brushListHighlight = [];
    brushListHighlight = brushList; 
     
    d3.csv(currentEle, function(data) { 
                                                      
        drawTileChart(data);
    });
  }










