var fs = require("fs"),
	newsTime = require('./newsTime'),
	toEn = require('./toPinyin'),
	travel = require('./travelDir'),
	asc = require('./ascSort'),
	dir = require('./conf'); //生成目录

//获取内容
function readFilesTpl(ArrKeywordsDetail) {
	//读取模板
	var tpl, data, html;
	tpl = fs.readFileSync('tpl.html').toString();
	data = fs.readFileSync("markHtmlCore/content.txt").toString();
	html = tpl.replace(/{{content}}/, data)
		.replace(/{{title}}/g, ArrKeywordsDetail)
		.replace(/{{keywords}}/g, ArrKeywordsDetail)
		.replace(/{{description}}/g, ArrKeywordsDetail) //description
		.replace(/{{time}}/g, newsTime); //time
	return html;
}

//生成内容页
function markContent() {

	if(!fs.existsSync(dir.markDir + '/' + dir.subDir)) {
		fs.mkdirSync(dir.markDir + '/' + dir.subDir);
	}
	//生成内容页core
	for(var i = 0; i < this.ArrKeywords.length; i++) {
		var buf = readFilesTpl(this.ArrKeywords[i]);
		fs.writeFileSync(dir.markDir + '/' + dir.subDir + '/' + toEn(this.ArrKeywords[i]) + (i + 1) + '.html', buf, 'utf8');
		//		console.log('生成' + this.ArrKeywords[i] + "成功!");
	}

	//获取内容索引页排序json
	var arr = [];
	travel(dir.markDir + '/' + dir.subDir, function(file) {
		//过滤索引页
		if(file.substr(dir.markDir.length+dir.subDir.length+2) == "index.html") return;
		//获取时间,排序
		var obj = {};
		obj.url = file;
		obj.time = fs.readFileSync(file).toString().match(/[\d]{0,4}-[\d]{0,2}-[\d]{0,2}\s+[\d]{0,2}:[\d]{0,2}/g)[0];
		obj.title = /<title>(.+?)(?:-|\|\S|\s).+?<\/title>/gi.exec(fs.readFileSync(file).toString())[1];
		arr.push(obj)
	});
	
	//json排序 输出
	var index = fs.readFileSync("list.html").toString(),strNewsList='',strNewsData;
	arr.sort(asc).forEach(function(v,i){
		strNewsList+='<li>' + '<a href="' + v.url.substr(dir.markDir.length+1)+ '">' + v.title + '</a> ' + v.time.split(/\d{4}-/)[1] + '</li>'+'\n';
		//去掉末尾换行
		if(arr.length-1==i){
			strNewsList=strNewsList.replace(/\n$/,'')
		}
	})
	strNewsData=index.replace(/{{list}}/g, strNewsList); //newsList
	fs.writeFileSync(dir.markDir + '/index.html', strNewsData, 'utf8');
	console.log("生成完成!")
	
	
}


module.exports = function(ArrKeywords) {
	this.ArrKeywords = ArrKeywords || [];
	var p = Math.floor(Math.random() * (12 - 4) + 4) //随机段落

	//判断目录是否存在
	if(!fs.existsSync(dir.markDir)) {
		//生成内容页
		fs.mkdirSync(dir.markDir);
		markContent();
	} else {
		//删除
		removeDir(dir.markDir);
		//新建
		fs.mkdirSync(dir.markDir);
		markContent();
	}
}

//递归删除文件夹
function removeDir(path) {
	var files = [];
	if(fs.existsSync(path)) {
		files = fs.readdirSync(path);
		files.forEach(function(file, index) {
			var curPath = path + "/" + file;
			if(fs.statSync(curPath).isDirectory()) { // recurse
				removeDir(curPath);
			} else { // delete file
				fs.unlinkSync(curPath);
			}
		});
		fs.rmdirSync(path);
	}
}