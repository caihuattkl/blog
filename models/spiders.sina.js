var spiders = require("../spiders/spiders.lib");
var tools = require("./tools")();
var read = require('../spiders/readability.lib');
var fs=require('fs');

function spiderSina() {
	var tmpArr = [],newsList;
	urlList = 'http://roll.news.sina.com.cn/interface/rollnews_ch_out_interface.php?col=97&spec=&type=&ch=01&k=&offset_page=0&offset_num=0&num=300&asc=&page=1';

	spiders(urlList, 'gb2312').then(res => {
		//获取新闻所有url
		newsList = res.match(/http\:\/\/[^<>\"]*?\.html|http\:\/\/[^<>\"]*?\.shtml/g);
		var c1;
		//进去每条新闻内容页
		for(var i = 0; i < newsList.length; i++) {
			if(i <100) {
				read(newsList[i]).then(res=>{
					//开始写入文件 "\n当前是第"+res[0]+"记录: \n"+
				fs.writeFileSync('markHtmlCore/3.txt', res[1], {flag: 'a'},'utf8');
				});
			}
		}
		console.log("写入文章内容完成!")
		
	}).catch(err => {
		throw new Error("获取新闻列表网址错误!" + err);
	})

}
module.exports = spiderSina;