exports.list = function(){
	var leftView = Ti.UI.createView({
		left:-300,
		height:Ti.UI.FILL,
		width:200,
		backgroundColor:"#111111",
		opacity:0.7,
		zindex:100000000000000
	});
	
	var channelLabel = Ti.UI.createLabel({
		text:"CHANNEL",
		textalign:"center",
		width:Ti.UI.FILL,
		height:50,
		left:5
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
	
	// var data = [
				// {
				 // comedy:"Comedy",
				 // art_Experimental:"Art & Experimental",
				 // cats:"Cats",
				 // dogs:"Dogs",
				 // family:"Family",
				 // beauty_fashion:"Beauty & Fashion",
				 // health_fitness:"Health & Fitness",
				 // nature:"Nature",
				 // music:"Music",
				 // news_politics:"News & Politics",
				 // spcial_FX:"Special FX",
				 // sports:"Sports",
				 // Urban:"Urban",
				 // wier_d:"wier d",
				// }
			// ];
	
	tableView.data = makeRow();

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
		console.log(e);
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
		for(var i=0;i< 15;i++){
			var row = Ti.UI.createTableViewRow({
				height:40,
				width:Ti.UI.FILL
			});
			var label = Ti.UI.createLabel({
				width:Ti.UI.FILL,
				height:40,
				text:channelname
			});
			row.add(label);
			res.push(row);
		}
		return row;
	}
};



