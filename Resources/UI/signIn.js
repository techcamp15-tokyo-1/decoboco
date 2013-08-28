exports.signIn = function(json){
	
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
			image:"../images/login_background.png"
		});
		
		var signInArea = Ti.UI.createView({
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
			text:"Sign In", 
			font:{
				fontsizefontSize: 13,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			textAlign:"center",
			left:"10px",
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
		

		createInputField = function(text){
			var userIdLabel = Ti.UI.createTextField({
				color:'#336699',
		        top:"3%",
		        left:"10px",
		        width:"80%",
		        height:"10%",
		        hintText:text,
		        keyboardType:Titanium.UI.KEYBOARD_DEFAULT,
		        returnKeyType:Titanium.UI.RETURNKEY_DEFAULT,
		        borderStyle:Titanium.UI.INPUT_BORDERSTYLE_ROUNDED
			});
			return userIdLabel;
		};
	
		var userIdLabel = createInputField(' sample@sample.co.jp ');
		var passwordLabel = createInputField(' password ');
	
		signInArea.add(userIdLabel);
		signInArea.add(passwordLabel);
	
		var signInButton = Ti.UI.createButton({
			top:"5%",
			left:"20px",
			color:"#ffffff",
			backgroundColor:"#e74c3c",//red
			width:"39%",
			height:"32%",
			label:"Sign In",
			font:{
				//fontWeight:bold,
				fontsizefontSize: 30,
				//太さも 
				fontFamily: 'AppleGothic',
			},
			borderRadius:"0.8"
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
	
		signInArea.add(signInButton);
		//loginArea.add(twitterLoginButton);

		signInView.add(signInArea);	
		
		return signInView;
//	}	
};