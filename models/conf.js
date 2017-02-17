/*
 注意:
 1.请保证模版文件的是utf-8编码
 2.模版文件文件格式是uft8编码
 * */

module.exports = {
	markDir:"markHtml", //要生成的目录,目录会生成在当前根目录
	subDir:"bocai", //装内容页的目录
	relReadItem:"5",
	keyItem:"5",//每篇文章插入主关键词的数量
	newsItem:100,//抓取用于作为源文件的新闻数量.最好不好大于100 否则生成速度会受影响
	tpl:'tpl_gbk.html'//如果网页编码是gb2312 请替换此模板文件.utf-8则替换tpl.html
}