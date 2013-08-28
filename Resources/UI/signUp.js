exports.signUp = function(json){
	
// new login, twitter login, login

 
//require('lib/vineAPI').vineLogin("e.takumi.89+hiroppy@gmail.com", "techcamp");
//console.log(json);


//	function createView(json){

		var signUpView = Ti.UI.createView({
			width:Ti.UI.FILL,
			height:Ti.UI.FILL,
			layout:"vertical",
			top:0,
			color:"#ffffff",
			image:"../images/login_background.png"
		});

		var signUpArea = Ti.UI.createView({
			width:"60%",
			height:"80%",
			layout:"vertical",
			top:"20%",
			left:"60px",
			opacity:0.7,
			color:"#ffffff"
		});
		
		var topLabel = Ti.UI.createLabel({
			width:"60%",
			height:"15%",
			text:"Sign Up", 
			font:{
				fontsizefontSize: 13,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			textAlign:"center",
			left:"10px",
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
			backgroundImage:"../images/image.png",
			
		});
		signUpArea.add(signUpThumbnail);

		createInputField = function(text){
			var userIdLabel = Ti.UI.createTextField({
				color:'#336699',
		        top:"2%",
		        left:"10px",
		        width:"80%",
		        height:"10%",
		        hintText:text,
		        font:{
					fontsizefontSize: 13,
					fontFamily: 'AppleGothic',
				},
		        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			return userIdLabel;
		};
		
		var userName = createInputField(' your name ');
		var userIdLabel = createInputField(' E-mail  sample@sample.co.jp ');
		var passwordLabel = createInputField(' password ');
		signUpArea.add(userName);
		signUpArea.add(userIdLabel);
		signUpArea.add(passwordLabel);

		var signUpButton = Ti.UI.createButton({
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
	//}	
};