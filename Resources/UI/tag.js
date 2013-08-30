exports.makingTable = function(tagName){
	var table;
	console.log(tagName);
	require('lib/vineAPI').vineTagTimeLine(tagName,"up",0,true);
	Ti.App.addEventListener('vineTagTimeLineFirst',function(e){
		table = require('UI/timelineTemplete').tableTemplete(e.res);
		table.oldId = 1; //oldId = page count
		
		var win = Ti.UI.createWindow({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL
		});
		
		table.height = "90%";
		table.top = 0;
		win.add(table);
		var backLabel = Ti.UI.createLabel({
			width:Ti.UI.FILL,
			height:"10%",
			bottom:0,
			backgroundColor:"#666666",
			color:"white",
			font: { fontSize: 17, fontWeight:'bold', fontFamily: 'AppleGothic', } ,
			text:"back",
			textAlign:'center'
		});
		win.add(backLabel);
		backLabel.addEventListener('singletap',function(){
			Ti.App.win_base.remove(win);
			win = null;
		});
		Ti.App.win_base.add(win);
		Ti.App.removeEventListener('vineTagTimeLineFirst',{});
		table.addEventListener('upReload',function(){
			require('lib/vineAPI').vineTagTimeLine(tagName,"up",table.latestId,false);
		});	
		table.addEventListener('underReload',function(){
			table.oldId++;
			require('lib/vineAPI').vineTagTimeLine(tagName,"under",table.oldId,false);
		});
	});
	Ti.App.addEventListener('vineTagTimeLineAfter',function(e){
		// console.log(e.res);
		if(e.res.length != 0){
			table.leastId = e.res[0].postId;
		}
		// console.log(table.leastId+"   "+table.oldId);
		// console.log(e.eventtype);
		var data = table.data[0];
		var newData = require('UI/timelineTemplete').createRow(e.res);
		var addArray;
		if(newData.length == 0) return;
		if(e.eventtype == "up"){
			addArray= newData.concat(table.data[0].rows);
			table.data = addArray;
		}
		else{
			// newData = newData.reverse();
			addArray = table.data[0].rows.concat(newData);
			table.data = addArray;
		}
		
	});
};
