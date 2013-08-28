exports.signSelect = function(){
	
// new login, twitter login, login

		var signSelectView = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:"vertical",
			top:0,
			color:"#ffffff",
			image:"../images/login_background.png"
		});
		signSelectView.hide();
		
		var signSelectArea = Ti.UI.createView({
			width:"60%",
			height:"60%",
			layout:"vertical",
			top:"20%",
			left:"60px",
			opacity:0.7,
			color:"#ffffff"
		});
		
		var topLabel = Ti.UI.createLabel({
			width:Ti.UI.FILL,
			height:"15%",
			text:"please choose Sign in or Sign up.", 
			font:{
				fontsizefontSize: 13,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			textAlign:"center",
			left:"10px",
			top:"10%"
		});
	
		signSelectArea.add(topLabel);
		
		var signInButton = Ti.UI.createLabel({
			top:"5%",
			left:"20px",
			color:"#ffffff",
			backgroundColor:"#e74c3c",//red
			width:Ti.UI.FILL,
			height:"20%",
			text:"Sign In",
			font:{
				//fontWeight:bold,
				fontsize: 13,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			// borderRadius:"0.8"
		});

		var signUpButton = Ti.UI.createLabel({
			top:"5%",
			left:"2%",
			color:"#ffffff",
			backgroundColor:"#2ecc71",//green
			width:Ti.UI.FILL,
			height:"20%",
			text:"Sign Up",
			font:{
				//fontWeight:bold,
				fontsize: 13,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			// borderRadius:"0.5"
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
		
	
		signSelectArea.add(signInButton);
		signSelectArea.add(signUpButton);

		signSelectView.add(signSelectArea);	
		signSelectView.show();
		
		return signSelectView;

};