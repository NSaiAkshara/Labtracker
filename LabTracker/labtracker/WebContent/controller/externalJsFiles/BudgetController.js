//BudgetReport Controller
app.controller("BudgetController", function($scope, $http, $rootScope) {
	
	
	$scope.savedBudget = function (e,f)	  {
		
	    $scope.form_ReportingDate = sessionStorage.ReportingDate;
	    $scope.submitted_DLO_name = sessionStorage.districtName;
	    //2018-02-01
	    
	  // alert(sessionStorage.ReportingYear); 
	   
	    $scope.disabledemo2="true";
		// alert("here the date"+sessionStorage.ReportingYear);
	    
	    $http({
			url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcBudget/masterData?dhc_id="+sessionStorage.hospitalID+"&financial_year="+f,
			method: "GET",
			dataType: "json",
		 }).then(function(response) {
			
			 if(response.status==200){	
	        var obj = angular.fromJson(response.data);
	    //	$scope.AllocatedBudget_state=
	    	
	    //	$scope.disabledTotalAmount="true";
	    	$scope.state_budget_master_id=obj[0].state_budget_master_id;
	    	
	    	$scope.allocated_budget_amount = obj[0].total_amount_budgeted;
			 }else{
				 
				 alert("nodata"+response.status)
			 }
	    
		 }, function errorCallback(response) {
			 
		        // console.log(form_submitted_status);
			 
		 });
	    
	    // cumulative& percentage caluculator
	    
	    
	    
	    
   
 }
	
	
	$scope.getCumulative = function (e,f)	  {
		////alert("coming to here as f "+f);
		$http({
			url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + e + "/dhcBudget/cumulativebudgetData?dhc_id="+sessionStorage.hospitalID+"&report_date="+f,
			method: "GET",
			dataType: "json",
		 }).then(function(response) {
			
			// alert(response.status)
			 
		if(response.status == 200 && response.status != 204){	
				 
        var obj = angular.fromJson(response.data);
        
     
      //cumulative code is here
		 $scope.Cumulative_Salary =  obj[0].salary;
		 $scope.Cumulative_Infrastructure  = obj[0].infra;
		 $scope.Cumulative_Training = obj[0].training;
		 $scope.Cumulative_IEC = obj[0].iec;
		 $scope.Cumulative_TI = obj[0].targeted_interv;
		 $scope.Cumulative_Drugs = obj[0].drugs;
		 $scope.Cumulative_Equipments = obj[0].equipments;
		 $scope.Cumulative_OperationalExps = obj[0].op_expenses;
		 $scope.Cumulative_AmbulatorySrv = obj[0].ambulance_services;
		 $scope.Cumulative_Miscellaneous = obj[0].misc_travel_contingency;
		 
		 
		 var a =  Number($scope.Cumulative_Salary || 0);
		 var b =  Number($scope.Cumulative_Infrastructure  || 0);
		 var c =  Number($scope.Cumulative_Training || 0);
		 var d =  Number($scope.Cumulative_IEC || 0);
		 var e =  Number($scope.Cumulative_TI || 0);
		 var f =  Number($scope.Cumulative_Drugs|| 0);
		 var g =  Number($scope.Cumulative_Equipments || 0);
		 var h =  Number($scope.Cumulative_OperationalExps || 0);
		 var i =  Number($scope.Cumulative_AmbulatorySrv || 0);
		 var j =  Number($scope.Cumulative_Miscellaneous || 0);
		 var x = Number($scope.allocated_budget_amount || 0);
		 
		// alert(a+"--"+b+"--"+c+"--"+d+"--"+e+"--"+f+"--"+g+"--"+h+"--"+l+"--"+j+"--"+k);
		// alert(abcdefghi);
		 $scope.Cumulative_Total = a+b+c+d+e+f+g+h+i+j;
		 alert($scope.Cumulative_Total);
		 var x1 = Number($scope.Cumulative_Total || 0);
			
		 var n1 = (a/x)*100;
		 var n2 = (b/x)*100;
		 var n3 = (c/x)*100;
		 var n4 = (d/x)*100;
		 var n5 = (e/x)*100;
		 var n6 = (f/x)*100;
		 var n7 = (g/x)*100;
		 var n8 = (h/x)*100;
		 var n9 = (i/x)*100;
		 var n10 = (j/x)*100;
		 
		 var n11 = (x1/x)*100;
		
		 n1=n1.toFixed(2);
		 n2=n2.toFixed(2);
		 n3=n3.toFixed(2);
		 n4=n4.toFixed(2);
		 n5=n5.toFixed(2);
		 n6=n6.toFixed(2);
		 n7=n7.toFixed(2);
		 n8=n8.toFixed(2);
		 n9=n9.toFixed(2);
		 n10=n10.toFixed(2);
		 n11=n11.toFixed(2);
		 
		// alert(n1);
		 //percentageCode
		 $scope.Percentage_Salary = n1+" %";
		 $scope.Percentage_Infrastructure = n2+" %";
		 $scope.Percentage_Training = n3+" %";
		 $scope.Percentage_IEC = n4+" %";
		 $scope.Percentage_TI = n5+" %";
		 $scope.Percentage_Drugs = n6+" %";
		 $scope.Percentage_Equipments = n7+" %";
		 $scope.Percentage_OperationalExps = n8+" %";
		 $scope.Percentage_AmbulatorySrv = n9+" %";
		 $scope.Percentage_Miscellaneous = n10+" %";
		 $scope.Percentage_Total = n11+" %";
     
			 }else{
					 
				alert("coming to here1234"); 
				 $scope.Cumulative_Salary =  0;
				 $scope.Cumulative_Infrastructure  = 0;
				 $scope.Cumulative_Training = 0;
				 $scope.Cumulative_IEC = 0;
				 $scope.Cumulative_TI = 0;
				 $scope.Cumulative_Drugs = 0;
				 $scope.Cumulative_Equipments = 0;
				 $scope.Cumulative_OperationalExps = 0;
				 $scope.Cumulative_AmbulatorySrv = 0;
				 $scope.Cumulative_Miscellaneous = 0;
				// $scope.Cumulative_Total = 0;
			 }
	    
		 }, function errorCallback(response) {
			 
		        // console.log(form_submitted_status);
			 
		 });
		
		
	}
	
	
	
	
	
	$scope.changemonthforbudgetData(sessionStorage.ReportingMonth,sessionStorage.ReportingYear);
	
	$scope.disablefields="true";
	$scope.form_ReportingYear = sessionStorage.ReportingYear;
    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNumber = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    }
    //alert("before Date "+$scope.form_ReportingMonth);
    $scope.form_ReportingMonth = sessionStorage.ReportingMonth;
    //alert("after Date "+$scope.form_ReportingMonth);
    $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
    $scope.yearCount = function() {
        var input = [];
        for (i = sessionStorage.ReportingYear; i > 1973; i--) {
            input.push(i);
        }
        return input;
    }
	
    var date1 = sessionStorage.ReportingYear + "-" + $scope.monthnumber + "-01";
    
    alert("date us coming to here  "+date1);
    $scope.getCumulative(sessionStorage.hospitalID,date1);
    
    //2018-03-01 2018-02-01
    
    $http({
  		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcBudget/DhcBudgetReport?dhc_id="+sessionStorage.hospitalID+"&report_date="+date1,
  		method: "GET",
  		dataType: "json",
  	}).then(function(response) {
  		alert(response.status);
  		if(response.status == 200 && response.status != 204){
  		
  		var obj = angular.fromJson(response.data);
  		
  		//console(obj);
  		 // alert(obj);
  		
  		 $scope.ReporingDate = obj[0].date_of_reporting;
		 $scope.DM_Salary = obj[0].salary;
		 $scope.DM_Infrastructure = obj[0].infra;
		 $scope.DM_Training = obj[0].training;
		 $scope.DM_IEC = obj[0].iec;
		 $scope.DM_TI = obj[0].targeted_interv;
		 $scope.DM_Drugs = obj[0].drugs;
		 $scope.DM_Equipments = obj[0].equipments;
		 $scope.DM_OperationalExps = obj[0].op_expenses;
		 $scope.DM_AmbulatorySrv = obj[0].ambulance_services;
		 $scope.DM_Miscellaneous = obj[0].misc_travel_contingency;
		 $scope.submitted_DLO_name = obj[0].submitted_by;
		 $scope.form_Remarks = obj[0].remarks;
		 
		 alert("flag_status== "+obj[0].flag_status);
		 if(obj[0].flag_status == 1){
			 
			 $scope.disablefields_1=""; 
		 }else{
			 
			 $scope.disablefields_1="true"; 
		 }
		 
		  
		 
		 
		 
		
		 
		 
		 var a = Number($scope.DM_Salary || 0);
		 var b = Number($scope.DM_Infrastructure || 0);
		 var c = Number($scope.DM_Training || 0);
		 var d = Number($scope.DM_IEC || 0);
		 var e = Number($scope.DM_TI || 0);
		 var f = Number($scope.DM_Drugs || 0);
		 var g = Number($scope.DM_Equipments || 0);
		 var h = Number($scope.DM_OperationalExps || 0);
		 var i = Number($scope.DM_AmbulatorySrv || 0);
		 var j = Number($scope.DM_Miscellaneous || 0);
		 
		 $scope.DM_Total = a+b+c+d+e+f+g+h+i+j;
		 
		 var allocated_budget = Number($scope.allocated_budget_amount || 0);
		 
		 $scope.BalanceRemain = $scope.allocated_budget_amount-$scope.DM_Total;
		 
  		}else{
  			
  			
  			alert("status field");
  			
  			 $scope.ReporingDate = "";
  			 $scope.DM_Salary = "";
  			 $scope.DM_Infrastructure = "";
  			 $scope.DM_Training = "";
  			 $scope.DM_IEC = "";
  			 $scope.DM_TI = "";
  			 $scope.DM_Drugs = "";
  			 $scope.DM_Equipments = "";
  			 $scope.DM_OperationalExps = "";
  			 $scope.DM_AmbulatorySrv = "";
  			 $scope.DM_Miscellaneous = "";
  			 //$scope.submitted_DLO_name = "";
  			 $scope.form_Remarks = "";
  			 
  			 $scope.disablefields_1="";
  			
  			 $scope.DM_Total ="";
  			 
  			$scope.BalanceRemain ="";
  		}
  		
  	 },function errorCallback(response) {
         
  		 
     });
    
    
    //need to write date function here  b/w 04 year t0 04 year1
		
	$scope.savedBudget(sessionStorage.hospitalID,"April 2017- April 2018");
	
	
	
	$scope.changemonthforbudgetData = function(month,year){
		
		$scope.form_ReportingMonth = month;
		$scope.form_ReportingYear = year;
		alert($scope.form_ReportingMonth+"  "+$scope.form_ReportingYear);
		$scope.disablefield=" ";
		
		 var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		 $scope.monthNames = Names;
     	
         var monthNumber = {
	        "January": "01",
	        "February": "02",
	        "March": "03",
	        "April": "04",
	        "May": "05",
	        "June": "06",
	        "July": "07",
	        "August": "08",
	        "September": "09",
	        "October": "10",
	        "November": "11",
	        "December": "12"
     	}
         
          $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
          var month1 = $scope.form_ReportingYear + "-" + $scope.monthnumber + "-01";
          
          $scope.getCumulative(sessionStorage.hospitalID,month1);
          $http({
      		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcBudget/DhcBudgetReport?dhc_id="+sessionStorage.hospitalID+"&report_date="+month1,
      		method: "GET",
      		dataType: "json",
      	}).then(function(response) {
      		alert(response.status);
      		if(response.status == 200){
      		
      		var obj = angular.fromJson(response.data);
      		
      		 $scope.ReporingDate = obj[0].date_of_reporting;
			 $scope.DM_Salary = obj[0].salary;
			 $scope.DM_Infrastructure = obj[0].infra;
			 $scope.DM_Training = obj[0].training;
			 $scope.DM_IEC = obj[0].iec;
			 $scope.DM_TI = obj[0].targeted_interv;
			 $scope.DM_Drugs = obj[0].drugs;
			 $scope.DM_Equipments = obj[0].equipments;
			 $scope.DM_OperationalExps = obj[0].op_expenses;
			 $scope.DM_AmbulatorySrv = obj[0].ambulance_services;
			 $scope.DM_Miscellaneous = obj[0].misc_travel_contingency;
			 $scope.submitted_DLO_name = obj[0].submitted_by;
			 $scope.form_Remarks = obj[0].remarks;
			 
			 
			 $scope.disablefields_1="true";
			  
			 
			 var a = Number($scope.DM_Salary || 0);
			 var b = Number($scope.DM_Infrastructure || 0);
			 var c = Number($scope.DM_Training || 0);
			 var d = Number($scope.DM_IEC || 0);
			 var e = Number($scope.DM_TI || 0);
			 var f = Number($scope.DM_Drugs || 0);
			 var g = Number($scope.DM_Equipments || 0);
			 var h = Number($scope.DM_OperationalExps || 0);
			 var i = Number($scope.DM_AmbulatorySrv || 0);
			 var j = Number($scope.DM_Miscellaneous || 0);
			 
			 $scope.DM_Total = a+b+c+d+e+f+g+h+i+j;
			 
			 var allocated_budget = Number($scope.allocated_budget_amount || 0);
			 
			 $scope.BalanceRemain = $scope.allocated_budget_amount-$scope.DM_Total;
			 
      		}else{
      			
      			
      			alert("status field1");
      			
      			 $scope.ReporingDate = "";
      			 $scope.DM_Salary = "";
      			 $scope.DM_Infrastructure = "";
      			 $scope.DM_Training = "";
      			 $scope.DM_IEC = "";
      			 $scope.DM_TI = "";
      			 $scope.DM_Drugs = "";
      			 $scope.DM_Equipments = "";
      			 $scope.DM_OperationalExps = "";
      			 $scope.DM_AmbulatorySrv = "";
      			 $scope.DM_Miscellaneous = "";
      		//	 $scope.submitted_DLO_name = "";
      			 $scope.form_Remarks = "";
      			 
      			  $scope.disablefields_1="";
      			  
      			$scope.DM_Total ="";
     			 
      			$scope.BalanceRemain ="";
      			
      		}
      		
      	 },function errorCallback(response) {
             
      		 
         });
     	 
          
	}
	
	
	
	
	
	$scope.submitClick = function(e) {
		
		//alert("after save "+$scope.form_ReportingDate);	
	$scope.form_ReportingMonth = $scope.form_ReportingMonth;
	$scope.form_ReportingYear = $scope.form_ReportingYear;
		
	$scope.form_District = sessionStorage.districtName;
 //$scope.form_ReportingMonth = $scope.form_ReportingMonth;
    $scope.form_ReportingDate = sessionStorage.ReportingDate;
 //$scope.form_ReportingYear = sessionStorage.ReportingYear
    $scope.form_FacilityType = sessionStorage.FacilityType;
    $scope.form_hospitalName = sessionStorage.hospitalName;
    $scope.form_Admname = sessionStorage.Admname;
    $scope.form_NameOfPharmacist = sessionStorage.NameOfPharmacist; 
    var parts = sessionStorage.ReportingDate.split("-");
    $scope.form_DateOfReport = new Date(parts[2], parts[1]-1, parts[0]);
    $rootScope.doctorname = sessionStorage.NameOfPharmacist;
	$rootScope.doctorType1 = sessionStorage.FacilityType;
	$scope.flag_status = e;
	
	alert($scope.flag_status);
	
	//DM_Salary,DM_Infrastructure,DM_Training,DM_IEC,DM_TI,DM_Drugs,DM_Equipments,DM_OperationalExps,DM_AmbulatorySrv,DM_Miscellaneous,DM_Total,
	//BalanceRemain,submitted_DLO_name,form_Remarks
	 var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
	 $scope.monthNames = Names;
 	
     var monthNumber = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
 	}
     
      $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
      var month1 =$scope.form_ReportingYear + "-" + $scope.monthnumber + "-01";
	
	
	
	
	alert("$scope.form_ReportingMonth "+month1);
	//alert("$scope.ReporingDate "+$scope.ReporingDate);
	
	 var Indata = {
			 
			 dhc_id:sessionStorage.hospitalID,
			 state_budget_master_id_fk:$scope.state_budget_master_id,
			 report_for_month:month1,
			 date_of_reporting:$scope.ReporingDate,
			 salary:$scope.DM_Salary,
			 infra:$scope.DM_Infrastructure,
			 training:$scope.DM_Training,
			 iec:$scope.DM_IEC,
			 targeted_interv:$scope.DM_TI,
			 drugs:$scope.DM_Drugs,
			 equipments:$scope.DM_Equipments,
			 op_expenses:$scope.DM_OperationalExps,
			 ambulance_services:$scope.DM_AmbulatorySrv,
			 misc_travel_contingency:$scope.DM_Miscellaneous,
			//DM_Total:$scope.DM_Total,
			 submitted_by:$scope.submitted_DLO_name,
			 remarks:$scope.form_Remarks,
			 flag_status:$scope.flag_status,
	 };
	 
	 var myJSON = JSON.stringify(Indata);
	 
	 console.log(myJSON);
	 $http({
         url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/dhcBudget",
         method: "POST",
         data: myJSON,
         contentType: "application/json",
         dataType: "json",
         //contentType:"application/x-www-form-urlencoded"
     }).then(function(response) {
    	 
    	 //alert("it might be saved");
    	 alert("year "+$scope.form_ReportingYear+ "  hh "+ $scope.monthnumber);
    	 
    	 var Names = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
		 $scope.monthNames = Names;
		 var a = Number($scope.monthnumber || 0);
		 var q1 = a-1;
    	$scope.changemonthforbudgetData($scope.monthNames[q1],$scope.form_ReportingYear);
		 //alert("names "+ $scope.monthNames[07]);
     }, function errorCallback(response) {
        // console.log(form_submitted_status);
     });
	 
     console.log("he he he"+myJSON);
	}
	
});


