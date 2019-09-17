//StateDashboard
app.controller("LabTrackerIOController", function($scope, $http, $rootScope,Excel,$timeout) {
    $scope.temp=0;
    $scope.exportToExcel=function(tableId){ // ex: '#my-table'
    		$scope.exportHref=Excel.tableToExcel(tableId,'sheet name');
    		$timeout(function(){location.href=$scope.exportHref;},100); // trigger download
    }
   

    $scope.yearCount = function() {
        var input = [];
        for (i = sessionStorage.ReportingYear; i > 2014; i--) {
            input.push("April "+(i-1)+"- April "+i);
        }
        return input;
    }

    $scope.changeyear = function(financial_year) {

	     var obj;
    	$rootScope.urlName = 'http://localhost:8080/';
        $rootScope.projectName = 'labtracker';
    	$scope.title = "State: "+ sessionStorage.stateName;
    	 $scope.disabledemo = "true";
    	$http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/labtracker/labtrackerapplication/stateDashboardData?" + "financial_year=" + financial_year,
            method: "GET",
            dataType: "json",
        }).then(function(response) {
        	console.log(response.status);
            if (response != null && response.status != 204) {
                obj = angular.fromJson(response.data);
                $scope.records = obj;
			          if( $scope.temp==1)
			   		  {
			   		     $scope.barchart_func();
			   		  }
	                  else if($scope.temp==2)
	                  {
	                      
	                	  $scope.linechart_func();
	                  }


            }
        }, function errorCallback(response) {
        	
        	console.log("In error block_labtracker"+response.status);
        });
    		  
    

    }    
