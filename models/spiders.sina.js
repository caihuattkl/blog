var spiders = require("../spiders/spiders.lib");
var tools = require("./tools")();
var read = require('../spiders/readability.lib');
var fs = require('fs');
var read2 = require('node-readability');

function spiderSina() {
	var tmpArr = [],newsArr;urlSource = 'http://roll.news.sina.com.cn/interface/rollnews_ch_out_interface.php?col=97&spec=&type=&ch=01&k=&offset_page=0&offset_num=0&num=300&asc=&page=1';
	spiders(urlSource, 'gb2312').then(res => {
		//获取新闻内容页所有url
		newsArr = res.match(/http\:\/\/[^<>\"]*?\.html|http\:\/\/[^<>\"]*?\.shtml/g);
		
		for(var i=1;i<newsArr.length;i++){
			if(i<10){
				tmpArr.push(read(newsArr[i]));
			}
		}
		Promise.all(tmpArr).then(res=>{
			console.log(res[1])
		})
		
	}).catch(err => {
		throw new Error("获取新闻列表网址错误！" + err);
	})

}
module.exports = spiderSina;