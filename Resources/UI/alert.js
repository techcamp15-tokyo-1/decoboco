exports.message_view = function(message,type){
	if(type == 'error'){
		var bg = Ti.UI.createView({
			backgroundColor:"#DC143C",
			width:Ti.UI.SIZE,
			height:25,
			right:-200,
			top:5,
			zindex:1000000000000,
			opacity:0.9
		});
	}
	else{
		var bg = Ti.UI.createView({
			backgroundColor:"#777777",
			width:Ti.UI.SIZE,
			height:25,
			right:-200,
			top:5,
			zindex:1000000000000,
			opacity:0.9
		});
	}
	
	var text = Ti.UI.createLabel({
		text:message,
		color:"#ffffff",
		font: { fontSize: 12, fontFamily: 'AppleGothic', } ,
		textAlign: 'center',
	});
	bg.add(text);
	
	var open_animation = Ti.UI.createAnimation({
		right:0,
		duration:500
	});
	bg.animate(open_animation);
	Ti.App.win_base.add(bg);
	
	open_animation.addEventListener('complete',function(){
		open_animation = null;
		
		var close_animation = Ti.UI.createAnimation({
			right:-200,
			duration:500,
			delay:2000
		});
		bg.animate(close_animation);
		close_animation.addEventListener('complete',function(){
			Ti.App.win_base.remove(bg);
			close_animation = null;
			bg = null;
			text = null;
		});
	});
};