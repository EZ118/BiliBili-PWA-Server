const http = require('http');
const https = require("https"); 
const fs = require('fs');
var queryString = require("querystring");
const { resolve } = require('path');

function GetAjax(url, func) {
	https.get(url, function(rres2) {
		let html = '';
		rres2.on('data', function(data) { html += data; });
		rres2.on('end', function() { func(html); });
	});
}

http.createServer(function(req, res){
	
	var obj = null;
	var currentData = "";
	req.on("data",function(data){
		currentData += data;
		obj = queryString.parse(currentData);
	});


	var lurl = "";
	try{
		if(req.url == "/") lurl = "./index.html";
		else lurl = "." + req.url;
		webpage = fs.readFileSync(lurl, 'utf8');
		res.write(webpage);
		res.end();
	} catch (err) {
		console.error(err);
		console.log('url: ' + req.url);
		webpage = fs.readFileSync("./error.html", 'utf8');
		webpage = webpage.replace("(replaced)", err);
		
		if (req.url.split("/")[1] == 'api' && req.url.split("/")[2] != null && req.url.split("/")[2] != ""){}
		else {res.write(webpage);res.end();}
	}
	
	if(req.url.split("/")[1] == 'api'){
		if(req.url.split("/")[2] == 'recommend'){
			GetAjax("https://api.bilibili.com/x/web-interface/index/top/rcmd?fresh_type=3", function(hhh){
				webpage = hhh;
				res.writeHead(200,{'Content-Type' : 'application/json;charset=utf-8;'});
				res.write(webpage);
				res.end();
			});
		} else {
			
		}
	}
	
	
}).listen(8080);