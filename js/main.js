'use strict';

// config variables
var totallistSize = 10;

// create some variables here
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

  client.run(totalNpm, function(err, response){
    if (err) {
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

  client.run(totalBower, function(err, response){
    if (err) {
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

  client.run(totalComposer, function(err, response){
    if (err) {
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

  client.run(totalRequests, function(err, response){
    if (err) {
      $('#totalRequests').html('<small>not resolved</small>');
    }
    else {
      $('#totalRequests').html(response.result);
      totalResolved['total'] = response.result;
    }
  });

  // this is the big chart
  var linePackages = new Keen.Query("count", {
    eventCollection: "resolved",
    groupBy: "registry",
    interval: "hourly",
    timeframe: "this_7_days",
    timezone: "UTC"
  });

  client.draw(linePackages, document.getElementById('linePackages'),{
    chartType: "linechart",
    height: '200'
  });

  // top 10 all
  var query = new Keen.Query("count", {
    eventCollection: "resolved",
    filters: [{"operator":"eq","property_name":"registry","property_value":"npm"}],
    groupBy: "package",
    targetProperty: "package",
    timeframe: "this_2_years",
    timezone: "UTC"
  });

  client.run(query, function(err, response){
    if (err) {
      console.log('err');
    }
    else {
      let sortedList = _.sortBy(response.result, 'result');
      sortedList = sortedList.reverse();
      sortedList = _.first(sortedList, totallistSize);


      var listTemplate = _.template($('#listTemplate').html() );
      $('#topAllTable').append(listTemplate({ sortedList: sortedList}) );

      $('#listTemplate');
      $('#topAllTable'). _.template(sortedList);
    }
  });


});
