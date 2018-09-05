var taobao, model;
apiready = function() {
	taobao = api.require('taobao');
	model = api.require('model');
}
function login() {
	api.showProgress({
		style : 'default',
		animationType : 'fade',
		title : '努力加载中...',
		text : '先喝杯茶...',
		modal : false
	});

	var name = $api.byId('username').value;
	if (name == "") {
		$api.byId('username').focus();
	}
	var pwd = $api.byId('password').value;
	if (pwd == "") {
		$api.byId('password').focus();
	}

	var loginUlr = '/user/login';
	var bodyParam = {
		username : name,
		password : pwd
	}
	ajaxRequest(loginUlr, 'post', JSON.stringify(bodyParam), function(ret, err) {
		$api.setStorage('uid', ret.userId);
		$api.setStorage('token', ret.id);
		api.hideProgress();
		if (ret) {
			api.toast({
				msg : '登录成功',
				location : 'middile'
			});
			model.config({
				appKey : 'C0DF9412-536D-7A7B-05CF-56813C7AD0EF'
			});
			model.findById({
				class : 'user',
				id : ret.userId
			}, function(ret, err) {
				//存储一下本地数据
				$api.setStorage('uid', ret.id);
				// 数据库id
				$api.setStorage('username', ret.username);
				$api.setStorage('mobile', ret.mobile);
				$api.setStorage('age', ret.age);
				$api.setStorage('email', ret.email);
				$api.setStorage('url', ret.url);
				$api.setStorage('createdAt', ret.createdAt);
				// 优化本地数据，简单加密
				_setPrefs(window.userKey, ret, function() {
					// 存储用户信息到本地存储中
					_setStorage(window.userKey + "h5", ret);
				});
				api.hideProgress();
				setTimeout(function() {
					api.openWin({
						name : 'index',
						url : '../../index.html',
						opaque : true,
						vScrollBarEnabled : false
					});
				}, 100);
			})
		} else {
			api.alert({
				msg : err.msg
			});
		}
		api.hideProgress();
	})
}

function register() {
	api.openWin({
		name : 'register',
		url : 'register.html',
		opaque : true,
		vScrollBarEnabled : false
	});
}