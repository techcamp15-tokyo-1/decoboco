exports.signSelect = function(){
	
// new login, twitter login, login

		var signSelectView = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:"vertical",
			top:0,
			color:"#ffffff",
			backgroundImage:"/images/login_background.png"
		});
		signSelectView.hide();
		
		var signSelectArea = Ti.UI.createView({
			width:"70%",
			height:"70%",
			layout:"vertical",
			top:"15%",
			left:45,
			opacity:0.7,
			backgroundColor:"#ffffff"
		});
		
		var topLabel = Ti.UI.createLabel({
			width:Ti.UI.FILL,
			height:"30%",
			text:"Please select \n Sign in or Sign up.", 
			font:{
				fontSize: 22,
				fontWeight:"bold",
				fontFamily: 'AppleGothic',
			},
			textAlign:"center",
			left:"10px",
			top:"10%"
		});
	
		signSelectArea.add(topLabel);
		
		var signInButton = Ti.UI.createLabel({
			top:"5%",
			left:5,
			color:"#ffffff",
			backgroundColor:"#e74c3c",//red
			width:"60%",
			height:"40%",
			text:"Sign In",
			textAlign:"center",
			font:{
				//fontWeight:bold,
				fontSize: 20,
				fontWeight:"bold",
				fontFamily: 'AppleGothic',
			},
			borderRadius:"0.8"
		});

		var signUpButton = Ti.UI.createLabel({
			top:10,
			left:5,
			color:"#ffffff",
			backgroundColor:"#2ecc71",//green
			width:"60%",
			height:"40%",
			text:"Sign Up",
			textAlign:"center",
			font:{
				//fontWeight:bold,
				fontSize: 20,
				fontWeight:"bold",
				fontFamily: 'AppleGothic',
			},
			borderRadius:"0.5"
		});
	
	
		signInButton.addEventListener('singletap',function(){
			// console.log("move to SignIn page");
			var view = require('UI/signIn').signIn();
			Ti.App.win_base.loginView = view;
			Ti.App.win_base.add(view);
		});
		signUpButton.addEventListener('singletap',function(){
			var view = require('UI/signUp').signUp();
			Ti.App.win_base.loginView = view;
			Ti.App.win_base.add(view);
			// console.log("move to SignUp page");
		});
		
		var buttonView = Ti.UI.createView({
			layout:'vertical',
			top:30,
			left:60,
			width:Ti.UI.FILL,
			height:"30%",
		});
	
	
		buttonView.add(signInButton);
		buttonView.add(signUpButton);

		signSelectArea.add(buttonView);


		signSelectView.add(signSelectArea);	
		signSelectView.show();
		
		return signSelectView;

};