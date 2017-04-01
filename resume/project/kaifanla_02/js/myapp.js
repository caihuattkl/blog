angular.module('App', ['ng']).controller('parentCtrl', function ($scope,$timeout) {

  angular.element(document).on('pagecreate', function (event) {
    var target = event.target;
    var scope = angular.element(target).scope();
    angular.element(target).injector().invoke(function ($compile) {
      $compile(angular.element(target))(scope);
      $scope.$digest();
    });
  });
  //自动加载进入欢迎页
  $timeout(function () {
    $.mobile.changePage('tpl/greet.html', {transition: 'slide'})
  }, 0);

}).controller('greetCtrl', function ($scope, $timeout) {

  //自动加载进入主页
  $timeout(function () {
    $.mobile.changePage('main.html', {transition: 'slide'})
  }, 0);

}).controller('mainCtrl',['$scope','$http',function(s,h){
  //$.getJSON("../data/dish_getbypage.php", function(data){
  //  s.dishlist=data;
  //  console.log(dishlist);

  h.get('../data/dish_getbypage.php').success(function (data) {
    console.log(data);
    s.dishlist = data;
  });

  //制作加载更多数据按钮!
  s.hasMore = true;
  s.loadMore = function () {
    h.get('../data/dish_getbypage.php?start=' + s.dishlist.length).success(function (data) {
      console.log(data);
      if (data.length < 5) {
        s.hasMore = false;
      }
      s.dishlist = s.dishlist.concat(data);
    });
  }
  //当搜索关键字发生改变，则立即向服务器发起请求
  s.$watch('kw', function () {
    if (s.kw) {  //若输入框内容不为空
      h.get('../data/dish_getbykw.php?kw=' + s.kw).success(function (data) {
        s.dishlist = data;
      });
    } else {
      h.get('../data/dish_getbypage.php').success(function (data) {
        s.dishlist = data;
      });
    }
  });

  s.jump2Detail = function(did){
    //把要查询菜品编号保存本地存储，跳转到菜品详情页
    sessionStorage.setItem('did', did);
    $.mobile.changePage('detail.html',{transition: 'flip'})
  }

}]).controller('detailCtrl',['$scope','$http',function (s,h) {
  var did = sessionStorage.getItem('did');
  h.get('../data/dish_getbyid.php?did='+did).success(function(data){
    s.dish = data[0];
    console.log(data);
  })

}]).controller('orderCtrl',['$scope','$http',function (s,h) {

    var did = sessionStorage.getItem('did');
  s.orderStatus=false;
  /*定义表单初始数据,不重复填写*/
  s.order={'did':did};
  s.order.user_name='程向阳';
  s.order.sex='1';
  s.order.phone='13512345678';
  s.order.addr='长寿路华盛达大厦58号';
  s.order.pid=new Date().getTime();//获取时间戳,用于订单编号
  s.Kforder=function(){
    var result=jQuery.param(s.order)
    h.post('../data/order_add.php',result).success(function(data){
        if(data.status==200){
          s.orderStatus=true;
          //sessionStorage.getItem('pid',s.order.pid);
          console.log(s.order.pid);
        }else{
          s.orderStatus=false;
        }
    })
  }
}]).controller('myorderCtrl',['$scope','$http',function (s,h) {
  var phoneID='13512345678';
  h.get('../data/order_getbyphone.php?phone='+phoneID).success(function(data){

    s.orderlist=data;

  })

}]).run(['$http',function(h){
  h.defaults.headers.post={'Content-Type':'application/x-www-form-urlencoded'};
}]);
