exports.list = function(){
	var leftView = Ti.UI.createView({
		left:-300,
		height:Ti.UI.FILL,
		width:200,
		backgroundColor:"#111111",
		opacity:0.7,
		zindex:100000000000000
	});
	
	var tableView = Ti.UI.createTableView({
		left:5,
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		backgroundColor:"transparent"
	});
	
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
};



