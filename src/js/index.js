
var index_mask = document.getElementsByClassName("index_mask")[0];
var index_server = document.getElementsByClassName("index_server")[0];
consult.onclick = function(){
	index_mask.style.display = "block";
	index_server.style.animation = "show 0.7s";
}

index_X.onclick = function(){
	index_mask.style.display = "none";
	index_server.style.animation = "hide 1.2s";
}
var myshop = angular.module('shop',['ngRoute'])
		//路由和购物车模块
.constant('dataUrl','http://localhost:4321/')
.controller('productCtrl',['$scope','$http','dataUrl','$timeout','$interval',
function($scope,$http,dataUrl,$timeout,$interval){//定义一个控制器
	$scope.navArr = [
			{
				url:'#/home',
				text:'主 页',
				index:'1',
				clas:'indexBtn1-1 index_btn'
			},
			{
				url:'#/classes',
				text:'分 类',
				index:'2',
				clas:'indexBtn2'
			}
			,
			{
				url:'#/shopCar',
				text:'购物车',
				index:'3',
				clas:'indexBtn3'
			}
			,
			{
				url:'#/mine',
				text:'个人中心',
				index:'4',
				clas:'indexBtn4'
			}
		];
		$scope.changeClassName = function(obj){
			for(var i = 0;i < $scope.navArr.length;i++){
				$scope.navArr[i].clas = 'indexBtn' + $scope.navArr[i].index;
			}
			obj.clas = 'indexBtn' + obj.index + '-1 index_btn';
		}
	//超值秒杀数据
	$http.get(dataUrl+"seckill").then(function(datas){
		$scope.products = datas.data.SeckillWares;//第一个data是形参
	});
	//猜你喜欢数据
	$http.get(dataUrl+"like").then(function(datas){
		$scope.product1 = datas.data.Data;//第一个data是形参
	});
	$scope.bol1 = false;
	$timeout(function(){
		$scope.bol1=!$scope.bol1;
	},10);
    //轮播1
	$scope.swiper = new Swiper('#main1 .swiper-container', {
	    pagination: '.swiper-pagination',//小圆点
	    paginationClickable: true,//实现控制点击小点控制图片切换
	    speed:500,//平滑速度	   
	   	autoplay : 2500,//可选选项  自动轮播auto 
	    autoplayDisableOnInteraction: false,//实现点击切换后还会自动轮播(重启autoplay属性)
	    loop:true,  //循环
	    observer:true//更新swiper
	});
	//拖拽轮播
	$scope.swiper = new Swiper('#main3 .swiper-container', {
		slidesPerView: 3,//每页显示图片数
        paginationClickable: true,//实现控制点击小点控制图片切换
        spaceBetween: 30,//间隔
        observer:true,//更新swiper
        freeMode: true//free模式不会贴合
	});
	$interval(function(){
		var date = new Date();
		var hour = date.getHours();
		var min = date.getMinutes();
		var score = date.getSeconds();
		var xmin = 60-min;
		var xscore = 60-score;
		if(xmin<10){
			xmin = '0'+ xmin;
		}
		if(xscore<10){
			xscore = '0'+ xscore;
		}
		$scope.time="10" + ':' + xmin + ':' + xscore;
	},1000);
}])
.config(["$routeProvider","$locationProvider",function($routeProvider,$locationProvider){
	$locationProvider.html5Mode(false).hashPrefix('');	//解决1.6的路由地址冲突
	//在此进行路由
	$routeProvider
	.when("/",{
		templateUrl:"html/home.html"
	})
	.when('/home',{
		templateUrl:"html/home.html"
	})
	.when('/classes',{
		templateUrl:"html/classes.html"
	})
	.when('/shopCar',{
		templateUrl:"html/shopCar.html"
	})
	.when('/mine',{
		templateUrl:"html/mine.html"
	})
}]);
