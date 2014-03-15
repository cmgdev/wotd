var express = require('express');
var http = require('http');
var app = express();

app.get('/wotd/:year/:month', function(req, res){
	wotdPath = "http://dictionary.reference.com/wordoftheday/archive/" 
		+ req.params.year + "/" 
		+ req.params.month + "/";
	
	data = "";
	http.get(wotdPath, function(getRes) {
		console.log("Got response: " + getRes.statusCode);
		getRes.on('data', function(chunk){
			data += chunk;
		});
		getRes.on('end', function() {
			console.log('end');
		});
	}).on('error', function(e) {
		console.log("Got error: " + e.message);
	});
	console.log('Data is :' + data);
	res.send('Hello World');
});

var server = app.listen(3000, function(){
	console.log('Listening on port %d', server.address().port);
});