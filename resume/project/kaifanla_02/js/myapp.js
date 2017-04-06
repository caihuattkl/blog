var app = angular.module('App', [])
Mock.mockjax(app);
var MainData=null;
app.controller('parentCtrl', function($scope, $timeout) {

	angular.element(document).on('pagecreate', function(event) {
		var target = event.target;
		var scope = angular.element(target).scope();
		angular.element(target).injector().invoke(function($compile) {
			$compile(angular.element(target))(scope);
			$scope.$digest();
		});
	});
	//自动加载进入欢迎页
	$timeout(function() {
		$.mobile.changePage('tpl/greet.html', { transition: 'slide' })
	}, 0);

})

app.controller('greetCtrl', function($scope, $timeout) {

	//自动加载进入主页
	$timeout(function() {
		$.mobile.changePage('main.html', { transition: 'slide' })
	}, 3000);

})

app.controller('mainCtrl', ['$scope', '$http', function(s, h) {
		
	h.get('http://fix').success(function(data) {
		
			var list=data.list.slice(0, 5);
			s.dishlist = list
			MainData=data.list;
			s.dishData = data.list;
		});

	//制作加载更多数据按钮
	s.hasMore = true;
	s.loadMore = function() {
		
		if(s.dishData.length > 5) {
			s.hasMore = false;
		}

		s.dishlist = s.dishData
	}
	//当搜索关键字发生改变，则立即向服务器发起请求
	s.$watch('kw', function() {
		if(s.kw) {
			alert("您输入了关键词：" + s.kw);
			console.log("您输入了关键词：" + s.kw)
		}
	});

	s.jump2Detail = function(did) {
		//把要查询菜品编号保存本地存储，跳转到菜品详情页
		sessionStorage.setItem('did', did);
		$.mobile.changePage('detail.html', { transition: 'flip' })
	}

}])

app.controller('detailCtrl', ['$scope', '$http', function(s, h) {
	var did = parseInt(sessionStorage.getItem('did'))-1;
	s.dish = MainData[did];

}])
app.controller('orderCtrl', ['$scope', '$http', function(s, h) {

	var did = sessionStorage.getItem('did');
	s.orderStatus = false;
	/*定义表单初始数据,不重复填写*/
	s.order = { 'did': did };
	s.order.user_name = '程向阳';
	s.order.sex = '1';
	s.order.phone = '13512345678';
	s.order.addr = '长寿路华盛达大厦58号';
	s.order.pid = new Date().getTime(); //获取时间戳,用于订单编号
	s.Kforder = function() {
		var result = jQuery.param(s.order)
		alert("功能开发中..")
//		h.post('../data/order_add.php', result).success(function(data) {
//			if(data.status == 200) {
//				s.orderStatus = true;
//				//sessionStorage.getItem('pid',s.order.pid);
//				console.log(s.order.pid);
//			} else {
//				s.orderStatus = false;
//			}
//		})
	}
}])

app.controller('myorderCtrl', ['$scope', '$http', function(s, h) {
	var phoneID = '13512345678';


}])

app.controller('loginCtrl', ['$scope', '$http', function(s, h) {
	s.login=function(){
		alert("功能开发中...")
	}
}])
app.run(['$http', function(h) {
	h.defaults.headers.post = { 'Content-Type': 'application/x-www-form-urlencoded' };
}]);