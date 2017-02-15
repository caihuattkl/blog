module.exports = function() {
	//去掉空字符
	Array.prototype.notempty = function() {
		return this.filter(t => t != '' && t !== null && new RegExp("[0-9A-Za-z\u4e00-\u9fa5]+").test(t));
	}

	//数组去重1
	Array.prototype.reRepeat = function() {
		var res = [],
			obj = {};
		for(var i = 0; i < this.length; i++) {
			if(!obj[this[i]]) res.push(this[i]);
			obj[this[i]] = 1;
		}
		return res;
	}

	//数组方法2
	Array.prototype._reRepeat = function() {
		var result = [],temp;
		while(this.length > 0) {
			temp = this.shift();
			if(result.indexOf(temp) < 0) result.push(temp);
		}
		return result;
	}

	//去掉数组中前后多余空白字符
	Array.prototype.trimArr = function() {
		var tmp=this.slice();
		tmp.forEach(function(v, i) {
			if(new RegExp(/&nbsp;|\s/g).test(v)) {
				tmp.splice(i, 1, v.replace(/&nbsp;|\s/g,''))
			}
			
			if(new RegExp(/(^[—|，|,|.|。|\s]*)|(\s*$)/g).test(v)) {
				tmp.splice(i, 1, v.replace(/(^[—|，|,|.|。|\s]*)|(\s*$)/g, ''))
			}
			
			if(new RegExp(/新浪(财经)?|（记者.+?）|\(记者.+?\)/g).test(v)) {
				tmp.splice(i, 1, v.replace(/新浪(财经)?|（记者.+?）|\(记者.+?\)/g,''))
			}
			if(new RegExp(/^.+?讯|^.+?电/g).test(v.substr(0,20))) {
				tmp.splice(i, 1, v.replace(/^.+?讯|^.+?电/g,''))
			}
			
			 if(new RegExp(/记者|责任编辑|责编|欢迎大家私信我们|戳此链接报名|&nbsp;/g).test(v)&&v.length<30 || new RegExp(/基金经理老鼠仓|说好保本变巨亏|监控涨停股|实时翻看机构底牌/g).test(v) || v.length<15){
				tmp.splice(i, 1, '')
			}
			 
			
		})
		return tmp.notempty();
	}
}