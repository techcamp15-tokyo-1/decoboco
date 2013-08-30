exports.myProfile = function(){

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
	    	// console.log(json);
	    	// console.log(json.data.records[0].videoUrl)
	    	var v = createView(json);								
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
		
		var thumbView = Ti.UI.createView({
			width:125,
			height:125,
			top:"5%",
			Align:'center',
			// backgroundColor:"#ffffff",
			borderRadius:5,
			borderColor:"#111"
		});
		
		var profileImage = Ti.UI.createImageView({
			Align:'center',
			top:"6%",
			borderColor:"#DED7CF",
			width:110,
			height:110,
			image:json.data.avatarUrl,
			//borderRadius: 8
		});
		
		thumbView.add(profileImage);
		
	    ///////////  setting ////////////////////////////////////
// 	    
		// var settingButton = Ti.UI.createImageView({
			// width:20,
			// height:20,
			// backgroundColor:"#F5F1E9",
			// image:"images/cog.png",
			// left:"90%",
			// top:10
		// });
// 
		// var underSetView = Ti.UI.createView({
			// width:Ti.UI.FILL,
			// height:"100%",
			// //backgroundColor:"#000000",
			// opacity:0,
		// });
// 		
		// var setView = Ti.UI.createView({
			// width:"40%",
			// height:"60%",
			// top:80,
			// left:100,
			// layout:"vertical",
			// backgroundColor:"#666666",
			// opacity:0.8
// 			
			// //bubbleParent:true,
			// //false
			// //zindex:100000000000000
		// });
// 		
		// var setButton = function(top,title){
			// var setButton = Ti.UI.createLabel({
				// textAlign:"center",
				// top:top,
				// left:10,
				// text:title,
				// textAlign:"center",
				// widht:300,
				// height:"25%",
				// backgroundColor:"#222222",
				// opacity:1,
				// //bubbleParent:false
			// });
			// return setButton;
		// };
// 		
		// var fixButton = setButton("6%","setting");
		// var logoutButton = setButton("5%","logout");
		// var cancelButton = setButton("5%","cancel");
// 		
// 		
		// profView.add(settingButton);
		// setView.add(fixButton);
		// setView.add(logoutButton);
		// setView.add(cancelButton);
		// underSetView.add(setView);
		
		// var animation = Ti.UI.createAnimation({
			// opacity:0.8,
			// duration:250
		// });
		// Ti.App.scrollview.views[Ti.App.scrollview.currentPage].add(underSetView);
		// underSetView.animate(animation);
		// animation = null;
// 		
// 
		// settingButton.addEventListener('singletap',function(){
// 			
// 			
// 			
			// var animation = Ti.UI.createAnimation({
				// opacity:0.8,
				// duration:250
			// });
			// Ti.App.scrollview.views[Ti.App.scrollview.currentPage].add(underSetView);
			// underSetView.animate(animation);
			// animation = null;
// 			
		// });
// 		
// 		
		// logoutButton.addEventListener('singletap',function(){
// 			
		// });
		
		
		
		// cancelButton.addEventListener('singletap',function(){
			// underSetView.hide();
		// });
		

        // 
		// setView.add(logoutButton);
		// // setView.add(cancelButton);
		// underSetView.add(setView);
        // 			
		//profView.add(underSetView);
		
		
		
		
		
		
		var usernameLabel = Ti.UI.createLabel({
			top:"3%",
			left:75,
			text:json.data.username,
			font: { fontSize: 25, fontWeight:'bold', fontFamily: 'AppleGothic', } ,
			textAlign: 'left',
			color:"#2c3e50"
		});
		
		
		var profileTextLabel = Ti.UI.createLabel({
			top:"1%",
			width:220,
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
			height:55,
			top:"5%",
			boderColor:"#111"
			// top:,
			// bottom:,
			// layout:"horizontal",
			
		});
		
		///////////	
		
		var createLabel = function(num,text,type){
			var view = Ti.UI.createView({
				height:50,
				width:100,
				layout:"vertical",
				backgroundColor:"#34495e",//#f39c12, #93B8CA, #FDC44F, #34495e, #2c3e50
			});
			if(type == 0) view.left = "13%";
			if(type == 1) view.right = "13%";
			
			var firstLabel = Ti.UI.createLabel({
				color :"#f5e4cd",
				font: { fontSize: 14, 
						fontWeight:'bold',
						fontFamily: 'AppleGothic', 
					  } ,
				text:text,
				top:3,
				textAlign:'center',
			});
			var secondLabel = Ti.UI.createLabel({
				color :"#f5e4cd",
				font: { fontSize: 14, 
						fontWeight:'bold',
						fontFamily: 'AppleGothic', 
					  } ,
				text:num,
				top:5,
				textAlign:'center',
			});
			view.add(firstLabel);
			view.add(secondLabel);
			
			return view;
		};

        //第一引数にforrower, forrows数
		//console.log("========");
		//console.log(json.data);

		var fsNum = json.data.followerCount;
		var fgNum = json.data.followingCount; 
		
		var followersView = createLabel(fsNum,"FOLLOWERS",0);
		var followingView = createLabel(fgNum,"FOLLOWING",1);

		// var followersButton = createLabel(fsNum,"FOLLOWERS",0);
		// var followingButton = createLabel(fgNum,"FOLLOWING","3%");
		
		followersView.addEventListener('singletap',function(){
			var str = Ti.App.key.split('-');
			var xhr = Ti.Network.createHTTPClient();
			xhr.open('GET','https://api.vineapp.com/users/'+str[0]+'/followers');
			
			// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
			xhr.setRequestHeader('vine-session-id',Ti.App.key);	
			xhr.send();
			var win = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
				opacity:0,
				backgroundColor:"222"
			});
			var animation = Ti.UI.createAnimation({
				opacity:1,
				duration:200
			});
			win.animate(animation);
			animation = null;
			Ti.App.win_base.add(win);
			
			var name = Ti.UI.createLabel({
				color :"#f5e4cd",
				font: { fontSize: 16, 
						fontWeight:'bold',
						fontFamily: 'AppleGothic', 
					  } ,
				text:"followers",
				top:5,
				textAlign:'center',
				width:Ti.UI.FILL
			});
			
			var table = Ti.UI.createTableView({
				top:25,
				width:Ti.UI.FILL,
				height:Ti.UI.FILL,
			});
			
			win.add(name);
			win.add(table);
			
			/////////////////////////////////////////
			//戻るボタンの未実装
			xhr.onload = function(){
				// console.log(this.responseText);
				// console.log(JSON.parse(this.responseText));
				var json = JSON.parse(this.responseText);
				
				var array = [];
				for(var i=0;i<json.data.records.length;i++){
					array.push(makingRow(json.data.records[i].avatarUrl,json.data.records[i].username));
				}
				table.data = array;
				
			};
			
		});
		
		followingView.addEventListener('singletap',function(){
			console.log(json.data.followingCount);
		});			
		
		//profView.add(settingButton);
		
		//profView.add(setView);
		
		// settingButton.addEventListener('singletap',function(){
		// setView.show();
		// });
		
		
		profView.add(thumbView);
		profView.add(usernameLabel);
		// profView.add(userIdLabel);
		profView.add(profileTextLabel);

		
		buttonView.add(followersView);
		buttonView.add(followingView);	
		
		profView.add(buttonView);
		
		
		function makingRow(imageUrl,name){
			var row = Ti.UI.createTableViewRow({
				height:50,
				width:Ti.UI.FILL
			});
			
			var mainView = Ti.UI.createView({
				left:5,
				width:Ti.UI.FILL,
				height:50,
				layout:'horizontal',
			});
			
			var image = Ti.UI.createImageView({
				width:40,
				height:40,
				image:imageUrl
			});
			
			var name = Ti.UI.createLabel({
				left:10,
				color :"#111",
				font: { fontSize: 14, 
						fontWeight:'bold',
						fontFamily: 'AppleGothic', 
					  } ,
				text:name,
				top:5,
				textAlign:'center',
			});
			mainView.add(image);
			mainView.add(name);
			
			row.add(mainView);
			
			return row;
		}
		
	// var xhr = Ti.Network.createHTTPClient();
	// //login
	// xhr.open('GET','https://api.vineapp.com/timelines/users/me');
// 	
	// xhr.send();
// 	
	// xhr.onload = function(){
		// var str = require('lib/prepareParse').prepareParse(this.responseText);
		// var json = JSON.parse(str);
	    // if(json.error != "") alert('error');
	    // else{
	    	// console.log(this.responseText);
	    // }
	// };
	
	
	
		
	return profView;
	}
};