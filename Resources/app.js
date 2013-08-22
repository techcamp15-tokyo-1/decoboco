//将来的にxmlにパスワードとusernameを保存する

(function(){
	
	// var b = require('com.HjAboutHiroppy.VineCamera');
	// var v = b.createView();
	// console.log(v);
	
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
		// left:"10%",
		top:"10%",
		width:"100%",
		height:"80%",
		// left:"20%",
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		views:dummyWindow,
		// showPagingControl: true,
        // pagingControlHeight: 30,
	});
	
	  win_base.add(Ti.App.scrollview);
	
	
	//Button の　追加
	createImages = function(image,size){
		var button = Ti.UI.createButton({
			color : "#ffffff",
			backgroundImage : image,
			left:size,
			width:"20px",
		    height:"20px",
		});
		return button;
	};
	
		var listButton = createImages("images/list.png",17);
		var cameraButton = createImages("images/videocamera.png",153);
		var searchButton = createImages("images/search.png",285);
		
		//可視化用
		var buttonBar = Ti.UI.createView({
			width:"100%",
			height:"10%",
			bottom:0,
			backgroundColor:"#00ccff",
			color:"#fff",
			textAlign:'center'
		});
	
		buttonBar.add(listButton);
		buttonBar.add(cameraButton);
		buttonBar.add(searchButton);

// Butttonによる　画面遷移　未実装
		Ti.App.createButton.addEventListener('singletap',function(e){
			
			//

		});


	//上部ラベル
		var topLabel = Ti.UI.createLabel({
			width:"100%",
			height:"10%",
			top:0,
			backgroundColor:"#00ccff",
			text:'TL',
			color:"#fff",
			textAlign:'center'
		});
	
	///////////////////////////////////////////////
	//Labelとscrollableview
		var topLabelNameArray = [];
			topLabelNameArray[0]= "TL";
			topLabelNameArray[1]= "TLTL";
			topLabelNameArray[2]= "TLTLTL";
		
		Ti.App.scrollview.addEventListener('scroll',function(e){
			if(e.currentPage != undefined){
				topLabel.text = topLabelNameArray[e.currentPage];	
			}
		});
		
	
	///////////////////////////////////////////////
	
// 	
		win_base.add(buttonBar);
	    win_base.add(topLabel);
	// require('lib/camera').camera();
	
	//これに入ったら各処理させる
	Ti.App.addEventListener('loginComplete',function(){
		console.log('login');
		require('UI/myTimeline').myTimeline();
		// scrollview.views[0].add(require('UI/myTimeline').myTimeline());
	});
	
})();
