exports.newLogin = function(json){

	var loginView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
		backgroundColor:"#ffffff"
	});
	
// new login, twitter login, login

 
//require('lib/vineAPI').vineLogin("e.takumi.89+hiroppy@gmail.com", "techcamp");
//console.log(json);


	function createView(json){

		var loginView = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:"vertical",
			top:0,
			color:"#ffffff"
		});
		
		createHintLabel = function(text,top){
			var loginLabel = Ti.UI.createLabel({
				width:Ti.UI.FILL,
				height:"20px",
				top:top,
				left:30,
				text:text,
				color:"#000000"
			});
			return loginLabel;
		};
		
		var Label1 = createHintLabel("User ID", "20%");
		var Label2 = createHintLabel("Password", "5%");
		

		createInputField = function(text){
			var userIdLabel = Ti.UI.createTextField({
				color:'#336699',
		        top:10,
		        left:10,
		        width:250,
		        height:40,
		        hintText:text,
		        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			return userIdLabel;
		};
	
		var userIdLabel = createInputField(' sample@sample.co.jp ');
		var passwordLabel = createInputField(' password ');
	
	
		loginView.add(Label1);
		loginView.add(userIdLabel);
		loginView.app(Label2);
		loginView.app(passwordLabel);
	
		return loginView;
	}	
};