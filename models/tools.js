module.exports = function() {
	//去掉空字符
	Array.prototype.notempty = function() {
		return this.filter(t => t != '' && t !== null);
	}

	//数组去重1
	Array.prototype.reRepeat = function() {
		var res = [],obj = {};
		for(var i = 0; i < this.length; i++) {
			if(!obj[this[i]]) res.push(this[i]);obj[this[i]] = 1;
		}
		return res;
	}

	//数组方法2
	Array.prototype._reRepeat = function() {
	var result = [], temp;
          while(this.length > 0) {
            temp = this.shift();
            if(result.indexOf(temp) < 0) result.push(temp);
          }
          return result;
	}
}