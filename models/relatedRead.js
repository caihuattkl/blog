var fs = require("fs"),
dir = require('./conf'); //生成目录
module.exports = function(_arrRelRead) {

	var arrTemp;

	_arrRelRead.forEach(function(val, ind) {

		arrTemp = delArray(_arrRelRead,ind);
		
		var strRelReadData='';
		for(var i = 0; i < arrTemp.length&&i<dir.relReadItem; i++) { //.substr(dir.markDir.length+dir.subDir.length+2)
			strRelReadData += '<li><div class="rptitle"><a href="'+arrTemp[i].url+'" target="_blank">' + arrTemp[i].title + '</a></div>' +
				'<div class="rpdesc">'+arrTemp[i].description+'<a href="'+arrTemp[i].url+'" target="_blank" class="blue6">[详细]</a></div>' +
				'<div class="rpdate"><span class="sp1">'+arrTemp[i].time.replace(/([\d]+)-([\d]+)-(\d+)/,'$1年$2月$3日')+'</span><span class="sp2">'+arrTemp[i].title+'</span></div>' +
				'</li>';
		}
		
		tplrelRead = fs.readFileSync(val.url).toString().replace(/{{relRead}}/gi, strRelReadData);
		fs.writeFileSync(val.url, tplrelRead, 'utf8');
	})

}

//关联阅读列表数据.删除自己,自己不能在相关新闻中出现
function delArray(arr, ind) {
	var temp = arr.slice();
	temp.splice(ind, 1);
	return temp;
}