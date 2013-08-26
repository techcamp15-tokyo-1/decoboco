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
		var profView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				layout:"vertical",
				top:0,
				color:"#ffffff"
			});

			console.log(json);
			
			var profileImage = Ti.UI.createImageView({
				Align:'center',
				top:"3%",
				borderColor:"#345600",
				width:90,
				height:90,
				image:json.data.avatarUrl
			});
			
			var usernameLabel = Ti.UI.createLabel({
				top:"3%",
				text:json.data.username,
				font: { fontSize: 20, fontFamily: 'AppleGothic', } ,
				textAlign: 'center',
				color:"#000"
			});
			
			var userIdLabel = Ti.UI.createLabel({
				top:"1%",
				text:"@"+json.data.username,
				font: { fontSize: 12, fontFamily: 'AppleGothic', } ,
				textAlign: 'center',
				color:"#000"
			});
			
			var profileTextLabel = Ti.UI.createLabel({
				top:"5%",
				width:"60%",
				height:Ti.UI.SIZE,
				
				text:"Twitter/Facebook/Mr.Chirdren/Mr.Babies/takumi/abcde/fghij/klmno/pqrst/uvwxy/z",
				// text:json.data.records.username;
				font: { fontSize: 15, 
						fontFamily: 'AppleGothic',
						} ,
				//textAlign:'center',
				color:"#000",
				
			});
			
			var buttonView = Ti.UI.createView({
				width:Ti.UI.FILL,
				top:"10%",
				height:35,
				// top:,
				// bottom:,
				layout:"horizontal"
			});
			
			createLabel = function(text,left){
				var button = Ti.UI.createLabel({
					color : "#000000",
					backgroundColor:"#00ccff",
					borderColor:"#345600",
					font: { fontSize: 15, 
							fontFamily: 'AppleGothic', 
							} ,
					text : text,
					textAlign:'center',
					left:left,
					width:"40%",
				    height:30
				});
				return button;
			};

		var followersButton = createLabel("FOLLOWERS","10%");
		var followingButton = createLabel("FOLLOWING","2%");
				
			followersButton.addEventListener('singletap',function(){
				console.log("Followers");
			});
			followingButton.addEventListener('singletap',function(){
				console.log("Following");
			});			
		
		profView.add(profileImage);
		profView.add(usernameLabel);
		profView.add(userIdLabel);
		profView.add(profileTextLabel);

		
		buttonView.add(followersButton);
		buttonView.add(followingButton);	
		
		profView.add(buttonView);
	return profView;
	}
};