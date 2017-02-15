var spiders = require("../spiders/spiders.lib");
var tools = require("./tools")();

function spiderSina() {
	var tmpArr = [],
		newsList;
	urlList = 'http://roll.news.sina.com.cn/interface/rollnews_ch_out_interface.php?col=89&spec=&type=&ch=01&k=&offset_page=0&offset_num=0&num=500&asc=&page=3&r=0.1432774625452149';

	spiders(urlList, 'gb2312').then(res => {
		//获取新闻所有url
		newsList = res.match(/http\:\/\/[^<>\"]*?\.html|http\:\/\/[^<>\"]*?\.shtml/g);

		//进去每条新闻内容页
		for(var i = 0; i < newsList.length; i++) {
			if(i == 0 || i == 1) {
				spiders(newsList[i], 'utf-8').then(data => {
					console.log("数据开始了: " + data.replace(/<\/?[^>]*>/g, ''))
				})
			}

		}
	}).catch(err=>{
		throw new Error("获取新闻列表网址错误!"+err);
	})
		
	

}
module.exports = spiderSina;