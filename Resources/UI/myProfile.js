exports.myProfile = function(json){

	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/users/me');

	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);

	xhr.send();

	xhr.onload = function(){
		var str = require('lib/prepareParse').prepareParse(this.responseText);
		var json = JSON.parse(str);

	    if(json.error != "") alert('error');
	    else{
	    	console.log("------line23------------ myprofile----------");
	    	//Ti.App.fireEvent('GetProfileComplete');
	    	//console.log(json);
	    	// console.log(json.data.records[0].videoUrl)
	    	var v = createView(json);								////////////////////////////
	    	Ti.App.scrollview.views[3].add(v);
	    }
	};
	
	function createView(json){
		
		var profView = Ti.UI.createScrollView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				layout:"vertical",
				top:0,
				backgroundColor:"#F5F1E9"//#DED7CE
			});

			// console.log(json);
			
			var profileImage = Ti.UI.createImageView({
				Align:'center',
				top:"5%",
				borderColor:"#DED7CF",
				width:130,
				height:130,
				image:json.data.avatarUrl,
				//borderRadius: 8
			});
			
			var usernameLabel = Ti.UI.createLabel({
				top:"3%",
				left:75,
				text:json.data.username,
				font: { fontSize: 25, fontWeight:'bold', fontFamily: 'AppleGothic', } ,
				textAlign: 'left',
				color:"#2c3e50"
			});
			
			// var userIdLabel = Ti.UI.createLabel({
				// top:"1%",
				// text:"@"+json.data.username,
				// font: { fontSize: 12, fontFamily: 'AppleGothic', } ,
				// textAlign: 'center',
				// color:"#000"
			// });
			
			var profileTextLabel = Ti.UI.createLabel({
				top:"1%",
				width:180,
				height:Ti.UI.SIZE,
				Align:"center",
				text:json.data.description,
				// text:json.data.records.username;
				font: { fontSize: 15, 
						fontFamily: 'AppleGothic',
						} ,
				//textAlign:'center',
				color:"#2c3e50",
				
			});
			
			var buttonView = Ti.UI.createView({
				width:Ti.UI.FILL,
				top:"5%",
				height:35,
				left:"21%",
				// top:,
				// bottom:,
				layout:"horizontal"
			});
			
			createLabel = function(text,left){
				var button = Ti.UI.createLabel({
					// color : "#0c7ced",
					color :"#ffffff",
					backgroundColor:"#FDC44F",//#f39c12, #93B8CA, #FDC44F
					//borderColor:"",
					font: { fontSize: 14, 
							fontWeight:'bold',
							fontFamily: 'AppleGothic', 
							} ,
					text:text,
					top:-2,
					textAlign:'center',
					left:left,
					width:"35%",
				    height:40,
				    //borderRadius: 10
				});
				return button;
			};

		var followersButton = createLabel("FOLLOWERS",0);
		var followingButton = createLabel("FOLLOWING","3%");
				
			followersButton.addEventListener('singletap',function(){
				console.log("Followers");
			});
			
			followingButton.addEventListener('singletap',function(){
				console.log("Following");
			});			
		
		profView.add(profileImage);
		profView.add(usernameLabel);
		// profView.add(userIdLabel);
		profView.add(profileTextLabel);

		
		buttonView.add(followersButton);
		buttonView.add(followingButton);	
		
		profView.add(buttonView);
	return profView;
	}
};