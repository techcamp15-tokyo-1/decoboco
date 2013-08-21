//将来的にxmlにパスワードとusernameを保存する

(function(){
	
	require('lib/vineAPI').vineLogin('dreams.come.true.about@gmail.com','about19920429');
	// require('lib/vineAPI').vineLogin('e.takumi.89@gmail.com','8Gatu9Ka');
	
	Ti.App.disableNetworkActivityIndicator = true; //ネットワークインジゲータを消す
	
	tab_group = Ti.UI.createTabGroup();
	
	//一番下のベースLayer
	var win_base = Ti.UI.createWindow({
		// backgroundImage: 'image/background.jpg',
		backgroundColor:"#eeeeee",
		navBarHidden: true,
		tabBarHidden: true,
		fullscreen : false,  
	});
	
	
	var tab = Ti.UI.createTab({ window: win_base });
	tab_group.addTab(tab);
	tab_group.open();
	
	var dummyWindow = [];
	
	//この個数は変動
	for(var i=0;i<3;i++){
		var w = Ti.UI.createWindow({
			width:"100%",
			height:Ti.UI.FILL,
			backgroundColor:"#ddd",
			borderColor:"#fff000"
		});
		dummyWindow.push(w);	
	}

	//スクロールビューの挿入
	Ti.App.scrollview = Ti.UI.createScrollableView({
		left:"20%",
		width:"80%",
		height:Ti.UI.FILL,
		views:dummyWindow,
		// showPagingControl: true,
        // pagingControlHeight: 30,
	});
	
	win_base.add(Ti.App.scrollview);
	
	
	//可視化用
	var buttonBar = Ti.UI.createLabel({
		width:"20%",
		height:Ti.UI.FILL,
		left:0,
		backgroundColor:"#000",
		text:'a',
		color:"#fff",
		textAlign:'center'
	});
	
	win_base.add(buttonBar);
	
	// require('lib/camera').camera();
	
	//これに入ったら各処理させる
	Ti.App.addEventListener('loginComplete',function(){
		console.log('login');
		require('UI/myTimeline').myTimeline();
		// scrollview.views[0].add(require('UI/myTimeline').myTimeline());
	});
	
})();
