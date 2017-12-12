var express = require('express');
var http = require("http");
var request = require('request');
var app = express();
var port = process.env.PORT||2016;
 
app.use(express.static('C:/Users/Administrator/Desktop/git/blog'));
 //__dirname

/*
 使用例子 proxy(app,'/hfutoj','http://***');
app是express中的app,route是本地api接口路径，remoteUrl是被代理的提供JSON数据的地址
*/
// function proxy(app,route,remoteDomain){
//     app.use(route,function(req,res){
//       var temp = req._parsedUrl.search?req._parsedUrl.search:req.url;
//       var url = remoteDomain+temp;
//       req.pipe(request(url)).pipe(res);
//     });
// }
 
// proxy(app,'/aaa/','http://finance.sina.com.cn/tougu/profitStar/newprofitStar.js?1212');
 
 
http.createServer(app).listen(port);