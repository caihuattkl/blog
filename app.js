var fs = require("fs"),
	http = require("http"),
	_url = require('url'),
	writeFiles = require('./models/markHtml'),
	travel = require('./models/travelDir'),
	getKey=require('./models/setKeywords'),
	dir = require('./models/conf'),
	iconv = require('iconv-lite'),
	path = require('path');
	
http.createServer(function(req, res) {
	var _url = req.url == '/' || req.url == '/favicon.ico' ||req.url=='/spidersSina'|| req.url == '/start' ? req.url : req.url;
	_url = _url || '404';
	console.log(_url)
	switch(_url) {
		case '' || '/':
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end(fs.readFileSync(__dirname + '/index.html'))
			res.end('<a href="/spidersSina">抓取新浪新闻做内容源</a><br/><a href="/start">开始生成</a><br/>');
			break;
		case '/favicon.ico':
			return;
			break;
		case '/start':
			//检查文件夹
			if(dir.markDir == 'markHtmlCore' || dir.markDir == 'models') {
				res.writeHead(200, {'Content-type': 'text/html'});
				return res.end('<script>alert("目录设置有问题,不能与已有目录冲突!请在model/conf.js中修改目录名称");history.go(-1)</script>')
			}
			
			//开始生成
			writeFiles(getKey(fs))
				//返回页面给前台
			res.writeHead(200, {
				'Content-type': 'text/html'
			});
			res.end('<h2 style="color:green">生成成功!</h2><br/><a href="/' +dir.markDir+'/'+dir.subDir + '/index.html' + '">点击查看生成文章</a>');
			break;
		case '/spidersSina':
			require('./models/spiders.sina')(req,res);
			break;
		case '/' + dir.markDir + '/index.html':
			res.writeHead(200, {'Content-type': 'text/html'});
			res.end(fs.readFileSync(dir.markDir + '/index.html'));
			break;
		case _url:
			var talg;
			travel(dir.markDir + '/' + dir.subDir, function(file) {
				if(file.substr(dir.markDir.length + dir.subDir.length + 2) == _url.substr(dir.markDir.length + dir.subDir.length + 3)) {
					talg = file;
				}
			});
			if(talg) {
				res.writeHead(200, {'Content-type': 'text/html'});
				res.end(fs.readFileSync(talg));
			} else {
				res.writeHead(200, {
					'Content-type': 'text/html'
				});
				res.end("404");
			}

			break;
		default:
			res.writeHead(200, {
				'Content-type': 'text/html'
			});
			res.end(404);
			break;
	}

}).listen(3356, '127.0.0.1');
console.log("Server running")