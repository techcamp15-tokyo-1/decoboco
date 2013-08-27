exports.postWindow = function(){
	var mainView = Ti.UI.createWindow({
		width:"100%",
		height:"100%",
		backgroundColor:"#888888",
		modal:true,
		modalTransitionStyle: Ti.UI.iPhone.MODAL_TRANSITION_STYLE_FLIP_HORIZONTAL,
    	modalStyle: Ti.UI.iPhone.MODAL_PRESENTATION_FULLSCREEN,
	});
	
	mainView.open();
	
	var vineCamera = require('com.HjAboutHiroppy.VineCamera');
	console.log("---------------"+vineCamera+"------------------------");
	var vineCameraView = vineCamera.createView({
		width:"100%",
		height:"50%",
		top:5
		// backgroundColor:"#00ff00"
	});
	
	var textLabel = Ti.UI.createLabel({
		text:0,
		button:0,
		textalign:'center',
		color:"black"
	});
	
	//6秒の時間カウント

	// var c = Ti.UI.createButton({
	// width:40,
	// height:20,
	// bottom:0,
	// left:0,
	// title:"finish"
	// });
    // 	
	// var d = Ti.UI.createButton({
	// width:40,
	// height:20,
	// bottom:0,
	// right:0,
	// title:"start/pouse"
	// });
    // 	
	// c.addEventListener('singletap',function(){
	// v.stopButtonPressed();	
    // 		
	// var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'capture0.mp4');
	// console.log("---------------------------------------------------");
	// console.log(file);
	// console.log("---------------------------------------------------");
	// if ( file.exists()){
	// console.log('----------------------exist----------------------------');
	// // file.deleteFile();
	// }
	// });
    // 	
	// d.addEventListener('singletap',function(){
	// v.startPauseButtonPressed();
    // 		
	// });
	
	var enable = false;
	var stopwatchTime;
	var startTime;
	var stopwatchCount;
	var stopwatchTimeAdd = 0;
	
	vineCameraView.addEventListener('touchstart',function(){
		console.log("-------------------------------------------");
		console.log('touchstart');
		console.log("-------------------------------------------");
		// vineCameraView.startPauseButtonPressed();
		stopwatchCount = setInterval(function(){
		    if( startTime == null ){
		    	// console.log('-------------------------66-------------------');
	            var startDate = new Date();
	            startTime = startDate.getTime();
	            // console.log(startTime);
	            // console.log('-------------------------66-------------------');
	        }
	        var nowDate = new Date();
	        
	        
	        stopwatchTime = nowDate.getTime() - startTime + stopwatchTimeAdd;
	        // console.log( nowDate.getTime()+" - "+startTime+" + "+stopwatchTimeAdd+" = "+stopwatchTime);
	        textLabel.text = stopwatchTime;
	        // stopwatchMillisecond = stopwatchTime % 1000;
	        // stopwatchSecond = Math.floor( stopwatchTime / 1000 ) % 60;
	        // stopwatchMinute = Math.floor( stopwatchTime / 1000 / 60 ) % 60;
	        // stopwatchHour = Math.floor( Math.floor( stopwatchTime / 1000 / 60 ) / 60 );
	        // console.log("sec "+stopwatchTime);
		},1);
	});
	
	vineCameraView.addEventListener('touchend',function(){
		console.log("-------------------------------------------");
		console.log("touchend");
		console.log("-------------------------------------------");
		clearInterval(stopwatchCount);
	    startTime = null;
	    stopwatchTimeAdd = stopwatchTime;
	    console.log("stopwatch add "+stopwatchTimeAdd);
	});
	
	mainView.add(vineCameraView);	
	// mainView.add(textLabel);
	
	var button = Ti.UI.createButton({
		bottom:40,
		left:"50%",
		width:50,
		height:50	
	});
	
	mainView.add(button);
	button.addEventListener('singletap',function(){
		mainView.close();
		// vineCamera = null;
		// mainView = null;
	});
	
	var fbutton = Ti.UI.createButton({
		bottom:40,
		left:"30%",
		width:50,
		height:50,
		title:"finish"
	});
	
	// mainView.add(fbutton);
	
	fbutton.addEventListener('singletap',function(){
		vineCamera.stopButtonPressed();	
		console.log("------------------------line137------------------------");
		var wwindow = Ti.UI.createWindow({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			backgroundColor:"#00ffff"
		});
		wwindow.open();
		
		var file = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'capture0.mp4');
		var video = Titanium.Media.createVideoPlayer({
		    movieControlMode:Titanium.Media.VIDEO_CONTROL_DEFAULT,
		    scalingMode:Titanium.Media.VIDEO_SCALING_ASPECT_FILL,
		    //contentURL:movieFile.nativePath
		    media:file
		});
		video.play();
		wwindow.add(video);
		mainView.add(wwindow);
	});
	
};
