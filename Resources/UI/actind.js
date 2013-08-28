exports.actind = function(){
	var actInd = Titanium.UI.createActivityIndicator({
	    top:50, 
	    // left:10,
	    height:30,
	    width:30,
	    style:Titanium.UI.iPhone.ActivityIndicatorStyle.PLAIN,
	    zindex:10000,
	    color:'white'
	});
	return actInd;
};