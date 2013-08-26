//将来的にxmlにパスワードとusernameを保存する
//他のwindowへのアクセス方法　Ti.App.scrollview.views[index]

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
	for(var i=0;i<4;i++){
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
			width:20,
		    height:20,
		});
		return button;
	};
	
		var homeButton = createImages("images/uniF489_.png",17);
		var listButton = createImages("images/list.png",17);
		var cameraButton = createImages("images/videocamera.png",153);
		var searchButton = createImages("images/search.png",285);
		
		//可視化用
		var buttonBar = Ti.UI.createView({
			width:"100%",
			height:"10%",
			bottom:0,
			backgroundColor:"#00a478",
			color:"#fff",
			textAlign:'center'
		});
	
		//buttonBar.add(homeButton);
		buttonBar.add(listButton);
		buttonBar.add(cameraButton);
		buttonBar.add(searchButton);

// Butttonによる　画面遷移　未実装
		Ti.App.createButton.addEventListener('singletap',function(e){
			//
		});
// 
		var homebuttonBar = Ti.UI.createView({
			width:"20%",
			height:"100%",
			top:0,
			left:0,
			image:"images/uniF489.png",
			bubbleParent:false
		});

		// homebuttonBar.add(homeButton);

	//上部ラベル
		var topLabel = Ti.UI.createLabel({//Label
			width:"100%",
			height:"10%",
			top:0,
			backgroundColor:"#00a478",
			text:"Time Line",
			font:{
				fontWeight: "normal", 
				fontSize: 25, 
				fontFamily: 'AppleGothic'
			},
			color:"#fff",
			textAlign:'center',
			bubbleParent:false
		});
	
		topLabel.add(homebuttonBar);
		homebuttonBar.add(homeButton);
		
		homebuttonBar.addEventListener('singletap',function(e){
			console.log("ok");
			//Ti.UI.ScrollableView. scrollToView(dummyWindow = [0]);
		});
		
		topLabel.addEventListener('singletap',function(e){
		});
		
	///////////////////////////////////////////////
	//Labelとscrollableview
		var topLabelNameArray = [];
			topLabelNameArray[0]= "Time Line";
			topLabelNameArray[1]= "Take Movie";
			topLabelNameArray[2]= "Best Vines";
			topLabelNameArray[3]= "Profile";
			
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
		
		require('lib/vineAPI').vinePopularTimeLine();
		
		// Ti.App.scrollview.views[0].add(require('UI/myTimeline').myTimeline());
		//test
		//require('UI/newLogin').newLogin();
		require('UI/myProfile').myProfile();
		 require('lib/vineAPI').myProfile();
		
		//require('lib/vineAPI').userData();
		
	});
	
	// Ti.App.addEventListener('userTimeLineComplete',function(e){
		// console.log("---------------------------------------");
		// console.log(e);
	// });
	
})();
