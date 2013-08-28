exports.signSelect = function(json){
	
// new login, twitter login, login

 
//require('lib/vineAPI').vineLogin("e.takumi.89+hiroppy@gmail.com", "techcamp");
//console.log(json);
		var signSelectView = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:"vertical",
			top:0,
			color:"#ffffff",
			image:"../images/login_background.png"
		});
		
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
			width:"60%",
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
		
		var signInButton = Ti.UI.createButton({
			top:"5%",
			left:"20px",
			color:"#ffffff",
			backgroundColor:"#e74c3c",//red
			width:"80%",
			height:"20%",
			label:"Sign In",
			font:{
				//fontWeight:bold,
				fontsizefontSize: 30,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			borderRadius:"0.8"
		});

		var signUpButton = Ti.UI.createButton({
			top:"5%",
			left:"2%",
			color:"#ffffff",
			backgroundColor:"#2ecc71",//green
			width:"39%",
			height:"20%",
			label:"Sign Up",
			font:{
				//fontWeight:bold,
				fontsizefontSize: 13,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			borderRadius:"0.5"
		});
	
		var I = require('UI/signIn').signIn();
		var U = require('UI/signUp').signUp();
	
		signInButton.addEventListener('singletap',function(){
			console.log("move to SignIn page");
			I.open();
		});
		signUpButton.addEventListener('singletap',function(){
			console.log("move to SignUp page");
			U.open();
		});
		
	
		signSelectArea.add(signInButton);
		signSelectArea.add(signUpButton);

		signSelectView.add(signSelectArea);	
		
		return signSelectView;

};