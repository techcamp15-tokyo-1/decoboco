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
	
	var signUpArea = Ti.UI.createScrollView({
		width:"80%",
		height:"80%",
		layout:"vertical",
		top:"10%",
		left:30,
		opacity:1,
		//backgroundColor:"#222"
	});
// 	
		// width:"60%",
		// height:"60%",
		// layout:"vertical",
		// top:"20%",
		// left:60,
		// opacity:0.7,
		// backgroundcColor:"#000"
// 	
	
	var topLabel = Ti.UI.createLabel({
		width:Ti.UI.FILL,
		height:"15%",
		text:"Sign Up", 
		color:"#ffffff",
		font:{
			fontSize: 30,
			fontWeight:"bold",
			fontFamily: 'AppleGothic',
		},
		textAlign:"center",
		left:0,
//		top:"10%"
		top:"15%"
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
		top:"3%",
		left:85,
		weight:"20%",
		height:"20%",
		image:"/images/image.png",
		
	});

	signUpThumbnail.addEventListener('singletap',function(){
		//image2.png
//takePhoto
//select image from gallary
	console.log("image");


	});


	signUpArea.add(signUpThumbnail);
	
	

	var createInputField = function(text,mask){
		var userIdLabel = Ti.UI.createTextField({
			color:"#111",
		    top:"3%",
		    left:25,
		    width:"80%",
		    height:"8%",
		    hintText:text,
		    passwordMask:mask,
		    autocapitalization:false,
		    font:{
				fontSize: 13,
				fontFamily: 'AppleGothic',
			},
		    keyboardType:Ti.UI.KEYBOARD_DEFAULT,
		    returnKeyType:Ti.UI.RETURNKEY_SEND,
		    borderStyle:Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
		});
		return userIdLabel;
	};

	var userNameLabel = createInputField(' your name ', false);
	var userIdLabel = createInputField(' E-mail  sample@sample.co.jp ', false);
	var passwordLabel = createInputField(' password ', true);
	signUpArea.add(userNameLabel);
	signUpArea.add(userIdLabel);
	signUpArea.add(passwordLabel);

	var signUpButton = Ti.UI.createLabel({
		top:0,
		left:10,
		color:"#ffffff",
		backgroundColor:"#2ecc71",//green
		width:"45%",
		height:"40%",
		text:"Sign Up",
		textAlign:"center",
		font:{
			fontSize: 20,
			fontWeight:"bold",
			fontFamily: 'AppleGothic',
		},
		borderRadius:"0.5"
	});
	
	
	
	var cancelButton = Ti.UI.createLabel({
		top:0,
		left:5,
		color:"#ffffff",
		backgroundColor:"#3498db",//blue
		width:"45%",
		height:"40%",
		text:"cancel",
		textAlign:"center",
		font:{
			fontSize: 20,
			fontWeight:"bold",
			fontFamily: 'AppleGothic',
		},
		borderRadius:"0.8"
	});
	
	cancelButton.addEventListener('singletap',function(){
		Ti.App.win_base.remove(signUpView);
		signUpView = null;
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
	
	var buttonView = Ti.UI.createView({
		layout:'horizontal',
		top:40,
		width:Ti.UI.FILL,
		height:"30%",
	});
	
	
	buttonView.add(signUpButton);
	buttonView.add(cancelButton);
	//loginArea.add(twitterLoginButton);
	signUpArea.add(buttonView);
	signUpView.add(signUpArea);	
	
	return signUpView;
};