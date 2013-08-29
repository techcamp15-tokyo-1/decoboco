exports.list = function(){
	
	const channelname = [
						"Comedy","Art & Experimental","Cats",
						"Dogs","Family","Beauty & Fashion","Health & Fitness",
						"Nature","Music","News & Politics","Special FX","Sports","Urban","wier d"
					  ];
					  
	var leftView = Ti.UI.createView({
		left:-300,
		height:Ti.UI.FILL,
		width:200,
		backgroundColor:"#7A7B7D",
		opacity:0.97,
		zindex:100000000000000
	});
	
	var channelLabel = Ti.UI.createLabel({
		text:"CHANNEL",
		color:"#ffffff",
		textalign:"center",
		font:{
			fontSize:30,
			fontWeight:"bold",
			fontFamily:'AppleGothic'
		},
		width:Ti.UI.FILL,
		height:50,
		left:5,
		top:0
	});
	
	leftView.add(channelLabel);
	
	var tableView = Ti.UI.createTableView({
		top:50,
		left:5,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:"transparent"
	});
	
	//require('UI/explore').explore();
	
	tableView.data = makeRow(channelname);

	leftView.add(tableView);
	var animation = Ti.UI.createAnimation({
		left:0,
		duration:250
	});
	
	leftView.animate(animation);
	animation = null;
	var scrollView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL
	});
	
	scrollView.addEventListener('swipe',function(e){
		// console.log(e);
		if(e.direction == "left"){
			var animation2 =Ti.UI.createAnimation({
				duration:250,
				left:-300
			});
			leftView.animate(animation2);
			animation2.addEventListener('complete',function(){
				animation2 = null;
				Ti.App.win_base.remove(leftView);
				leftView =null;
				Ti.App.win_base.remove(scrollView);
				scrollView =null;
				tableView = null;
			});
		}
	});
	
	Ti.App.win_base.add(scrollView);
	Ti.App.win_base.add(leftView);

	function makeRow(channelname){
		var res = [];
		for(var i in channelname){
			var row = Ti.UI.createTableViewRow({
				height:50,
				width:Ti.UI.FILL
			});
			var label = Ti.UI.createLabel({
				width:Ti.UI.FILL,
				height:50,
				color:"#ffffff",
				font:{
					fontSize:20,
					fontWeight:"bold",
					fontFamily: 'AppleGothic',
				},
				text:" "+channelname[i],
			});
			row.add(label);
			res.push(row);
			//console.log(label);
		}
		return res;
	}
};



