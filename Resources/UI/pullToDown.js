//上更新の時にでるUI
exports.pull_to_down = function(){
	var border = Ti.UI.createView({
		backgroundColor:"#576c89",
		// backgroundColor: 'transparent',
		height:2,
		bottom:0,
	});
	
	var tableHeader = Ti.UI.createView({
		backgroundColor:"#e2e7ed",
		// backgroundColor: '#888888',
		width:320,
		height:60,
	});
	
	tableHeader.add(border);
	
	var arrow = Ti.UI.createView({
		backgroundImage:"/images/reload_Arrow.png",
		width:23,
		height:40,
		bottom:10,
		left:"4%"
	});
	tableHeader.arrow = arrow;
	
	var statusLabel = Ti.UI.createLabel({
		text:"Pull to reload",
		left:55,
		width:200,
		bottom:20,
		height:"auto",
		color:"#576c89",
		textAlign:"center",
		font: { fontSize: 15, fontFamily: 'AppleGothic', } ,
		// shadowColor:"#999",
		// shadowOffset:{x:0,y:1}
	});
	tableHeader.statusLabel = statusLabel;
	
	
	tableHeader.add(arrow);
	tableHeader.add(statusLabel);
	return tableHeader;
};