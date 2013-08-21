exports.myTimeline = function(){
	var tableview = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
	});
	
	var row = Ti.UI.createTableViewRow({
		width:Ti.UI.FILL,
		height:Ti.UI.SIZE
	});
	var view = Ti.UI.createView({
		
	});
	
	var video = Ti.UI.createImageView({
		width:200,
		height:100,
		url:json.data.records[0].videoUrl
	});
	// console.log(json.data.records[0].videoUrl);
}