//stateBugetController data entry..
app.controller("stateBudgetController", function($scope, $http, $rootScope) {
	
	//disablefilesshere
	$scope.disabledTotalAmount = "true";
	$scope.disabledQ1 = "true";
	$scope.disabledQ2 = "true";
	$scope.disabledQ3 = "true";
	$scope.disabledQ4 = "true";
	
	//$scope.submitDis = "true";
	
	
	
	$scope.form_ReportingYear = sessionStorage.ReportingYear;
    $scope.monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var monthNumber = {
        "January": "01",
        "February": "02",
        "March": "03",
        "April": "04",
        "May": "05",
        "June": "06",
        "July": "07",
        "August": "08",
        "September": "09",
        "October": "10",
        "November": "11",
        "December": "12"
    }
    
    $scope.finacialYear =["April 2017- April 2018"," April 2016- April 2017", "April 2015- April 2016", "April 2014- April 2015"]
    
    $scope.form_ReportingMonth = sessionStorage.ReportingMonth+" "+sessionStorage.ReportingYear;
    //alert(sessionStorage.ReportingMonth+" "+sessionStorage.ReportingYear);
    $scope.monthnumber = monthNumber[$scope.form_ReportingMonth];
    $scope.yearCount = function() {
        var input = [];
        for (i = sessionStorage.ReportingYear; i > 1973; i--) {
            input.push(i);
        }
        return input;
    }
	
    $scope.form_ReportingDate = sessionStorage.ReportingDate+" "+sessionStorage.ReportingYear;
    
   // $scope.hospitalFinal = sessionStorage.hospitalID;
    //alert($scope.hospitalFinal);
    
   
    $http({
		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/shcBudget/dhclistforshc",
		method: "GET",
		dataType: "json",
	}).then(function(response) {
		//alert("simha123  "+response.status);
	var obj = angular.fromJson(response.data);
	
	var index = 0;
		//var inp=[];
		 $scope.hospitalName_array=[];
		angular.forEach(obj, function(value, key) {     
	      var hospitalName = value.hospitalName; 
		  var hospitalId = value.hospital_id;
		 // inp[hospitalId]=hospitalName;
		 // console.log("key "+key+" hospitalId "+hospitalId+" hospitalName "+hospitalName);
		  $scope.hospitalName_array[index]=hospitalName+"_"+hospitalId;  
		  index = index + 1;
	});
		console.log($scope.hospitalName_array);
	}, function errorCallback(response) {
	 
	 
	});
    
    
    
   //getMasterData
  $scope.changeMasterData = function(year,dhc_id) {
	//  alert("DHC_id  "+dhc_id+"   year "+year);
	  
	  
	  $scope.AllocatedBudget_state="";
	  $scope.TotalBudgetReleased ="";
	  $scope.state_budget_master_id="";
      $scope.Financical_year;
      $scope.disabledTotalAmount="";
     
     //Q1 row fields empty
        $scope.Amount="";
		$scope.release_date="";
		$scope.Releasedby="";
		$scope.Remarks_state="";
		$scope.disabledQ1="";
		
		//Q1 row fields empty
		$scope.Amount_Q2="";
		$scope.release_date_Q2="";
		$scope.Releasedby_Q2="";
		$scope.Remarks_state_Q2="";
		$scope.disabledQ2="";
		
		//Q1 row fields empty
		$scope.Amount_Q3="";
		$scope.release_date_Q3="";
		$scope.Releasedby_Q3="";
		$scope.Remarks_state_Q3="";
		$scope.disabledQ3="";
		
		//Q4 row fields empty
		$scope.Amount_Q4="";
		$scope.release_date_Q4="";
		$scope.Releasedby_Q4="";
		$scope.Remarks_state_Q4="";
		$scope.disabledQ4="";
		//submit button disable
		//$scope.District_id = dhc_id;
		
		 //$scope.District_id=$scope.District_id.split("_");
		 //alert("mistory  "+$scope.District_id[1]);
		$scope.submitDisabled="";
    // $scope.disabledTotalAmount="false";
     //alert($scope.Financical_year);
	if(dhc_id&&year){
		//alert("change Data"+$scope.District_id);
	//alert($rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/shcBudget/masterData?dhc_id="+dhc_id+"&financial_year="+year);
    $http({
		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + 1 + "/shcBudget/masterData?dhc_id="+dhc_id+"&financial_year="+year,
		method: "GET",
		dataType: "json",
	}).then(function(response) {
		
	if(response.status==200){	
	var obj = angular.fromJson(response.data);
	$scope.AllocatedBudget_state=obj[0].total_amount_budgeted;
	
	$scope.disabledTotalAmount="true";
	$scope.state_budget_master_id=obj[0].state_budget_master_id;
	sessionStorage.state_budget_master_id=obj[0].state_budget_master_id;
	//populating data in Q1 Q2 Q3 Q4
	
	 $http({
			url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/shcBudget/masterQData?state_budget_master_id="+$scope.state_budget_master_id,
			method: "GET",
			dataType: "json",
		}).then(function(response) {
		if(response.status==200){
			//alert("yes Q1 DATA get method");
			var obj = angular.fromJson(response.data);
			console.log(obj);
			if(obj.length==1){
				alert("1"+obj[0].amount_release_date);
		    sessionStorage.quarter_no = obj[0].quarter_no;	
			$scope.Amount=obj[0].quarter_amount;
			$scope.release_date=new Date(obj[0].amount_release_date);
			//$scope.release_date="03/21/2018";
			$scope.Releasedby=obj[0].released_by;
			$scope.Remarks_state=obj[0].remarks;
			$scope.disabledQ1="true";
			$scope.disabledQ3="true";
			$scope.disabledQ4="true";
			$scope.TotalBudgetReleased =obj[0].quarter_amount;	
			//sessionStorage.state_budget_master_id=
			
			}else if(obj.length==2){
				alert("2"+obj[0].amount_release_date);
				sessionStorage.quarter_no = obj[1].quarter_no;
				$scope.Amount=obj[0].quarter_amount;
				$scope.release_date=new Date(obj[0].amount_release_date);
				$scope.Releasedby=obj[0].released_by;
				//$scope.release_date="03/21/2018";
				$scope.Remarks_state=obj[0].remarks;
				$scope.disabledQ1="true";
				//Q2
				$scope.Amount_Q2=obj[1].quarter_amount;
				$scope.release_date_Q2=new Date(obj[1].amount_release_date);
				$scope.Releasedby_Q2=obj[1].released_by;
				$scope.Remarks_state_Q2=obj[1].remarks;
				$scope.disabledQ2="true";
				$scope.disabledQ4="true";
				var a = Number(obj[0].quarter_amount || 0);
	            var b = Number(obj[1].quarter_amount || 0);
	            
				$scope.TotalBudgetReleased =a+b;
			}else if(obj.length==3){
				alert("3"+obj[0].amount_release_date);
				sessionStorage.quarter_no = obj[2].quarter_no;
				$scope.Amount=obj[0].quarter_amount;
				$scope.release_date=new Date(obj[0].amount_release_date);
				$scope.Releasedby=obj[0].released_by;
				$scope.Remarks_state=obj[0].remarks;
				$scope.disabledQ1="true";
				//Q2
				$scope.Amount_Q2=obj[1].quarter_amount;
				$scope.release_date_Q2=new Date(obj[1].amount_release_date);
				$scope.Releasedby_Q2=obj[1].release_by;
				$scope.Remarks_state_Q2=obj[1].remarks;
				$scope.disabledQ2="true";
				//Q3
				$scope.Amount_Q3=obj[2].quarter_amount;
				$scope.release_date_Q3=new Date(obj[2].amount_release_date);
				$scope.Releasedby_Q3=obj[2].released_by;
				$scope.Remarks_state_Q3=obj[2].remarks;
				$scope.disabledQ3="true";
				
				var a = Number(obj[0].quarter_amount || 0);
	            var b = Number(obj[1].quarter_amount || 0);
	            var c = Number(obj[2].quarter_amount || 0);
	            
				$scope.TotalBudgetReleased =a+b+c;
				
			}else if(obj.length==4){
				alert("4"+obj[0].amount_release_date);
				sessionStorage.quarter_no = obj[3].quarter_no;
				$scope.Amount=obj[0].quarter_amount;
				$scope.release_date=new Date(obj[0].amount_release_date);
				$scope.Releasedby=obj[0].released_by;
				$scope.Remarks_state=obj[0].remarks;
				$scope.disabledQ1="true";
				//Q2
				$scope.Amount_Q2=obj[1].quarter_amount;
				$scope.release_date_Q2=new Date(obj[1].amount_release_date);
				$scope.Releasedby_Q2=obj[1].released_by;
				$scope.Remarks_state_Q2=obj[1].remarks;
				$scope.disabledQ2="true";
				//Q3
				$scope.Amount_Q3=obj[2].quarter_amount;
				$scope.release_date_Q3=new Date(obj[2].amount_release_date);
				$scope.Releasedby_Q3=obj[2].released_by;
				$scope.Remarks_state_Q3=obj[2].remarks;
				$scope.disabledQ3="true";
				//Q4
				$scope.Amount_Q4=obj[3].quarter_amount;
				$scope.release_date_Q4=new Date(obj[3].amount_release_date);
				$scope.Releasedby_Q4=obj[3].released_by;
				$scope.Remarks_state_Q4=obj[3].remarks;
				$scope.disabledQ4="true";
				
				var a = Number(obj[0].quarter_amount || 0);
	            var b = Number(obj[1].quarter_amount || 0);
	            var c = Number(obj[2].quarter_amount || 0);
	            var d = Number(obj[3].quarter_amount || 0);
				$scope.TotalBudgetReleased =a+b+c+d;
				
				$scope.submitDisabled="true";
			}
			console.log("length is "+obj.length);
			console.log(obj);
		}else{
			
			sessionStorage.quarter_no="Q0";
			
		//	$scope.disabledQ4="true";
		//	$scope.disabledQ2="true";
			//$scope.disabledQ3="true";
			//$scope.disabledQ4="true";
			
			
			
		}
	}, function errorCallback(response) {
	 
	 
	});
	
	}else{
		alert("cam 01");
		
		sessionStorage.quarter_no="Q0";	
	//$scope.disabledTotalAmount = "true";
	//$scope.disabledQ1 = "true";
		$scope.disabledQ2 = "true";
		$scope.disabledQ3 = "true";
		$scope.disabledQ4 = "true";
		$scope.disabledTotalAmountCum="true";
		
		
	}
}, function errorCallback(response) {
 
 alert("data is not there even master");
});
   
	}else{
		alert("cam 02");
		//$scope.AllocatedBudget_state="true";	
		$scope.disabledTotalAmount = "true";
		$scope.disabledQ1 = "true";
		$scope.disabledQ2 = "true";
		$scope.disabledQ3 = "true";
		$scope.disabledQ4 = "true";
		$scope.disabledTotalAmountCum="true";
		
	}

  }
	
	
//State data save and submit
	$scope.submitStateClick = function() {
		
	 alert("this is data inside svae "+$scope.form_Q1_details);	
		//console.log(myJSON);
		
		$scope.form_FacilityType = sessionStorage.FacilityType;
	    $scope.form_hospitalName = sessionStorage.hospitalName;
	    //sessionStorage.dhcname=$scope.District_id
	    $scope.District_id1=$scope.District_id;
	    
	     //alert("Session_ID"+sessionStorage.quarter_no);
	   
	     $scope.District_id2=$scope.District_id1.split("_");
	     
	     date = $scope.release_date; 
	   	 year = date.getFullYear();
	   	 var month1 = date.getMonth() + 1;
			if(month1 < 10){
				month1 = "0" + month1;
			}
			var day1 = date.getDate();
			if(day1 < 10){
				day1 = "0" + day1;
			}
			var dateString1 =  year + "-" + month1 + "-" + day1;
	   
		// state_id:sessionStorage.stateID;
	     $scope.Financical_year=$scope.Financical_year;
	     $scope.AllocatedBudget_state=$scope.AllocatedBudget_state;
	     $scope.form_Q1_details=$scope.form_Q1_details;
	     $scope.Amount=$scope.Amount;
	     $scope.release_date=dateString1;
	     $scope.Remarks_state=$scope.Remarks_state;
	     $scope.Releasedby=$scope.Releasedby;
	     
	   //alert("state_budget_master_id   "+sessionStorage.state_budget_master_id+"  sessionStorage.quarter_no "+sessionStorage.quarter_no);
	     
	     if(sessionStorage.quarter_no== "Q0"){
	    	 var Indata2 = { 
		    		 
	 	    		dhc_id:$scope.District_id2[1],
	 	    		shc_id:1,
	 	    		total_amount_budgeted:$scope.AllocatedBudget_state,
	 	    		financial_year:$scope.Financical_year,
	 	     };
	 	     
	 	     var myJSON2 = JSON.stringify(Indata2);
	 	     console.log(myJSON2);
	 	    
	 	     //statemasterTable Entry.   
	 	    	    

	 	    if($scope.Amount){
	 	    	
	 	   
	 	     $http({
	 	         url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + $scope.hospitalFinal + "/shcBudget/masterData",
	 	         method: "POST",
	 	         data: myJSON2,
	 	         contentType: "application/json",
	 	         dataType: "json",
	 	         //contentType:"application/x-www-form-urlencoded"
	 	     }).then(function(response) {
	 	    	 
	 	    	 $http({
	 	 			url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + $scope.hospitalFinal + "/shcBudget/masterDataMaxid",
	 	 			method: "GET",
	 	 			dataType: "text",
	 	 		}).then(function(response) {
	 	 			////alert(response.status);
	 	 			alert(response.data);
	 	 			
	 	 			sessionStorage.state_budget_master_id=response.data;
	 	 		}, function errorCallback(response) {
	 		        // console.log(form_submitted_status);
	 		     });
	 	    	 
	 	     }, function errorCallback(response) {
	 	        // console.log(form_submitted_status);
	 	     });
	    	 
	    	
	    	// //alert(sessionStorage.state_budget_master_id);
	    	 ////alert($scope.state_budget_master_id);
	 	     
	 	    var a = Number(sessionStorage.state_budget_master_id || 0);
	 	    alert("shc_id is here "+a);
         // //  var b = 1;
	 	    	var c=a+1;	
	 	    	alert("shc_id is hereC "+c);
	    	var date =new Date($scope.release_date); 
		   	var year = date.getFullYear();
		   	 var month1 = date.getMonth() + 1;
				if(month1 < 10){
					month1 = "0" + month1;
				}
				var day1 = date.getDate();
				if(day1 < 10){
					day1 = "0" + day1;
				}
				var dateString =  year + "-" + month1 + "-" + day1;
	    	 
        	var Indata1 = { 
   	    		 state_budget_master_id:c,
   	    		 quarter_no:'Q1',
   	    		 quarter_amount:$scope.Amount,
   	    		 amount_release_date:dateString,
   	    		 remarks:$scope.Remarks_state,
   	    		 released_by:$scope.Releasedby,
   	    		 flag_status:1,			 
   		 }; 
        	
	 	   }else{
				
			alert("please enter Q1 details");
			return false;
		}
        	//alert(Indata1);
	     }else if(sessionStorage.quarter_no== "Q1"){
	    	 
	    	 
	    	 var date =new Date($scope.release_date_Q2); 
			   	var year = date.getFullYear();
		   	 var month1 = date.getMonth() + 1;
				if(month1 < 10){
					month1 = "0" + month1;
				}
				var day1 = date.getDate();
				if(day1 < 10){
					day1 = "0" + day1;
				}
				var dateString2 =  year + "-" + month1 + "-" + day1;
	    	 
	    	 var Indata1 = { 
		    		 state_budget_master_id:sessionStorage.state_budget_master_id,
		    		 quarter_no:'Q2',
		    		 quarter_amount:$scope.Amount_Q2,
		    		 amount_release_date:dateString2,
		    		 remarks:$scope.Remarks_state_Q2,
		    		 released_by:$scope.Releasedby_Q2,
		    		 flag_status:1,

					 
			 };
	    	 
	     }else if(sessionStorage.quarter_no== "Q2"){
	    	 
	    	 var date =new Date($scope.release_date_Q3); 
			   	var year = date.getFullYear();
		   	 var month1 = date.getMonth() + 1;
				if(month1 < 10){
					month1 = "0" + month1;
				}
				var day1 = date.getDate();
				if(day1 < 10){
					day1 = "0" + day1;
				}
				var dateString3 =  year + "-" + month1 + "-" + day1;
	    	 
	    	 var Indata1 = { 
		    		 state_budget_master_id:sessionStorage.state_budget_master_id,
		    		 quarter_no:'Q3',
		    		 quarter_amount:$scope.Amount_Q3,
		    		 amount_release_date:dateString3,
		    		 remarks:$scope.Remarks_state_Q3,
		    		 released_by:$scope.Releasedby_Q3,
		    		 flag_status:1,

					 
			 };
	     }else if(sessionStorage.quarter_no== "Q3"){
	    	 
	    	 var date =new Date($scope.release_date_Q4); 
			   	var year = date.getFullYear();
		   	 var month1 = date.getMonth() + 1;
				if(month1 < 10){
					month1 = "0" + month1;
				}
				var day1 = date.getDate();
				if(day1 < 10){
					day1 = "0" + day1;
				}
				var dateString4 =  year + "-" + month1 + "-" + day1;
	    	 var Indata1 = { 
		    		 state_budget_master_id:sessionStorage.state_budget_master_id,
		    		 quarter_no:'Q4',
		    		 quarter_amount:$scope.Amount_Q4,
		    		 amount_release_date:dateString4,
		    		 remarks:$scope.Remarks_state_Q4,
		    		 released_by:$scope.Releasedby_Q4,
		    		 flag_status:1,

					 
			 };
	    	 
	     }
	        
		
	     var myJSON = JSON.stringify(Indata1);
	   //  alert("this data perfectone ");
	     alert(myJSON);
	     $http({
	         url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/shcBudget",
	         method: "POST",
	         data: myJSON,
	         contentType: "application/json",
	         dataType: "json",
	         //contentType:"application/x-www-form-urlencoded"
	     }).then(function(response) {
	    	 
	    	 alert("hospitalid  "+$scope.District_id+" hospitalid  "+$scope.Financical_year);
	    	 
	    	$scope.changeMasterData($scope.Financical_year,$scope.District_id);
	    	 
	     }, function errorCallback(response) {
	        // console.log(form_submitted_status);
	    	 alert("error");
	     });
		}
	
});
	
	



