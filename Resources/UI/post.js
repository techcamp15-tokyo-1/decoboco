exports.postWindow = function(){
	
	Ti.App.xhr = Ti.Network.createHTTPClient();
				
	var mainView = Ti.UI.createWindow({
		width:"100%",
		height:"100%",
		backgroundColor:"#888888",
		modal:true,
		modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
    	modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
    	navBarHidden:true
	});
	
	mainView.open();
	
	var vineCamera = require('com.HjAboutHiroppy.VineCamera');
	
	// console.log("---------------"+vineCamera+"------------------------");
	var vineCameraView = vineCamera.createView({
		width:"100%",
		height:"50%",
		top:0
		// backgroundColor:"#00ff00"
	});
	
	var textLabel = Ti.UI.createLabel({
		text:0,
		button:0,
		textalign:'center',
		color:"black"
	});
	
	var touchView = Ti.UI.createView({
		width:"100%",
		height:"100%",
		zindex:10000000
	});
	
	var statusView = Ti.UI.createView({
		top:"50%",
		left:0,
		width:0,
		height:"50%",
		backgroundColor:"#00a478"
	});
	
	
	var enable = false;
	var stopwatchTime;
	var startTime;
	var stopwatchCount;
	var stopwatchTimeAdd = 0;
	var cnt = 0;
	
	touchView.addEventListener('touchstart',function(){
		// console.log("-------------------------------------------");
		// console.log('touchstart');
		// console.log("-------------------------------------------");
		cnt++;
		
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'capture0.mp4');
		// if ( file.exists()){
			// console.log('----------------------exist----------------------------');
			// file.deleteFile();
		// }
		
		stopwatchCount = setInterval(function(){
			if(stopwatchTime >= 6000){
				clearInterval(stopwatchCount);
				var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'capture0.mp4');
				// if ( file.exists()){
					// console.log('----------------------exist----------------------------');
					// file.deleteFile();
				// }
				recordFinish();				
			}
		    if( startTime == null && cnt >= 1){
	            var startDate = new Date();
	            startTime = startDate.getTime();
	            // console.log(startTime);
	            // console.log('-------------------------66-------------------');
	            cnt = 0;
	        }
	        else if(startTime == null) return;
	        
	        var nowDate = new Date();
	        stopwatchTime = nowDate.getTime() - startTime + stopwatchTimeAdd;
	        // textLabel.text = stopwatchTime;
	        statusView.width = stopwatchTime / (6000/320);
		},1);
		vineCameraView.startPauseButtonPressed();
		// console.log(Titanium.Platform.displayCaps.platformWidth);
	});
	
	touchView.addEventListener('touchend',function(){
		// console.log("-------------------------------------------");
		// console.log("touchend");
		// console.log("-------------------------------------------");
		clearInterval(stopwatchCount);
	    startTime = null;
	    stopwatchTimeAdd = stopwatchTime;
	    // console.log("stopwatch add "+stopwatchTimeAdd);
	    vineCameraView.startPauseButtonPressed();
	});
	
	mainView.add(vineCameraView);	
	// mainView.add(textLabel);
	mainView.add(statusView);
	mainView.add(touchView);
	
	
	//////////// fontの設定をする //////////////////////////
	
	var backButton = Ti.UI.createLabel({
		bottom:40,
		left:"20%",
		width:70,
		height:30,
		backgroundColor:"#00ffff",
		text:"cancel",
		textAlign:'center'
	});
	
	backButton.addEventListener('singletap',function(){
		// if ( file.exists()){
			// console.log('----------------------exist----------------------------');
			// file.deleteFile();
		// }
		vineCamera = null;
		mainView.close();
		mainView = null;
		touchView = null;
		
	});
	
	var okButton = Ti.UI.createLabel({
		bottom:40,
		right:"20%",
		width:70,
		height:30,
		backgroundColor:"#00ffff",
		text:"ok",
		textAlign:'center'
	});
	
	okButton.addEventListener('singletap',function(){
		recordFinish();				
	});
	
	mainView.add(backButton);
	mainView.add(okButton);
	
	
	function recordFinish(){
		vineCameraView.stopButtonPressed();	
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'capture0.mp4');
		console.log("---------------------------------------------------");
		console.log(file);
		console.log("---------------------------------------------------");
		// if ( file.exists()){
		// console.log('----------------------exist----------------------------');
			// file.deleteFile();
		// }
		
		var video = Titanium.Media.createVideoPlayer({
		    movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		    scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
		    //contentURL:movieFile.nativePath
		    media:file,
		    top:5,
		    width:"100%",
			height:"50%",
		});
		
		var ConfirmationWindow = Ti.UI.createWindow({
			width:"100%",
			height:"100%",
			opacity:0,
			backgroundColor:"#111",
			navBarHidden:true
		});
		ConfirmationWindow.open();
		
		var animation = Ti.UI.createAnimation({
			opacity:1,
			duration:200
		});
		ConfirmationWindow.animate(animation);
		ConfirmationWindow.add(video);
		video.play();
		
		var backButton2 = Ti.UI.createLabel({
			bottom:40,
			left:"20%",
			width:70,
			height:30,
			backgroundColor:"#00ffff",
			text:"cancel",
			textAlign:'center'
		});
		
		backButton2.addEventListener('singletap',function(){
			// if ( file.exists()){
				// console.log('----------------------exist----------------------------');
				// file.deleteFile();
			// }
			ConfirmationWindow.close();
			ConfirmationWindow = null;
			video = null;
			mainView.close();
			mainView = null;
		});
		
		var okButton2 = Ti.UI.createLabel({
			bottom:40,
			right:"20%",
			width:70,
			height:30,
			backgroundColor:"#00ffff",
			text:"ok",
			textAlign:'center'
		});
		
		okButton2.addEventListener('singletap',function(){
			console.log("---------------------line223-------------------------");
			// console.log(Ti.App.key);

			Ti.App.xhr.open('PUT','https://media.vineapp.com/upload/videos/1.3.1.mp4');
			
			Ti.App.xhr.setRequestHeader('Host',"media.vineapp.com");
			Ti.App.xhr.setRequestHeader('Proxy-Connection',"keep-alive");
			Ti.App.xhr.setRequestHeader('content-Type',"video/mp4");
			Ti.App.xhr.setRequestHeader('X-Vine-Client',"ios/1.3.1");
			Ti.App.xhr.setRequestHeader('Content-Length',"312112");
			// xhr.setRequestHeader('RAW video',file);
			Ti.App.xhr.setRequestHeader('Accept',"*/*");
			Ti.App.xhr.setRequestHeader('vine-session-id',Ti.App.key);
			Ti.App.xhr.setRequestHeader('Accept-Encoding',"gzip, deflate");
			Ti.App.xhr.setRequestHeader('Connection',"keep-alive");
			Ti.App.xhr.setRequestHeader('user-agent','iphone/1.3.1 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
			Ti.App.xhr.setRequestHeader('Accept-Language','en;q=1, fr;q=0.9, de;q=0.8, ja;q=0.7, nl;q=0.6, it;q=0.5');
			
			if ( file.exists()){
			console.log('----------------------exist----------------------------');
				// file.deleteFile();
			}
			
			console.log(file);
			// xhr.send(file);
			Ti.App.xhr.send(file);
			
			Ti.App.xhr.onload = function(e){
				console.log(e);
				// console.log(this.responseText);
				// var str = require('lib/regex').prepareParse(this.responseText);
				// console.log(str);
				// var json = JSON.parse(str);
				console.log("--------------------------------------------------");
				console.log(this.responseText);
				// console.log(json);
				console.log("--------------------------------------------------");
			};
		});
		
		ConfirmationWindow.add(backButton2);
		ConfirmationWindow.add(okButton2);
	}
};
