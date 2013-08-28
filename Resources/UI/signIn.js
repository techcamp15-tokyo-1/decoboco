exports.signIn = function(){
	
    // new login, twitter login, login

    
    //require('lib/vineAPI').vineLogin("e.takumi.89+hiroppy@gmail.com", "techcamp");
    //console.log(json);


    //	function createView(json){
    	
	var signInView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,
		layout:"vertical",
		top:0,
		color:"#ffffff",
		backgroundImage:"/images/login_background.png",
	});
	
	var signInArea = Ti.UI.createScrollView({
		width:"70%",
		height:"80%",
		layout:"vertical",
		top:"10%",
		left:60,
		opacity:0.9,
		backgroundcColor:"#222"
	});
	
	var topLabel = Ti.UI.createLabel({
		width:Ti.UI.FILL,
		height:"15%",
		color:"#ffffff",
		text:"Sign In", 
		font:{
			fontSize: 30,
			fontWeight:"bold",
			fontFamily: 'AppleGothic',
		},
		textAlign:"center",
		left:-25,
		top:"3%"
	});
	
	signInArea.add(topLabel);
	
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
	

	createInputField = function(text,musk){
		var userIdLabel = Ti.UI.createTextField({
			color:'#111',
		    top:"3%",
		    left:10,
		    width:"80%",
		    height:"10%",
		    passwordMask:musk,
		    autocapitalization:false,
		    font:{
				fontSize: 13,
				fontFamily: 'AppleGothic',
			},
		    hintText:text,
		    returnKeyType:Titanium.UI.RETURNKEY_SEND,
		    keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		    borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
		});
		return userIdLabel;
	};
	
	var userIdLabel = createInputField(' sample@sample.co.jp ', false);
	var passwordLabel = createInputField(' password ', true);
	
	// userIdLabel.addEventListener('blur',function(){
		// console.log(userIdLabel.value);
	// });
// 	
	// passwordLabel.addEventListener('blur',function(){
		// console.log(passwordLabel.value);
	// });
	
	
	signInArea.add(userIdLabel);
	signInArea.add(passwordLabel);
	
	var signInButton = Ti.UI.createLabel({
		top:0,
		left:5,
		color:"#ffffff",
		backgroundColor:"#e74c3c",//red
		width:"45%",
		height:"40%",
		text:"Sign In",
		textAlign:"center",
		font:{
			fontSize: 20,
			fontWeight:"bold",
			fontFamily: 'AppleGothic',
		},
		borderRadius:"0.8"
	});

	signInButton.addEventListener('singletap',function(){
		if(userIdLabel.value != "" && passwordLabel.value != ""){
			require('lib/vineAPI').vineLogin(userIdLabel.value,passwordLabel.value);
			console.log('ininini');
		}
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
		Ti.App.win_base.remove(signInView);
		signInView = null;
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
		top:50,
		left:-10,
		width:Ti.UI.FILL,
		height:"30%",
	});
	
	
	buttonView.add(signInButton);
	buttonView.add(cancelButton);
	//loginArea.add(twitterLoginButton);
	signInArea.add(buttonView);

	signInView.add(signInArea);	
	
	return signInView;
};