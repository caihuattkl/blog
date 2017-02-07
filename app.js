var fs = require("fs"),
	http = require("http"),
	_url = require('url'),
	toEn = require('./models/toPinyin'),
	newsTime = require('./models/newsTime'),
	iconv = require('iconv-lite'),
	path=require('path');

//获取内容
function readFilesTpl(ArrKeywordsDetail) {
	//读取模板
	var tpl, data, html;
	tpl = fs.readFileSync('tpl.html').toString();
	data = fs.readFileSync("markHtmlCore/content.txt").toString();
	//	tpl = fs.readFileSync("tpl.html", "utf-8");
	//	console.log(data)
	html = tpl.replace(/{{content}}/, data)
		.replace(/{{title}}/, ArrKeywordsDetail)
		.replace(/{{keywords}}/, ArrKeywordsDetail)
		.replace(/{{description}}/, ArrKeywordsDetail) //description
		.replace(/{{time}}/, newsTime); //description

	return html;
}

//获取关键词
function readFilesKey() {
	var data = fs.readFileSync("markHtmlCore/keywords.txt", "utf8");
	return data.split('\r\n');
}

//生成html
function writeFiles(ArrKeywords) {
	this.ArrKeywords = ArrKeywords || [];

	var p = Math.floor(Math.random() * (12 - 4) + 4) //随机段落

	for(var i = 0; i < this.ArrKeywords.length; i++) {
		var buf = readFilesTpl(this.ArrKeywords[i]);
		fs.writeFileSync('html/' + toEn(this.ArrKeywords[i]) + (i + 1) + '.html', buf, 'utf8');
		console.log('生成' + this.ArrKeywords[i] + "成功!");
	}
}


//	travel("html", function(pathName) {
//		var data=fs.readFileSync(pathName)
//		fs.writeFileSync(pathName,iconv.decode(new Buffer(data), 'utf8'), 'utf8');
//	})
//递归遍历目录
//function travel(dir, callback) {
//	fs.readdirSync(dir).forEach(function(file) {
//		var pathname = path.join(dir, file);
//
//		if(fs.statSync(pathname).isDirectory()) {
//			travel(pathname, callback);
//		} else {
//			callback(pathname);
//		}
//	});
//}

http.createServer(function(req, res) {
	console.log(req.url)
	writeFiles(readFilesKey())

}).listen(3356, '127.0.0.1');
console.log("Server running")