//将来的にxmlにパスワードとusernameを保存する
//他のwindowへのアクセス方法　Ti.App.scrollview.views[index]

(function(){
	Ti.App.disableNetworkActivityIndicator = true; //ネットワークインジゲータを消す
	///////////
	// var v = b.createView();
	// console.log(v);
	
	tab_group = Ti.UI.createTabGroup();
	
	//一番下のベースLayer
	Ti.App.win_base = Ti.UI.createWindow({
		// backgroundImage: 'image/background.jpg',
		backgroundColor:"#DED7CF",
		navBarHidden: true,
		tabBarHidden: true,
		fullscreen : false, 
	});
	
	
	var tab = Ti.UI.createTab({ window: Ti.App.win_base });
	tab_group.addTab(tab);
	tab_group.open();
	
		// Ti.App.Properties.removeProperty('username');
	    // Ti.App.Properties.removeProperty('password');
	    
	start();
	if(!Ti.App.Properties.hasProperty('username')){
		var signSelectView = require('UI/signSelect').signSelect();	
		Ti.App.win_base.add(signSelectView);
		Ti.App.win_base.loginSelectView = signSelectView;
	}
	else{
		// Ti.App.Properties.removeProperty('username');
	    // Ti.App.Properties.removeProperty('password');
		// console.log(Ti.App.Properties.getString('username'));
		require('lib/vineAPI').vineLogin(Ti.App.Properties.getString('username'),Ti.App.Properties.getString('password'));
	}
	
	function start(){
		var dummyWindow = [];
	    
	    //この個数は変動
	    for(var i=0;i<4;i++){
		    var w = Ti.UI.createWindow({
			    width:"100%",
			    height:Ti.UI.FILL,
			    backgroundColor:"#E8E5C8",
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
		    views:dummyWindow,
		    horizontalBounce:false,
		    cacheSize:6,
		    // showPagingControl: true,
            // pagingControlHeight: 30,
	    });
	    
	    Ti.App.win_base.add(Ti.App.scrollview);
	    
	    
	    
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
	    
	    var homeButton = createImages("images/home2.png",17);
	    var listButton = createImages("images/list.png",17);
	    var cameraButton = createImages("images/videocamera.png",153);
	    var searchButton = createImages("images/search.png",285);
	    
	    listButton.addEventListener('singletap',function(){
		    require('UI/leftList').list();	
	    });
	    
	    cameraButton.addEventListener('singletap',function(){
		    require('UI/post').postWindow();
	    });
	    
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

	    var homebuttonBar = Ti.UI.createView({
		    width:"20%",
		    height:"100%",
		    top:0,
		    left:0,
		    image:"images/home2.png",
		    bubbleParent:false
	    });
	    
	    homebuttonBar.addEventListener('singletap',function(){
		    Ti.App.scrollview.scrollToView(0);
	    });
	    

	    // homebuttonBar.add(homeButton);

	    //上部ラベル
	    var topLabel = Ti.UI.createLabel({//Label
		    width:"100%",
		    height:"10%",
		    top:0,
		    backgroundColor:"#00a478",
		    text:"TIMELINE",
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
		    
		    //Ti.UI.ScrollableView. scrollToView(dummyWindow = [0]);
	    });
	    
	    
	    topLabel.addEventListener('singletap',function(e){
	    });
	    
	    ///////////////////////////////////////////////
	    //Labelとscrollableview
	    var topLabelNameArray = [];
	    topLabelNameArray[0]= "TIMELINE";
	    topLabelNameArray[1]= "ACTIVITY";
	    topLabelNameArray[2]= "EXPLOPE";
	    topLabelNameArray[3]= "PROFILE";
	    
	    
	    Ti.App.scrollview.addEventListener('scroll',function(e){
		    if(e.currentPage != undefined){
			    topLabel.text = topLabelNameArray[e.currentPage];	
		    }
	    });
	    
	    ///////////////////////////////////////////////
	    
        // 	
	    Ti.App.win_base.add(buttonBar);
	    Ti.App.win_base.add(topLabel);
	    // require('lib/camera').camera();
	    //これに入ったら各処理させる

	    Ti.App.addEventListener('loginComplete',function(){
	    	Ti.App.Properties.removeProperty('username');
	    	Ti.App.Properties.removeProperty('password');
	    	Ti.App.Properties.setString('username',Ti.App.email);
	    	Ti.App.Properties.setString('password',Ti.App.password);
	    	console.log(Ti.App.email);
	    	
	    	console.log(Ti.App.Properties.getString('username'));
	    	if(Ti.App.win_base.loginSelectView != undefined){
	    		// Ti.App.win_base.remove(Ti.App.win_base.loginSelectView);
	    		var animation = Ti.UI.createAnimation({
	    			delay:100,
	    			opacity:0,
	    			duration:300
	    		});
	    		Ti.App.win_base.loginSelectView.animate(animation);
	    		var cnt=0;
	    		Ti.App.win_base.loginView.animate(animation);
	    		animation.addEventListener('complete',function(){
	    			if(cnt == 0){
	    				animation = null;
	    			}
	    			if(cnt == 1){
	    				Ti.App.win_base.loginSelectView = null;
	    				Ti.App.win_base.loginView = null;
	    			}
	    			cnt++;
	    		});
	    	}
		    console.log('login');
		    
		    // require('lib/vineAPI').vinePopularTimeLine();
		    
		    // Ti.App.scrollview.views[0].add(require('UI/myTimeline').myTimeline());
		    //test
		    //require('UI/newLogin').newLogin();


		    // require('UI/signIn').signIn();
		    // require('UI/myProfile').myProfile();
		    // require('lib/vineAPI').myProfile();	
		    // require('lib/vineAPI').vineGraphTimeLine();


		    //require('lib/vineAPI').userData();
		    //require('lib/vineAPI').vineLogin();
		    
		    
		    require('UI/myProfile').myProfile();
		    require('lib/vineAPI').myProfile();
		    
		    require('lib/vineAPI').vineGraphTimeLine();
		    //require('lib/vineAPI').userData();		
	    });
	}	
})();
