'use strict';

var totalResolved = {};


// check if _config.js is there
if (typeof client === 'undefined') {
  console.log('please add _config');
}


// here Starts the keen Stuff
Keen.ready(function(){


  // get total number of npm requests
  var totalNpm = new Keen.Query("count", {
    eventCollection: "resolved",
    filters: [{"operator":"eq","property_name":"registry","property_value":"npm"}],
    targetProperty: "registry",
    timeframe: "this_2_years",
    timezone: "UTC"
  });

  client.run(totalNpm, function(error, response){
    if (error) {
      $('#totalNpm').html('<small>not resolved</small>');
    }
    else {
      $('#totalNpm').html(response.result);
      totalResolved['npm'] = response.result;
    }
  });

  // get total number of bower requests
  var totalBower = new Keen.Query("count", {
    eventCollection: "resolved",
    filters: [{"operator":"eq","property_name":"registry","property_value":"bower"}],
    targetProperty: "registry",
    timeframe: "this_2_years",
    timezone: "UTC"
  });

  client.run(totalBower, function(error, response){
    if (error) {
      $('#totalBower').html('<small>not resolved</small>');
    }
    else {
      $('#totalBower').html(response.result);
      totalResolved['npm'] = response.result;
    }
  });

  // get total number of composer requests
  var totalComposer = new Keen.Query("count", {
    eventCollection: "resolved",
    filters: [{"operator":"eq","property_name":"registry","property_value":"composer"}],
    targetProperty: "registry",
    timeframe: "this_2_years",
    timezone: "UTC"
  });

  client.run(totalComposer, function(error, response){
    if (error) {
      $('#totalComposer').html('<small>not resolved</small>');
    }
    else {
      $('#totalComposer').html(response.result);
      totalResolved['composer'] = response.result;
    }
  });


  // get total number of total requests
  // this could be added via the totalResolved array.
  var totalRequests = new Keen.Query("count", {
    eventCollection: "resolved",
    timeframe: "this_14_weeks",
    timezone: "UTC"
  });

  client.run(totalRequests, function(error, response){
    if (error) {
      $('#totalRequests').html('<small>not resolved</small>');
    }
    else {
      $('#totalRequests').html(response.result);
      totalResolved['total'] = response.result;
    }
  });


});
