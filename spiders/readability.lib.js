var read = require('node-readability');
var tools = require('../models/tools')();

function readability(url) {
	return new Promise((resolve, reject) => {
		read(url, function(err, article, meta) {
					if(err)reject(err);
					resolve([url,article.content.replace(/<script[^>]*>[\s\S]*?<\/script>|<style[^>]*>[\s\S]*?<\/style>|<!.*?>|<\w*\s?[^>]*>/g, '').split(/\r?\n/g).notempty().trimArr().trimArr().join('\n')])
					article.close();
				})
	})
}

module.exports= readability;