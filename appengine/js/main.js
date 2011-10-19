// Christian Johnson
// RCOS RPI Directory JavaScript

var delay = 60;
var padding = '20%';
var last_token = 1;
var cached_results = {};

function parseServerData(data){
	if (data.data !== [] && data.data.length > 0 && last_token == data.token){
	  AddResultsToTable(data)
  }
  // Undo the opacity
  $("#results").css("opacity", "1");
  // Cache the results
  cached_results[data.name] = data;
}

function parseCachedData(keyword){
  data = cached_results[keyword];
	if (data.data !== []){
	  AddResultsToTable(data);
  }
  // Undo the opacity
  $("#results").css("opacity", "1");
}

function AddResultsToTable(data){
  // Get rid of current results		
  $("#results").find("tbody").empty();
  
  // Loop through JSON
  $.each(data.data, function(i, person){
    var table_row = "<tr>";
    // Loop through each person and output their attributes
    //$.each(person, function(key, value){
	   //if (key in {'name':'', 'major':'','class':''}/* && value != undefined*/){
	   //  table_row += ("<td>" + value + "</td>");	
	   //}
    //});
    table_row += ("<td>" + person.name + "</td><td>" + (person.major == undefined ? 'N/A' : person.major) + "</td><td>" + (person.year == undefined ? 'N/A' : person.year) + "</td><td>" + (person.email == undefined ? 'N/A' : person.email) + "</td>");
    table_row += "</tr>";
    $("#results").find("tbody").append(table_row);
  });
  $("#results").trigger("update");
}

//Function to animate text box:
// Send true to animate it up, false to animate it down
function animate(flag){
  if (flag){
    $("#container").animate({
      marginTop: '0%'
    }, delay, function(){ $("#container").css("margin-top","0%"); });
  }else{
    $("#container").animate({
      marginTop: padding,
    }, delay * 1.3);
  }
}

$(document).ready(function() {
	$("#keyword").bindWithDelay("keyup", function(event) {
	    var keyword = $("#keyword").val();
  	  var margin = $("#container").css("margin-top");
	
  	  // Check for enter keypress
  	  if (event.which == 13) {
  	     event.preventDefault();
  	     return;
  	  }
	    
	    // If a non-blank entry
  	  if (keyword != ''){
  	    //Animate text box up
     	  if ( margin != "0%" || margin != "0px" ){
     	    animate(true);
     	  }
   	   
   	    // Cool idea, flickering for some reason though
   	    $("#results").css("opacity", ".25");
   	    last_token += 1;
   	    
   	    // Check cache
   	    if (cached_results[keyword]){
   	      parseCachedData(keyword);
   	      $("#output").text("Cached Keyword: " + keyword);
   	    }else{
   	      $.ajax({
  		      type: "GET",
  		      url: "/api?name=" + encodeURI(keyword) + "&token=" + last_token,
  		      async: true,
  		 	    dataType: "json",
  			    success: parseServerData
  		    }); 
   	    }
  		  $("#results").show();
  	  }else if (keyword == ''){ // Entry is blank
  	    $("#results").hide();
  	    // Animate box back down
  	    if ( margin == "0%" || margin == "0px"){
    		  animate(false);
  	    }
	    }
	  }, 100);
  
  //Make table sortable
  $("#results").tablesorter();
  
	//Focus on textbox
	$("#keyword").focus();
});