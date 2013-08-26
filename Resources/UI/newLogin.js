exports.newLogin = function(json){
	var mainView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
		backgroundColor:"#ffffff"
	});
	
// new login, twitter login, login

 
require('lib/vineAPI').vineLogin("e.takumi.89+hiroppy@gmail.com", "techcamp");
console.log(json);


	function createView(json){
		var loginView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
			});

		

		var usernameLabel = Ti.UI.createLabel({
				left:"40%",
				top:100,
				text:json.data.records.username,
				font: { fontSize: 15, fontFamily: 'AppleGothic', } ,
				textAlign: 'center',
				color:"#000"
			});
			
		loginView.add(usernameLabel);
		mainView.add(loginView);	
	}
	
};