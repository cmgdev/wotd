var express = require('express');
var http = require('http');
var moment = require('moment');

var app = express();

app.get('/wotd/:year/:month', function(req, res){
	year = req.params.year;
	month = req.params.month;
	// the first day of last month
	lastCompleteMonth = moment().subtract('months', 1).date(1);
	requestedMonth = moment([year, month - 1]);
	
	if(requestedMonth.isBefore(lastCompleteMonth)){
		wotdPath = "http://dictionary.reference.com/wordoftheday/archive/" 
			+ req.params.year + "/" 
			+ req.params.month + "/";
	
		doHttpGet(wotdPath, res);
	}
	else{
		message = "You requested the words for " + requestedMonth.format('YYYY/MM') 
			+ ", but the latest date you can request is " + lastCompleteMonth.format('YYYY/MM')
			+ ". Please pick another date or try again on the first of next month.";
		res.send(message);
	}
});

var server = app.listen(3000, function(){
	console.log('Listening on port %d', server.address().port);
});

var doHttpGet = function(path, res){
	http.get(wotdPath, function(getRes) {
		console.log("Got response: " + getRes.statusCode);
		data = "";
		getRes.on('data', function(chunk){
			data += chunk;
		});
		getRes.on('end', function() {
			//console.log(data);
			res.send(data);
		});
	}).on('error', function(e) {
		errorMsg = "Got error: " + e.message;
		console.log(errorMsg);
		res.send(errorMsg);
	});
};