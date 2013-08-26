exports.postWindow = function(){
	var mainView = Ti.UI.createView({
		width:"100%",
		height:"100%",
		backgroundColor:"#00ffff"
	});
	
	var vineCamera = require('com.HjAboutHiroppy.VineCamera');
	
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
	mainView.add(textLabel);
	
	return mainView;
};
