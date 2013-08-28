exports.signUp = function(json){
	
    // new login, twitter login, login

    
    //require('lib/vineAPI').vineLogin("e.takumi.89+hiroppy@gmail.com", "techcamp");
    //console.log(json);


    //	function createView(json){

	var signUpView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		top:0,
		color:"#ffffff",
		backgroundImage:"/images/login_background.png"
	});

	var cancelButton = Ti.UI.createLabel({
		top:0,
		left:0,
		color:"#ffffff",
		backgroundColor:"#e74c3c",//red
		width:40,
		height:20,
		text:"cancel",
		font:{
			//fontWeight:bold,
			fontsize: 15,
			//太さも 
			fontFamily: 'AppleGothic',
		},
	});
	
	cancelButton.addEventListener('singletap',function(){
		Ti.App.win_base.remove(signUpView);
		signUpView = null;
	});
	
	signUpView.add(cancelButton);
	
	var signUpArea = Ti.UI.createScrollView({
		width:"60%",
		height:"80%",
		layout:"vertical",
		top:"10%",
		left:"60px",
		opacity:0.9,
		backgroundColor:"#00ff00"
	});
	
	var topLabel = Ti.UI.createLabel({
		width:"60%",
		height:"15%",
		text:"Sign Up", 
		font:{
			fontsize: 15,
			//太さも 
			fontFamily: 'AppleGothic',
		},
		textAlign:"center",
		left:10,
		top:"3%"
	});
	
	
	signUpArea.add(topLabel);
	
	// createHintLabel = function(text,top){
	// var loginLabel = Ti.UI.createLabel({
	// width:Ti.UI.FILL,
	// height:"20px",
	// top:top,
	// left:30,
	// text:text,
	// color:"#000000"
	// });
	// return loginLabel;
	// };
    // 		
	// var Label1 = createHintLabel("User ID", "20%");
	// var Label2 = createHintLabel("Password", "5%");
	
	var signUpThumbnail = Ti.UI.createImageView({
		top:"2%",
		left:"40%",
		weight:"20%",
		height:"20%",
		image:"/images/image.png",
		
	});
	signUpArea.add(signUpThumbnail);

	var createInputField = function(text){
		var userIdLabel = Ti.UI.createTextField({
			color:"#111",
		    top:"5%",
		    left:10,
		    width:"80%",
		    height:"10%",
		    hintText:text,
		    font:{
				fontsize: 13,
				fontFamily: 'AppleGothic',
			},
		    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
		    returnKeyType:Ti.UI.RETURNKEY_DEFAULT,
		    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		});
		return userIdLabel;
	};
	
	var userNameLabel = createInputField(' your name ');
	var userIdLabel = createInputField(' E-mail  sample@sample.co.jp ');
	var passwordLabel = createInputField(' password ');
	signUpArea.add(userNameLabel);
	signUpArea.add(userIdLabel);
	signUpArea.add(passwordLabel);

	var signUpButton = Ti.UI.createLabel({
		top:"5%",
		left:"2%",
		color:"#ffffff",
		backgroundColor:"#2ecc71",//green
		width:"80%",
		height:"15%",
		label:"Sign Up",
		font:{
			//fontWeight:bold,
			fontsizefontSize: 13,
			//太さも 
			fontFamily: 'AppleGothic',
		},
		borderRadius:"0.5"
	});
	
	signUpButton.addEventListener('singletap',function(){
		if(userNameLabel.value != "" && userIdLabel.value != "" && passwordLabel.value != ""){
			require('lib/vineAPI').vineSignUp(userIdLabel.value,passwordLabel.value,userNameLabel.value);
		}
	});
	// var twitterLoginButton = Ti.UI.createButton({
	// top:"2%",
	// left:"20px",
	// color:"#ffffff",
	// backgroundColor:"#3498db",//blue
	// width:"80%",
	// height:"15%",
	// label:"Twitter",
	// font:{
	// fontWeight:bold,
	// fontsizefontSize: 13,
	// //太さも 
	// fontFamily: 'AppleGothic',
	// },
	// borderRadius:"0.3"
	// });
	
	signUpArea.add(signUpButton);
	//loginArea.add(twitterLoginButton);

	signUpView.add(signUpArea);	
	
	return signUpView;
};