//BudgetDashboardController
//depending upon the login (state or district) appropriate dashboard will be loaded for the user

app.controller("BudgetDashboardController", function($scope, $http, $rootScope) {
	
	//alert("yes its working");
    $rootScope.doctorName = sessionStorage.Admname;
	$rootScope.doctorType1 = sessionStorage.FacilityType;

	//alert($rootScope.doctorName);
	//alert("chut" + $rootScope.doctorType1);
	$rootScope.urlName = 'http://localhost:8080/';
    $rootScope.projectName = 'labtracker';
    $scope.form_ReportingYear = sessionStorage.ReportingYear;

    $scope.yearCount = function() {
        var input = [];
        for (i = $scope.form_ReportingYear; i > 1997; i--) {
            input.push(i);
        }
        return input;
        
        //alert("input" +  input);
    }

    
    $scope.changemonth = function(year){
    	
    	//alert("making a changemonth ");
    	//make a http GET request
    	$http({
    		url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/budget/district?year=" + year,
    		method: "GET",
    		dataType: "json",
    		
    	}).then(function(response){
    		//alert("everyting is fine :)");
    		
    	}, function errorCallBack(response){
    		//alert("sonething is wrong :(");
    	})
    	
    }
    
	
//    dashboard logic for the district 
    var year = $scope.form_ReportingYear;
    
    angular.element(document).ready(function(){
		//this describes the logic for the dashboard when the page appears for the first time
		//GET request is made to the state-budget-expense table 
    	
		$http({
			url: $rootScope.urlName + $rootScope.projectName + "/api/hospitals/" + sessionStorage.hospitalID + "/budget/district?year=" + year,
			method: "GET",
			dataType: "json",
			
		}).then(function(response){
			//alert("everything is good :)");
		}, function errorCallBack(response){
			//alert("something is wrong :(");
		})
	});
	
    

	
});