//    angular.element(document).ready(function() {
//        var financial_year1="April "+(sessionStorage.ReportingYear-1)+"- April "+sessionStorage.ReportingYear;
//        $scope.financial_year =financial_year1;
//        $scope.changeyear(financial_year1);
//    });
    $scope.barchart_func=function() 
    {     
    	 var obj;
    	 var financial_year=7;
     	$rootScope.urlName = 'http://localhost:8080/';
         $rootScope.projectName = 'labtracker';
     	$scope.title = "State: "+ sessionStorage.stateName;
     	 $scope.disabledemo = "true";
     	$http({
             url: $rootScope.urlName + $rootScope.projectName + "/api/labtracker/labtrackerapplication/labtrackerio?" + "financial_year=" + financial_year,
             method: "GET",
             dataType: "json",
         }).then(function(response) {
         	console.log(response.status);
             if (response != null && response.status != 204) {
             	console.log("In SUCCESS block_labtracker"+response.status);

                 obj = angular.fromJson(response.data);
                 $scope.records = obj;
                 var dhc_names = [];
                 var total_spent=[];
                 var total_data=[];
                var obj1 = $scope.records;
             console.log(obj1[0].date);
             for(i = 0; i < obj1.length; i++){
             	dhc_names.push(obj1[i].date);
             //total_data.push([obj[i].dhc_name,obj[i].total_amt_spent,(obj[i].quarter_amount1+obj[i].quarter_amount2+obj[i].quarter_amount3+obj[i].quarter_amount4),obj[i].statebudgetmaster.total_amount_budgeted]);
             	total_data.push([obj1[i].date,obj1[i].input_count,obj1[i].output_count,obj1[i].pending_count]);
             }
             //console.log(obj[0].total_amt_spent);
//             for(i = 0; i < obj.length; i++){
//             total_spent.push(obj[i].total_amt_spent);
//             }
             total_data.forEach(function(d) {
                 d.values = [d[3],d[2],d[1]];
             });
          
            
             d3.selectAll("svg > *").remove();
             var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
             var svg = d3.select("#svg_cp");
             var padding = {top:20,right:30,bottom:30, left:70};
             
            
             var color = [ "#0000ff", "#00FF00","#ff0000", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
             var index_amount=["pending_count","output_count","input_count"];
             var chartarea={
             "width" : parseInt(svg.style("width"))-padding.left-padding.right,
             "height" : parseInt(svg.style("height"))-padding.top-padding.bottom,
             };
            
          
                 var yScale = d3.scaleLinear()
                 .domain([0,d3.max(total_data, function(c) {
             	  return  Math.max(c[1], c[2],c[3]);

  })])

                 .range([chartarea.height,0]).nice();
                
          
                 var xScale = d3.scaleBand()
                 .domain(total_data.map(function(d){return d[0]}))
                 .range([0, chartarea.width])
                 .padding(0.4);
                 
                 var xScale1 = d3.scaleBand()
                 .domain([0,1,2])
                 .range([0, xScale.bandwidth()])
                 .padding(0);
                
          
                 var xAxisFn=d3.axisBottom(xScale);
                 var xAxis=svg.append("g")
                 .classed("xAxis",true)
                 .attr(
                 'transform','translate('+padding.left+','+(chartarea.height+padding.top)+')'
                 )
                 .call(d3.axisBottom(xScale));     
          
                
          
                 var yAxisFn=d3.axisLeft(yScale);
                 var yAxis=svg.append("g")
                 .classed("yAxis",true)
                 .attr(
                
           'transform','translate('+padding.left+','+padding.top+')'
                 );
                 yAxisFn(yAxis);
                
                 var rectGrp = svg.selectAll(".rectGrp")
                 .data(total_data)
                 .enter().append("g")
                 .attr("class", "rect")
                 .attr("transform", function(d) { return "translate(" +( xScale(d[0])+padding.left) + "," +padding.top + ")"; });
                 
                 rectGrp.selectAll("rect")
                 .data(function(d) { return d.values })
                 .enter()
                 .append("rect")
                 .attr("width",xScale1.bandwidth())
                 .attr("height",function(d){
                 return chartarea.height-yScale(d);
                 })
                 .attr("x",function(d,i){
                 return xScale1(i);
                 })
                 .attr("y",function(d){
                 return yScale(d);
                 })
                 .style("fill", function(d,i) { return color[i]; })
                  .on("mousemove", function(d,i){
                     divTooltip.style("left", d3.event.pageX+50+"px");
                     divTooltip.style("top", d3.event.pageY-25+"px");
                     divTooltip.style("display", "inline-block");
                     divTooltip.html(index_amount[i]+":"+d);
                 })
                 .on("mouseout", function(d){
                     divTooltip.style("display", "none");
                 });

                 var legend = svg.selectAll(".legend")
                 .data(index_amount.slice())
                 .enter().append("g")
                 .attr("class", "legend")
                 .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

             legend.append("rect")
                 .attr("x", chartarea.width - 18)
                 .attr("width", 18)
                 .attr("height", 18)
                 .style("fill", function(d,i) { return color[i]; })

             legend.append("text")
                 .attr("x", chartarea.width - 24)
                 .attr("y", 9)
                 .attr("dy", ".35em")
                 .style("text-anchor", "end")
                 .text(function(d) { return d; });
//                 rectGrp.append("text")
//                 .attr("y", function(d) { return chartarea.height; })
//                 .attr("x", xScale.bandwidth()/ 2)
//                 .text(function(d) { return d; });
//              


             }
         }, function errorCallback(response) {
         	
         	console.log("In error block_labtracker"+response.status);
         });
     	
          		  

         $scope.temp=1
//    	tabcontent = document.getElementsByClassName("tablecontent");
//        for (i = 0; i < tabcontent.length; i++) {
//            tabcontent[i].style.display = "none";
//        }
        //document.getElementById("barchart").style.display = "block";
       // var financial_year1=$scope.financial_year;
            }
    $scope.barchart_func2=function() 
    {     
    	 var obj;
    	 var financial_year=30;
     	$rootScope.urlName = 'http://localhost:8080/';
         $rootScope.projectName = 'labtracker';
     	$scope.title = "State: "+ sessionStorage.stateName;
     	 $scope.disabledemo = "true";
     	$http({
             url: $rootScope.urlName + $rootScope.projectName + "/api/labtracker/labtrackerapplication/labtrackerio?" + "financial_year=" + financial_year,
             method: "GET",
             dataType: "json",
         }).then(function(response) {
         	console.log(response.status);
             if (response != null && response.status != 204) {
             	console.log("In SUCCESS block_labtracker"+response.status);

                 obj = angular.fromJson(response.data);
                 $scope.records = obj;
                 var dhc_names = [];
                 var total_spent=[];
                 var total_data=[];
                var obj1 = $scope.records;
             console.log(obj1[0].date);
             for(i = 0; i < obj1.length; i++){
             	dhc_names.push(obj1[i].date);
             //total_data.push([obj[i].dhc_name,obj[i].total_amt_spent,(obj[i].quarter_amount1+obj[i].quarter_amount2+obj[i].quarter_amount3+obj[i].quarter_amount4),obj[i].statebudgetmaster.total_amount_budgeted]);
             	total_data.push([obj1[i].date,obj1[i].input_count,obj1[i].output_count,obj1[i].pending_count]);
             }
             //console.log(obj[0].total_amt_spent);
//             for(i = 0; i < obj.length; i++){
//             total_spent.push(obj[i].total_amt_spent);
//             }
             total_data.forEach(function(d) {
                 d.values = [d[3],d[2],d[1]];
             });
          
            
             d3.selectAll("svg > *").remove();
             var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
             var svg = d3.select("#svg");
             var padding = {top:20,right:30,bottom:30, left:70};
             
            
             var color = [ "#0000ff", "#00FF00","#ff0000", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
             var index_amount=["pending_count","output_count","input_count"];
             var chartarea={
             "width" : parseInt(svg.style("width"))-padding.left-padding.right,
             "height" : parseInt(svg.style("height"))-padding.top-padding.bottom,
             };
            
          
                 var yScale = d3.scaleLinear()
                 .domain([0,d3.max(total_data, function(c) {
             	  return  Math.max(c[1], c[2],c[3]);

  })])

                 .range([chartarea.height,0]).nice();
                
          
                 var xScale = d3.scaleBand()
                 .domain(total_data.map(function(d){return d[0]}))
                 .range([0, chartarea.width])
                 .padding(0.4);
                 
                 var xScale1 = d3.scaleBand()
                 .domain([0,1,2])
                 .range([0, xScale.bandwidth()])
                 .padding(0);
                
          
                 var xAxisFn=d3.axisBottom(xScale);
                 var xAxis=svg.append("g")
                 .classed("xAxis",true)
                 .attr(
                 'transform','translate('+padding.left+','+(chartarea.height+padding.top)+')'
                 )
                 .call(d3.axisBottom(xScale));     
          
                
          
                 var yAxisFn=d3.axisLeft(yScale);
                 var yAxis=svg.append("g")
                 .classed("yAxis",true)
                 .attr(
                
           'transform','translate('+padding.left+','+padding.top+')'
                 );
                 yAxisFn(yAxis);
                
                 var rectGrp = svg.selectAll(".rectGrp")
                 .data(total_data)
                 .enter().append("g")
                 .attr("class", "rect")
                 .attr("transform", function(d) { return "translate(" +( xScale(d[0])+padding.left) + "," +padding.top + ")"; });
                 
                 rectGrp.selectAll("rect")
                 .data(function(d) { return d.values })
                 .enter()
                 .append("rect")
                 .attr("width",xScale1.bandwidth())
                 .attr("height",function(d){
                 return chartarea.height-yScale(d);
                 })
                 .attr("x",function(d,i){
                 return xScale1(i);
                 })
                 .attr("y",function(d){
                 return yScale(d);
                 })
                 .style("fill", function(d,i) { return color[i]; })
                  .on("mousemove", function(d,i){
                     divTooltip.style("left", d3.event.pageX+50+"px");
                     divTooltip.style("top", d3.event.pageY-25+"px");
                     divTooltip.style("display", "inline-block");
                     divTooltip.html(index_amount[i]+":"+d);
                 })
                 .on("mouseout", function(d){
                     divTooltip.style("display", "none");
                 });

                 var legend = svg.selectAll(".legend")
                 .data(index_amount.slice())
                 .enter().append("g")
                 .attr("class", "legend")
                 .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

             legend.append("rect")
                 .attr("x", chartarea.width - 18)
                 .attr("width", 18)
                 .attr("height", 18)
                 .style("fill", function(d,i) { return color[i]; })

             legend.append("text")
                 .attr("x", chartarea.width - 24)
                 .attr("y", 9)
                 .attr("dy", ".35em")
                 .style("text-anchor", "end")
                 .text(function(d) { return d; });
//                 rectGrp.append("text")
//                 .attr("y", function(d) { return chartarea.height; })
//                 .attr("x", xScale.bandwidth()/ 2)
//                 .text(function(d) { return d; });
//              


             }
         }, function errorCallback(response) {
         	
         	console.log("In error block_labtracker"+response.status);
         });}
    $scope.barchart_func3=function() 
    {     
    	 var obj;
    	 var start_date=$scope.start_date;
    	    
    	 console.log(start_date);
    	     
    	 var myDate1 = new Date(start_date);
    	     
    	 var start = myDate1.toLocaleString().split(",")[0].split("/")[2]+"/"+myDate1.toLocaleString().split(",")[0].split("/")[0]+"/"+myDate1.toLocaleString().split(",")[0].split("/")[1];
    	     
    	 console.log("start = " + start);
    	      
    	     
    	 var end_date=$scope.end_date;
    	     
    	 console.log(end_date);
    	     
    	 var myDate2 = new Date(end_date);
    	     
    	 var end = myDate2.toLocaleString().split(",")[0].split("/")[2]+"/"+myDate2.toLocaleString().split(",")[0].split("/")[0]+"/"+myDate2.toLocaleString().split(",")[0].split("/")[1];
    	     
    	 console.log("end = " + end);
    	      
    	     
    	 var mergedays=$scope.mergingDays;
    	     
    	 console.log("No.of days to merge"+mergedays);
    	      

    	 var financial_year=12;
     	$rootScope.urlName = 'http://localhost:8080/';
         $rootScope.projectName = 'labtracker';
     	$scope.title = "State: "+ sessionStorage.stateName;
     	 $scope.disabledemo = "true";
     	$http({
            url: $rootScope.urlName + $rootScope.projectName + "/api/labtracker/labtrackerapplication/labtrackerio?" + "start=" + start +"&end="+end +"&mergedays="+mergedays,
            method: "GET",
            dataType: "json",
         }).then(function(response) {
         	console.log(response.status);
             if (response != null && response.status != 204) {
             	console.log("In SUCCESS block_labtracker"+response.status);

                 obj = angular.fromJson(response.data);
                 $scope.records = obj;
                 var dhc_names = [];
                 var total_spent=[];
                 var total_data=[];
                var obj1 = $scope.records;
             console.log(obj1[0].date);
             for(i = 0; i < obj1.length; i++){
             	dhc_names.push(obj1[i].date);
             //total_data.push([obj[i].dhc_name,obj[i].total_amt_spent,(obj[i].quarter_amount1+obj[i].quarter_amount2+obj[i].quarter_amount3+obj[i].quarter_amount4),obj[i].statebudgetmaster.total_amount_budgeted]);
             	total_data.push([obj1[i].date,obj1[i].input_count,obj1[i].output_count,obj1[i].pending_count]);
             }
             //console.log(obj[0].total_amt_spent);
//             for(i = 0; i < obj.length; i++){
//             total_spent.push(obj[i].total_amt_spent);
//             }
             total_data.forEach(function(d) {
                 d.values = [d[3],d[2],d[1]];
             });
          
            
             d3.selectAll("svg > *").remove();
             var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
             var svg = d3.select("#svg");
             var padding = {top:20,right:30,bottom:30, left:70};
             
            
             var color = [ "#0000ff", "#00FF00","#ff0000", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
             var index_amount=["pending_count","output_count","input_count"];
             var chartarea={
             "width" : parseInt(svg.style("width"))-padding.left-padding.right,
             "height" : parseInt(svg.style("height"))-padding.top-padding.bottom,
             };
            
          
                 var yScale = d3.scaleLinear()
                 .domain([0,d3.max(total_data, function(c) {
             	  return  Math.max(c[1], c[2],c[3]);

  })])

                 .range([chartarea.height,0]).nice();
                
          
                 var xScale = d3.scaleBand()
                 .domain(total_data.map(function(d){return d[0]}))
                 .range([0, chartarea.width])
                 .padding(0.4);
                 
                 var xScale1 = d3.scaleBand()
                 .domain([0,1,2])
                 .range([0, xScale.bandwidth()])
                 .padding(0);
                
          
                 var xAxisFn=d3.axisBottom(xScale);
                 var xAxis=svg.append("g")
                 .classed("xAxis",true)
                 .attr(
                 'transform','translate('+padding.left+','+(chartarea.height+padding.top)+')'
                 )
                 .call(d3.axisBottom(xScale));     
          
                
          
                 var yAxisFn=d3.axisLeft(yScale);
                 var yAxis=svg.append("g")
                 .classed("yAxis",true)
                 .attr(
                
           'transform','translate('+padding.left+','+padding.top+')'
                 );
                 yAxisFn(yAxis);
                
                 var rectGrp = svg.selectAll(".rectGrp")
                 .data(total_data)
                 .enter().append("g")
                 .attr("class", "rect")
                 .attr("transform", function(d) { return "translate(" +( xScale(d[0])+padding.left) + "," +padding.top + ")"; });
                 
                 rectGrp.selectAll("rect")
                 .data(function(d) { return d.values })
                 .enter()
                 .append("rect")
                 .attr("width",xScale1.bandwidth())
                 .attr("height",function(d){
                 return chartarea.height-yScale(d);
                 })
                 .attr("x",function(d,i){
                 return xScale1(i);
                 })
                 .attr("y",function(d){
                 return yScale(d);
                 })
                 .style("fill", function(d,i) { return color[i]; })
                  .on("mousemove", function(d,i){
                     divTooltip.style("left", d3.event.pageX+50+"px");
                     divTooltip.style("top", d3.event.pageY-25+"px");
                     divTooltip.style("display", "inline-block");
                     divTooltip.html(index_amount[i]+":"+d);
                 })
                 .on("mouseout", function(d){
                     divTooltip.style("display", "none");
                 });

                 var legend = svg.selectAll(".legend")
                 .data(index_amount.slice())
                 .enter().append("g")
                 .attr("class", "legend")
                 .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });

             legend.append("rect")
                 .attr("x", chartarea.width - 18)
                 .attr("width", 18)
                 .attr("height", 18)
                 .style("fill", function(d,i) { return color[i]; })

             legend.append("text")
                 .attr("x", chartarea.width - 24)
                 .attr("y", 9)
                 .attr("dy", ".35em")
                 .style("text-anchor", "end")
                 .text(function(d) { return d; });
//                 rectGrp.append("text")
//                 .attr("y", function(d) { return chartarea.height; })
//                 .attr("x", xScale.bandwidth()/ 2)
//                 .text(function(d) { return d; });
//              


             }
         }, function errorCallback(response) {
         	
         	console.log("In error block_labtracker"+response.status);
         });}
    $("#throughput_button").click(function(){
    	document.getElementById("tat_graph").style.display = "none";
    	document.getElementById("currentpending_graph").style.display = "none";
    	document.getElementById("throughput_graph").style.display = "block";
    });
//    $scope.linechart_func=function(){  
//
//    	$scope.temp=2;
//        tabcontent = document.getElementsByClassName("tablecontent");
//        for (i = 0; i < tabcontent.length; i++) {
//            tabcontent[i].style.display = "none";
//        }
//
//        document.getElementById("linechart").style.display = "block";
//      var financial_year1=$scope.financial_year;
//      var total_released=[];
//      var total_spent=[];
//      var total_allocated=[];
//      var trends=[];
//      var index_amount=["Amount Allocated","Amount Released","Amount Spent"];
//      var obj = $scope.records;
//      console.log(obj[0].dhc_name+" "+obj[0].total_amt_spent+" "+(obj[0].quarter_amount1+obj[0].quarter_amount2+obj[0].quarter_amount3+obj[0].quarter_amount4)+" "+obj[0].statebudgetmaster.total_amount_budgeted);
//      for(i = 0; i < obj.length; i++){
//      //total_released.push((obj[i].quarter_amount1+obj[i].quarter_amount2+obj[i].quarter_amount3+obj[i].quarter_amount4));
//      }
//      var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
//
//      for(i = 0; i < obj.length; i++){
//    	  total_allocated.push([obj[i].dhc_name,obj[i].statebudgetmaster.total_amount_budgeted,0]);
//    	  total_released.push([obj[i].dhc_name,(obj[i].quarter_amount1+obj[i].quarter_amount2+obj[i].quarter_amount3+obj[i].quarter_amount4),1]);
//      	total_spent.push([obj[i].dhc_name,obj[i].total_amt_spent,2]);
//      }
//      trends.push(total_allocated,total_released,total_spent);
////      trends.forEach(function(d) {
////      
//////alert("hey");
////      d.values = [+d[3],+d[2],+d[1]];
////      });
//      d3.selectAll("svg > *").remove();
//      
//      var svg = d3.select('#svg2')
//      var color = [ "#0000ff", "#00FF00","#ff0000", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
//      var padding = { top: 20, right: 20, bottom: 30, left: 70 };
//      
//      var chartarea={
//          "width" : parseInt(svg.style("width"))-padding.left-padding.right,
//          "height": parseInt(svg.style("height"))-padding.top-padding.bottom,
//       };
//      
//      var g = svg.append("g")
//      .attr("transform", "translate(" + padding.left + "," + padding.top + ")"
//      );
//      var y = d3.scaleLinear()
//      .domain([0,d3.max(trends, function(c) {
//       	  return d3.max(c, function(v) {
//      		return v[1];
//     	  });
//      	})])
//      .range([chartarea.height,0]).nice();
//     
//
//      var x = d3.scaleBand()
//      .domain(trends[0].map(function(d) { return d[0]; }))
//      .range([0, chartarea.width])
//      .padding(0.4);
//
//        	    z = d3.scaleOrdinal(['#036888','#0D833C','#D2392A']);
//
//        	// define the line
//        	var line = d3.line()
//        	  .x(function(d) { return x(d[0]); })
//        	  .y(function(d) { return y(d[1]); });
//
//        
//console.log("trends:"+trends.length);
////       
//        	// Draw the line
//            var xAxisFn=d3.axisBottom(x);
//            var xAxis=svg.append("g")
//            .classed("xAxis",true)
//            .attr(
//            'transform','translate('+padding.left+','+(chartarea.height+padding.top)+')'
//            )
//            .call(d3.axisBottom(x));     
//     
//           
//     
//            var yAxisFn=d3.axisLeft(y);
//            var yAxis=svg.append("g")
//            .classed("yAxis",true)
//            .attr(
//           
//      'transform','translate('+padding.left+','+padding.top+')'
//            );
//            yAxisFn(yAxis);
////            g.append("g")
////            .attr("class","axis")
////            .attr("transform", "translate(0," + chartarea.height + ")")
////            .call(d3.axisBottom(x));
////            
////            g.append("g")
////            .attr("class","axis")
////            .call(d3.axisLeft(y))
////            .append("text")
////            .attr("fill", "#000");
//
//        	var temp;
//        	var trend = svg.selectAll(".trend")
//        	  .data(trends)
//        	  .enter()
//        	  .append("g")
//        	  .attr("class", "trend")
//        	  .attr("transform", function(d){ return "translate(" +(x(d[0][0])+padding.left-20) + ",0)"});
//
//        	   trend.append("path")
//        	  .attr("class", "line")
//        	  .attr("d", function(d) { temp=d;return line(d); })
//       	 .style("stroke", function(d,i) { return  color[i]; });
//console.log("check123:"+temp);
//        	// Draw the empty value for every point
//        	var points = g.selectAll('.points')
//        	  .data(trends)
//        	  .enter()
//        	  .append('g')
//        	  .attr('class', 'points')
//        	  .append('text');
//
//        	// Draw the circle
//        	trend
//        	  .style("fill", "#FFF")
//        	  .style("stroke", function(d,i) { return  color[i]; })
//        	  .selectAll("circle.line")
//        	  .data(function(d){ return d})
//        	  .enter()
//        	  .append("circle")
//        	  .attr("r", 5)
//        	  .style("stroke-width", 3)
//        	  .attr("cx", function(d) { return x(d[0]); })
//        	  .attr("cy", function(d) { return y(d[1]); });
//
//        	var focus = g.append('g')
//        	  .attr('class', 'focus')
//        	  .style('display', 'none');
//
//        	focus.append('line')
//        	  .attr('class', 'x-hover-line hover-line')
//        	  .attr('y1' , 0)
//        	  .attr('y2', chartarea.height);
//
//        	svg.append('rect')
//        	  .attr("transform", "translate(" + padding.left + "," + padding.top + ")")
//        	  .attr("class", "overlay")
//        	  .attr("width", chartarea.width)
//        	  .attr("height", chartarea.height)
//        	  .on("mouseover", mouseover)
//        	  .on("mouseout", mouseout)
//        	  .on("mousemove", mousemove);
//
//        	var timeScales = trends[0].map(function(name) { return x(name[0]); });
//
//        	function mouseover() {
//        	  focus.style("display", null);
//        	  d3.selectAll('.points text').style("display", null);
//        	}
//        	function mouseout() {
//        	  focus.style("display", "none");
//        	  d3.selectAll('.points text').style("display", "none");
//        	}
//        	function mousemove() {
//        	  var i = d3.bisect(timeScales, d3.mouse(this)[0], 1);
//        	  console.log("ivalue:"+i)
//        	  //var di = trends[i-1];
//        	  //focus.attr("transform", "translate(" + x(di[0]) + ",0)");
//        	  d3.selectAll('.points text')
//        	    .attr('x', function(d) { return x(d[i-1][0])+15*Math.pow(-1,d[i-1][2]); })
//        	    .attr('y', function(d) { return y(d[i-1][1])-15*Math.pow(-1,d[i-1][2])-30; })
//        	    .text(function(d) { return d[i-1][1]; })
//        	    .style('fill', "steelblue");
//        	}
//
//
//              
//    }
    $("#week_button").click(function(){
   	 // $("#barchart_button").hide();
   //	$("#linechart_button").show();
  	  $scope.barchart_func();
  });
    $("#month_button").click(function(){
      	 // $("#barchart_button").hide();
      //	$("#linechart_button").show();
     	  $scope.barchart_func2();
     });
//    $("#dashboard_button").click(function(){
//    	var tablecontent = document.getElementsByClassName("tablecontent");
//        for (i = 0; i < tablecontent.length; i++) {
//            tablecontent[i].style.display = "block";
//        }
//        var chartcontent = document.getElementsByClassName("chartcontent");
//        for (i = 0; i < chartcontent.length; i++) {
//            chartcontent[i].style.display = "none";
//        }
//    	//d3.selectAll("svg > *").remove();
//        $("#show_released").show()
//    	$("#hide_released").hide();
//    	$("#show_spent").show()
//    	$("#hide_spent").hide();
//        $(".amount_spent").hide();
//        $(".amount_released").hide();
//    	$("#dashboard_button").hide();
//     	$("#barchart_button").show();
//     	$("#linechart_button").show();
//
//    	$scope.temp=0;
//    	
//   });
//    $("#linechart_button").click(function(){
//    	 var chartcontent = document.getElementsByClassName("chartcontent");
//         for (i = 0; i < chartcontent.length; i++) {
//             chartcontent[i].style.display = "none";
//         }
//        $("#linechart_button").hide();
//        $("#dashboard_button").show();
//        $("#barchart_button").show();
//        $scope.linechart_func();
//       // $scope.temp=0;
//     });

//    $("#show_released").click(function(){
//    	$("#show_released").hide()
//    	$("#hide_released").show();
//        $(".amount_released").show();
//    });
//    $("#hide_released").click(function(){
//    	$("#show_released").show()
//    	$("#hide_released").hide();
//        $(".amount_released").hide();
//    });
//
//
    $scope.barchart_func_cp=function() 
    {     console.log("enter the dragon");
    var obj;
    	 var financial_year=7;
         
    	 var myDate1 = new Date($scope.date);
    	     
    	 var start = myDate1.toLocaleString().split(",")[0].split("/")[2]+"/"+myDate1.toLocaleString().split(",")[0].split("/")[0]+"/"+myDate1.toLocaleString().split(",")[0].split("/")[1];
    	     
     	$rootScope.urlName = 'http://localhost:8080/';
         $rootScope.projectName = 'labtracker';
     	$scope.title = "State: "+ sessionStorage.stateName;
     	 $scope.disabledemo = "true";
     	$http({
             url: $rootScope.urlName + $rootScope.projectName + "/api/labtracker/labtrackerapplication/labtrackercurrentpending?" + "date=" + start,
             method: "GET",
             dataType: "json",
         }).then(function(response) {
         	console.log(response.status);
             if (response != null && response.status != 204) {
             	console.log("In SUCCESS block_labtracker"+response.status);

                 obj = angular.fromJson(response.data);
                 $scope.records = obj;
                 var  status  = ["Grossing","Embedding","Typing","Sectioning","Staining","Reporting","Verification","Dispatch"];
                 var total_spent=[];
                 var total_data=[];
                var obj1 = $scope.records;
             //console.log(obj1[0].date);
             
             	//dhc_names.push(obj1[i].date);
             //total_data.push([obj[i].dhc_name,obj[i].total_amt_spent,(obj[i].quarter_amount1+obj[i].quarter_amount2+obj[i].quarter_amount3+obj[i].quarter_amount4),obj[i].statebudgetmaster.total_amount_budgeted]);
             	total_data.push(obj1.gross_count);
             	total_data.push(obj1.embedding_count);
             	total_data.push(obj1.typing_count);
             	total_data.push(obj1.sectioning_count);
             	total_data.push(obj1.staining_count);
             	total_data.push(obj1.reporting_count);
             	total_data.push(obj1.verification_count);
             	total_data.push(obj1.dispatch_count);
    
            
             d3.selectAll("svg > *").remove();
             var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
             var svg = d3.select("#svg_cp");
             var padding = {top:20,right:30,bottom:30, left:70};
             
            
             var color = [ "#0000ff", "#00FF00","#ff0000", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
             var index_amount=["pending_count","output_count","input_count"];
             var chartarea={
             "width" : parseInt(svg.style("width"))-padding.left-padding.right,
             "height" : parseInt(svg.style("height"))-padding.top-padding.bottom,
             };
            
          
                 var yScale = d3.scaleLinear()
                 .domain([0,d3.max(total_data)])
                 .range([chartarea.height,0]).nice();
                
          
                 var xScale = d3.scaleBand()
                 .domain(status)
                 .range([0, chartarea.width])
                 .padding(0.4);
          
                 var xAxisFn=d3.axisBottom(xScale);
                 var xAxis=svg.append("g")
                 .classed("xAxis",true)
                 .attr(
                 'transform','translate('+padding.left+','+(chartarea.height+padding.top)+')'
                 )
                 .call(d3.axisBottom(xScale));     
          
                
          
                 var yAxisFn=d3.axisLeft(yScale);
                 var yAxis=svg.append("g")
                 .classed("yAxis",true)
                 .attr(
                
           'transform','translate('+padding.left+','+padding.top+')'
                 );
                 yAxisFn(yAxis);
                
                 var rectGrp = svg.selectAll(".rectGrp")
                 .data(total_data)
                 .enter().append("g")
                 .attr("class", "rect")
                 .attr("transform", function(d) { return "translate(" +padding.left + "," +padding.top + ")"; })
                 .append("rect")
                 .attr("width",xScale.bandwidth())
                 .attr("height",function(d){
                 return chartarea.height-yScale(d);
                 })
                 .attr("x",function(d,i){
                 return xScale(status[i]);
                 })
                 .attr("y",function(d){
                 return yScale(d);
                 })
                 .style("fill", function(d,i) { return color[6-i]; })
                  .on("mousemove", function(d,i){
                     divTooltip.style("left", d3.event.pageX+50+"px");
                     divTooltip.style("top", d3.event.pageY-25+"px");
                     divTooltip.style("display", "inline-block");
                     divTooltip.html(status[i]+":"+d);
                 })
                 .on("mouseout", function(d){
                     divTooltip.style("display", "none");
                 });

//                 var legend = svg.selectAll(".legend")
//                 .data(index_amount.slice())
//                 .enter().append("g")
//                 .attr("class", "legend")
//                 .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//             legend.append("rect")
//                 .attr("x", chartarea.width - 18)
//                 .attr("width", 18)
//                 .attr("height", 18)
//                 .style("fill", function(d,i) { return color[i]; })
//
//             legend.append("text")
//                 .attr("x", chartarea.width - 24)
//                 .attr("y", 9)
//                 .attr("dy", ".35em")
//                 .style("text-anchor", "end")
//                 .text(function(d) { return d; });
//                 rectGrp.append("text")
//                 .attr("y", function(d) { return chartarea.height; })
//                 .attr("x", xScale.bandwidth()/ 2)
//                 .text(function(d) { return d; });
//              


             }
         }, function errorCallback(response) {
         	
         	console.log("In error block_labtracker"+response.status);
         });
     	
          		  

         $scope.temp=1
//    	tabcontent = document.getElementsByClassName("tablecontent");
//        for (i = 0; i < tabcontent.length; i++) {
//            tabcontent[i].style.display = "none";
//        }
        //document.getElementById("barchart").style.display = "block";
       // var financial_year1=$scope.financial_year;
            }

    $("#currentpending_button").click(function(){
    	document.getElementById("throughput_graph").style.display = "none";
    	document.getElementById("tat_graph").style.display = "none";
    	document.getElementById("currentpending_graph").style.display = "block";
    });
    $scope.disable=function()
    {
    	$scope.end_disable=false;
    }
    $scope.barchart_func_tat=function() 
{  

    	console.log("enter the dragon 2");
    	 
    	 var obj;
    	 var financial_year=7;
    	 var start_date=$scope.start_date_tat;
    	 console.log(start_date);
    	     
    	 var myDate1 = new Date(start_date);
    	     
    	 var start = myDate1.toLocaleString().split(",")[0].split("/")[2]+"/"+myDate1.toLocaleString().split(",")[0].split("/")[0]+"/"+myDate1.toLocaleString().split(",")[0].split("/")[1];
    	     
    	      
    	     
    	 var end_date=$scope.end_date_tat;
    	     
    	 console.log(end_date);
    	     
    	 var myDate2 = new Date(end_date);
    	     
    	 var end = myDate2.toLocaleString().split(",")[0].split("/")[2]+"/"+myDate2.toLocaleString().split(",")[0].split("/")[0]+"/"+myDate2.toLocaleString().split(",")[0].split("/")[1];

     	$rootScope.urlName = 'http://localhost:8080/';
         $rootScope.projectName = 'labtracker';
     	$scope.title = "State: "+ sessionStorage.stateName;
     	 $scope.disabledemo = "true";
     	$http({
             url: $rootScope.urlName + $rootScope.projectName + "/api/labtracker/labtrackerapplication/labtrackertat?" + "start_date=" + start+"&end_date="+end,
             method: "GET",
             dataType: "json",
         }).then(function(response) {
         	console.log(response.status);
             if (response != null && response.status != 204) {
             	console.log("In SUCCESS block_labtracker"+response.status);

                 obj = angular.fromJson(response.data);
                 $scope.records = obj;
                 var dhc_names = [];
                 var total_spent=[];
                 var total_data=[];
                 var status=["Total completed","Pending"]
                var obj1 = $scope.records;
             //console.log(obj1[0].date);
             for(i = 0; i < obj1.length; i++){
             	//dhc_names.push(obj1[i].date);
             //total_data.push([obj[i].dhc_name,obj[i].total_amt_spent,(obj[i].quarter_amount1+obj[i].quarter_amount2+obj[i].quarter_amount3+obj[i].quarter_amount4),obj[i].statebudgetmaster.total_amount_budgeted]);
             	total_data.push([obj1[i].output_count,obj1[i].pending_count]);
             	console.log(obj1[i].output_count+" "+obj1[i].pending_count)
             }
             //console.log(obj[0].total_amt_spent);
//             for(i = 0; i < obj.length; i++){
//             total_spent.push(obj[i].total_amt_spent);
//             }
             total_data.forEach(function(d) {
                 d.values = [d[3],d[2],d[1]];
             });
          
            
             d3.selectAll("svg > *").remove();
             var divTooltip = d3.select("body").append("div").attr("class", "toolTip");
             var svg = d3.select("#svg_tat");
             var padding = {top:20,right:30,bottom:30, left:70};
             
            
             var color = [ "#0000ff", "#00FF00","#ff0000", "#6b486b", "#a05d56", "#d0743c", "#ff8c00"];
             var index_amount=["pending_count","output_count","input_count"];
             var chartarea={
             "width" : parseInt(svg.style("width"))-padding.left-padding.right,
             "height" : parseInt(svg.style("height"))-padding.top-padding.bottom,
             };
            
          
                 var yScale = d3.scaleLinear()
                 .domain([0,d3.max(total_data, function(c) {
             	  return  Math.max(c[0], c[1]);

  })])

                 .range([chartarea.height,0]).nice();
                
          
                 var xScale = d3.scaleBand()
                 .domain(total_data.map(function(d,i){return i}))
                 .range([0, chartarea.width])
                 .padding(0.4);
                 
                 var xScale1 = d3.scaleBand()
                 .domain([0,1])
                 .range([0, xScale.bandwidth()])
                 .padding(0);
                
          
                 var xAxisFn=d3.axisBottom(xScale);
                 var xAxis=svg.append("g")
                 .classed("xAxis",true)
                 .attr(
                 'transform','translate('+padding.left+','+(chartarea.height+padding.top)+')'
                 )
                 .call(d3.axisBottom(xScale));     
          
                
          
                 var yAxisFn=d3.axisLeft(yScale);
                 var yAxis=svg.append("g")
                 .classed("yAxis",true)
                 .attr(
                
           'transform','translate('+padding.left+','+padding.top+')'
                 );
                 yAxisFn(yAxis);
                
                 var rectGrp = svg.selectAll(".rectGrp")
                 .data(total_data)
                 .enter().append("g")
                 .attr("class", "rect")
                 .attr("transform", function(d,i) { return "translate(" +(xScale(i)+padding.left) + "," +padding.top + ")"; });
                 
                 rectGrp.selectAll("rect")
                 .data(function(d) { return d})
                 .enter()
                 .append("rect")
                 .attr("width",xScale1.bandwidth())
                 .attr("height",function(d){
                 return chartarea.height-yScale(d);
                 })
                 .attr("x",function(d,i){
                 return xScale1(i);
                 })
                 .attr("y",function(d){
                 return yScale(d);
                 })
                 .style("fill", function(d,i) { return color[i]; })
                  .on("mousemove", function(d,i){
                     divTooltip.style("left", d3.event.pageX+50+"px");
                     divTooltip.style("top", d3.event.pageY-25+"px");
                     divTooltip.style("display", "inline-block");
                     divTooltip.html(status[i]+":"+d);
                 })
                 .on("mouseout", function(d){
                     divTooltip.style("display", "none");
                 });
//
//                 var legend = svg.selectAll(".legend")
//                 .data(index_amount.slice())
//                 .enter().append("g")
//                 .attr("class", "legend")
//                 .attr("transform", function(d, i) { return "translate(0," + i * 20 + ")"; });
//
//             legend.append("rect")
//                 .attr("x", chartarea.width - 18)
//                 .attr("width", 18)
//                 .attr("height", 18)
//                 .style("fill", function(d,i) { return color[i]; })
//
//             legend.append("text")
//                 .attr("x", chartarea.width - 24)
//                 .attr("y", 9)
//                 .attr("dy", ".35em")
//                 .style("text-anchor", "end")
//                 .text(function(d) { return d; });
//                 rectGrp.append("text")
//                 .attr("y", function(d) { return chartarea.height; })
//                 .attr("x", xScale.bandwidth()/ 2)
//                 .text(function(d) { return d; });
//              


             }
         }, function errorCallback(response) {
         	
         	console.log("In error block_labtracker"+response.status);
         });
     	
          		  

         $scope.temp=1
//    	tabcontent = document.getElementsByClassName("tablecontent");
//        for (i = 0; i < tabcontent.length; i++) {
//            tabcontent[i].style.display = "none";
//        }
        //document.getElementById("barchart").style.display = "block";
       // var financial_year1=$scope.financial_year;
            }
    $("#tat_button").click(function(){
    	document.getElementById("throughput_graph").style.display = "none";
    	document.getElementById("currentpending_graph").style.display = "none";
    	document.getElementById("tat_graph").style.display = "block";
    	$scope.end_disable=true;
    	console.log("working properly");

    });
//    	$("#show_spent").hide()
//    	$("#hide_spent").show();
//        $(".amount_spent").show();
//    });  
//    $("#show_spent").click(function(){
//    	$("#show_spent").hide()
//    	$("#hide_spent").show();
//        $(".amount_spent").show();
//    });
//    $("#hide_spent").click(function(){
//    	$("#show_spent").show()
//    	$("#hide_spent").hide();
//        $(".amount_spent").hide();
//    });
});
//StateDashboard