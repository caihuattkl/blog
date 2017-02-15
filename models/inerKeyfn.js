exports.insertWord=function(wordsArr,str){
	var result = '';
	var arr = sliceStrRandom(str, getRandomIndex(str.length, wordsArr.length));
	arr.forEach(function(v) {
		result += v + (wordsArr.length ? wordsArr.shift() : "");
	});
	return result;
}

exports.wordSize=function(key,n){
	var tmp=[],i=0;
	while(i<n){
		i++;
		tmp.push('<strong>'+key+'</strong>')
	}
	return tmp;
}

function getRandomIndex(max, num) {
	var arr = [],
		n;
	if(num > max) {
		return false
	} else {
		while(arr.length < num) {
			n = parseInt(max * Math.random());
			if(n > 0 && n%parseInt((max-350)/num)==0 && arr.indexOf(n) === -1) {
				arr.push(n);
			}
		}
	}
	arr.sort(function(a, b) {
		return a - b;
	});
	return arr;
}

function sliceStrRandom(str, randomIndexArr) {

	randomIndexArr.unshift(0);
	randomIndexArr.push(str.length);
	var arr = [];
	randomIndexArr.sort(function(a, b) {
		arr.push(str.slice(a, b));
	})
	return arr;
}