var express = require('express');
var http = require('http');

var app = express();

app.get('/wotd/:year/:month', function(req, res){
	wotdPath = "http://dictionary.reference.com/wordoftheday/archive/" 
		+ req.params.year + "/" 
		+ req.params.month + "/";
	
	doHttpGet(wotdPath, res);
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
			console.log(data);
			res.send(data);
		});
	}).on('error', function(e) {
		errorMsg = "Got error: " + e.message;
		console.log(errorMsg);
		res.send(errorMsg);
	});
};