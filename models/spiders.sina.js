var spiders = require("../spiders/spiders.lib");
var tools = require("./tools")();
var read = require('../spiders/readability.lib');
var fs = require('fs');
var conf = require("./conf");

function spiderSina(req,response) {
	var tmpArr = [],
		newsArr;
	urlSource = 'http://roll.news.sina.com.cn/interface/rollnews_ch_out_interface.php?col=97&spec=&type=&ch=01&k=&offset_page=0&offset_num=0&num=300&asc=&page=1';
	spiders(urlSource, 'gb2312').then(res => {
		//获取新闻内容页所有url
		newsArr = res.match(/http\:\/\/[^<>\"]*?\.html|http\:\/\/[^<>\"]*?\.shtml/g);
		console.log("正在生成文章!请稍后(预计用时1分钟左右,视网络情况而定!完成后会有提示信息)...");

		if(fs.existsSync('markHtmlCore/content.txt')) {
			fs.unlinkSync('markHtmlCore/content.txt');
			for(var i = 1; i < newsArr.length; i++) {
				if(i < conf.newsItem) {
					tmpArr.push(read(newsArr[i]));
				}
			}
			Promise.all(tmpArr).then(res => {
				for(var i = 0; i < res.length; i++) {
					fs.writeFileSync('markHtmlCore/content.txt', res[i][1], {flag: 'a'}, 'utf8');}
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end(JSON.stringify({result:200,message:"文章生成完成!"}));
			console.log("抓取新浪文章完成!")
			}).catch(err => {
				throw new Error("生成文章源出错!" + err);
				response.writeHead(200, {'Content-Type': 'application/json'});
				response.end(JSON.stringify({result:500,message:err}));
			})
			return;
		}
		
		for(var i = 1; i < newsArr.length; i++) {
			if(i < conf.newsItem) {
				tmpArr.push(read(newsArr[i]));
			}
		}
		Promise.all(tmpArr).then(res => {
			for(var i = 0; i < res.length; i++) {
				fs.writeFileSync('markHtmlCore/content.txt', res[i][1], {flag: 'a'}, 'utf8');
			}
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end(JSON.stringify({result:200,message:"文章生成完成!"}));
			console.log("抓取新浪文章完成!")
		}).catch(err => {
			throw new Error("生成文章源出错!" + err);
			response.writeHead(200, {'Content-Type': 'application/json'});
			response.end(JSON.stringify({result:500,message:err}));
		});

	}).catch(err => {
		throw new Error("获取新闻列表网址错误！" + err);
		response.writeHead(200, {'Content-Type': 'application/json'});
		response.end(JSON.stringify({result:500,message:err}));
	})

}
module.exports = spiderSina;