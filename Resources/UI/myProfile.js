exports.myProfile = function(json){
	var mainView = Ti.UI.createView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
		//selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,//TableViewCellSelectionStyle
		backgroundColor:"#ffffff"
	});

	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/users/me');

	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);

	xhr.send();

	xhr.onload = function(){
	    var json = JSON.parse(this.responseText);
	    if(json.error != "") alert('error');
	    else{
	    	Ti.App.fireEvent('GetProfileComplete');
	    	// console.log(json.data.records[0].videoUrl)
	    	mainView.data = createView(json);								////////////////////////////
	    	Ti.App.scrollview.views[3].add(mainView);
	    }
	};
	
	function createView(json){
		var profView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
			});
			
			var profileImage = Ti.UI.createImageView({
				left:5,
				top:315,
				width:80,
				height:80,
				//image:json.data.records[i].avatarUrl
			});
			
			var usernameLabel = Ti.UI.createLabel({
				left:55,
				top:315,
				//text:json.data.records[i].username,
				font: { fontSize: 15, fontFamily: 'AppleGothic', } ,
				textAlign: 'left',
				color:"#111"
			});
			
			var buttonView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
				top:2,
				bottom:5,
				layout:"horizontal"
			});
					
			createImages = function(title,left){
			var button = Ti.UI.createButton({
				color : "#ffffff",
				title : title,
				left:left,
				width:"25%",
			    height:"10%",
			});
			return button;
		};

		var followersButton = createImages("FOLLOWERS","25%");
		var followingButton = createImages("FOLLOWING",0);
				
			followersButton.addEventListener('singletap',function(){
				console.log("Followers");
			});
			followersButton.addEventListener('singletap',function(){
				console.log("Following");
			});			
	
		buttonView.add(followersButton);
		buttonView.add(followingButton);	
		
		
		mainView.add(buttonView);
			
	}
	

};