exports.list = function(){
	var channelname = [];
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/channels/featured');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	xhr.send();	
	
	xhr.onload = function(){
		var json = JSON.parse(this.responseText);
		// console.log(json);
		for(var i=0;i<json.data.records.length;i++){
			channelname.push(json.data.records[i].channel);
		}
		tableView.data = makeRow(channelname);
	};
	// const channelname = [
						// "comedy","art & experimental","cats",
						// "dogs","family","beauty & fashion","health & fitness",
						// "nature","music","news & politics","special FX","sports","urban","wier d"
					  // ];
					  
	var leftView = Ti.UI.createView({
		left:-300,
		height:Ti.UI.FILL,
		width:200,
		backgroundColor:"#2c3e50",//#2c3e50,#7A7B7D
		opacity:0.97,
		
	});
	
	var channelLabel = Ti.UI.createLabel({
		text:"CHANNEL",
		color:"#d3c1af",
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
			row.addEventListener('singletap',function(e){
				// console.log(e);
				require('UI/tag').makingTable(e.index+1);
			});

			row.add(label);
			res.push(row);
			//console.log(label);
		}
		return res;
	}
};



