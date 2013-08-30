exports.makingTable = function(){
	var table;
	
	require('lib/vineAPI').vinePopularTimeLine("up",0,true);
	Ti.App.addEventListener('vinePopularTimeLineFirst',function(e){
		table = require('UI/timelineTemplete').tableTemplete(e.res);
		table.oldId = 1; //oldId = page count
		Ti.App.scrollview.views[1].add(table);
		Ti.App.removeEventListener('vinePopularTimeLineFirst',{});
		table.addEventListener('upReload',function(){
			require('lib/vineAPI').vineGraphTimeLine("up",table.latestId,false);
		});	
		table.addEventListener('underReload',function(){
			table.oldId++;
			require('lib/vineAPI').vineGraphTimeLine("under",table.oldId,false);
		});
	});
	Ti.App.addEventListener('vinePopularTimeLineAfter',function(e){
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
			addArray = table.data[1].rows.concat(newData);
			table.data = addArray;
		}
	});
};
