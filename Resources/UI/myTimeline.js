exports.myTimeline = function(json){
	
	var tableview = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
	});
	
	var xhr = Ti.Network.createHTTPClient();
	var str = Ti.App.key.split('-');
	xhr.open('GET','https://api.vineapp.com/timelines/users/'+str[0]);
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
	    var json = JSON.parse(this.responseText);
	    if(json.error != "") alert('error');
	    else{
	    	Ti.App.fireEvent('userTimeLineComplete');
	    	// console.log(json.data.records[0].videoUrl);
	    	tableview.appendRow(createRow(json));
	    	Ti.App.scrollview.views[1].add(tableview);
	    }
	};
	
	
	function createRow(json){
		var row = Ti.UI.createTableViewRow({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
		});
		var view = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.SIZE,
		});
		row.add(view);
		console.log(json.data.records[0].videoUrl);
		// var video = Ti.UI.createImageView({
			// width:200,
			// height:100,
			// url:json.data.records[0].videoUrl
		// });
		
		var video = Titanium.Media.createVideoPlayer({
			autoplay : true,
		    backgroundColor : 'black',
		    height : 300,
		    width : 300,
		    mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
		    scalingMode:Titanium.Media.VIDEO_SCALING_NONE,
		    url : json.data.records[0].videoUrl
		});
		video.play();
		
		view.add(video);
		
		return row;
	}
}

