var tools = require("./tools")();
/*
 * 获取原始关键词,根据关键词生成文章
 * */


module.exports = function(fs) {
	var arrKeydata = fs.readFileSync("markHtmlCore/keywords.txt", "utf8").split('\r\n');
	//关键词去重
	return arrKeydata.reRepeat();
}


