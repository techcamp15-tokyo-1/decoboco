exports.myTimeline = function(json){
	var tableview = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
	});
	
	tableview.addEventListener('click',function(e){
		if(e.source == '[object TiUIImageView]'){
			//すでに一回再生していた場合追加する必要性がないため存在の確認
			if(e.source.video == undefined){
				var video = Ti.Media.createVideoPlayer({
				    backgroundColor : 'black',
				    height : 300,
				    width : 300,
				    // mediaControlStyle : Titanium.Media.VIDEO_CONTROL_DEFAULT,
				    mediaControlStyle: Titanium.Media.VIDEO_CONTROL_NONE,
				    scalingMode:Titanium.Media.VIDEO_SCALING_NONE,
				    url : e.source.videoUrl,
				    autoplay:true,
				    // borderColor:"#ff0000",
				});
				e.source.add(video);
				video.play();
				e.source.video = video;	
			}
			else{
				var animation = Ti.UI.createAnimation({
					opacity:1,
					duration:150	
				});
			
				//opacityを１にする
				e.source.video.animate(animation);
				animation.addEventListener('complete',function(){
					e.source.video.play();
					animation = null;
				});
				
			}
			e.source.video.addEventListener('complete',function(){
				var animation2 = Ti.UI.createAnimation({
					opacity:0,
					duration:150
				});
				e.source.video.animate(animation2);
				animation2 = null;
			});
		}
	});
	
	var xhr = Ti.Network.createHTTPClient();
	var str = Ti.App.key.split('-');
	xhr.open('GET','https://api.vineapp.com/timelines/users/'+str[0]);
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
	    var json = JSON.parse(this.responseText);
	    if(json.error != "") alert('error');
	    else{
	    	Ti.App.fireEvent('userTimeLineComplete');
	    	// console.log(json.data.records[0].videoUrl);
	    	tableview.data = createRow(json);
	    	Ti.App.scrollview.views[0].add(tableview);
	    }
	};
	
	
	function createRow(json){
		var rowArray = [];
		for(var i in json.data.records){
			var row = Ti.UI.createTableViewRow({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
			});
			row.hide();
			
			var view = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
			});
			row.add(view);
			
			// if(i == 0){
				// console.log(json.data.records[i]);
			// }
			// console.log(json.data.records[i]);
			
			var videoView = Ti.UI.createImageView({
				top:5,
				height:300,
				width:300,
				image:json.data.records[i].thumbnailUrl,
			});
			
			/*
			 構造
			 
			 5px
			 ============================================
			 
			 
			 
			 	videoを再生する場所
			 
			 
			 
			 ============================================
			 10px         =======投稿時間===================
			 ======= 5px ============== 
			 profile      username
			 image       ==============
			 =======       5px
			             =================================
			                        投稿コメント
			             
			             =================================
			             5px
			             =================================
			             			各種ボタン
			             =================================     
			 */
			
			//整形させる
			var day = json.data.records[i].created.split('T');
			var day_parts = day[0].split('-');
			var time = day[1].split(':');
			
			// console.log(day_parts);
			
			// +9hさせる
			
			var timeLabel = Ti.UI.createLabel({
				right:5,
				top:305,
				text:day_parts[0]+" "+day_parts[1]+" "+day_parts[2]+" "+time[0]+":"+time[1],
				font: { fontSize: 14, fontFamily: 'AppleGothic', } ,
				textAlign: 'right',
				color:"#111",
			});
			
			var profileImage = Ti.UI.createImageView({
				left:5,
				top:315,
				width:45,
				height:45,
				image:json.data.records[i].avatarUrl
			});
			
			var usernameLabel = Ti.UI.createLabel({
				left:55,
				top:315,
				text:json.data.records[i].username,
				font: { fontSize: 18, fontFamily: 'AppleGothic', } ,
				textAlign: 'left',
				color:"#111"
			});
			
			//コメントの高さが可変長なためコメントの高さを最小に押さえてその下にボタンのviewをはる 
			var verticalView = Ti.UI.createView({
				top:345,
				left:55,
				width:Titanium.Platform.displayCaps.platformWidth - 55 - 5, //-5 は右の空白分
				height:Ti.UI.SIZE,
				borderColor:"#ff00ff",
				layout:"vertical"
			});
			
			if(json.data.records[i].description != null){
				var commentLabel = Ti.UI.createLabel({
					left:0,
					top:0,
					text:json.data.records[i].description,
					font: { fontSize: 20, fontFamily: 'AppleGothic', } ,
					textAlign: 'left',
					color:"#111"
				});	
				verticalView.add(commentLabel);
			}
			
			var buttonView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
				top:2,
				layout:"horizontal"
			});
			
			var likeButton = Ti.UI.createButton({
				title:"like",
				width:45,
				height:25,
				left:0
				
			});
			
			likeButton.addEventListener('singletap',function(){
				console.log("like");
			});
			
			var commentButton = Ti.UI.createButton({
				title:"comment",
				left:10,
				width:45,
				height:25,
			});
			
			//copy this row's url
			var shareButton = Ti.UI.createButton({
				title:"share",
				left:10,
				width:45,
				height:25,
			});
			
			buttonView.add(likeButton);
			buttonView.add(commentButton);
			buttonView.add(shareButton);
			
			//もし自分の投稿なら消すボタンの設置
			if(Ti.App.username == json.data.records[i].username){
				var deleteButton = Ti.UI.createButton({
					title:"delete",
					left:10,
					width:45,
					height:25,
				});
				buttonView.add(deleteButton);
			}
			
			verticalView.add(buttonView);
			
			view.add(timeLabel);
			view.add(profileImage);
			view.add(usernameLabel);
			view.add(verticalView);
			
			videoView.videoUrl = json.data.records[i].videoUrl;
			view.add(videoView);
			row.show();
			rowArray.push(row);
		}
		return rowArray;
	}
};

