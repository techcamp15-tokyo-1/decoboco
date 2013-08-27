exports.tableTemplete = function(dataArray){
		var tableview = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor:"#ffffff"
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
	
	tableview.data = createRow(dataArray);
	
	function createRow(dataArray){
		var rowArray = [];
		for(var i in dataArray){
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
				image:dataArray[i].thumbnailUrl,
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
			var day = dataArray[i].created.split('T');
			var day_parts = day[0].split('-');
			var time = day[1].split(':');
			
			// console.log(day_parts);
			
			// +9hさせる
			
			var timeLabel = Ti.UI.createLabel({
				right:10,
				top:305,
				text:day_parts[0]+" "+day_parts[1]+" "+day_parts[2]+" "+time[0]+":"+time[1],
				font: { fontSize: 15, fontFamily: 'AppleGothic', } ,
				textAlign: 'right',
				color:"#111",
			});
			
			var profileImage = Ti.UI.createImageView({
				left:5,
				top:315,
				width:45,
				height:45,
				image:dataArray[i].avatarUrl
			});
			
			var usernameLabel = Ti.UI.createLabel({
				left:55,
				top:315,
				text:dataArray[i].username,
				font: { fontSize: 15, fontFamily: 'AppleGothic', } ,
				textAlign: 'left',
				color:"#111"
			});
			
			//コメントの高さが可変長なためコメントの高さを最小に押さえてその下にボタンのviewをはる 
			var verticalView = Ti.UI.createView({
				top:345,
				left:55,
				width:Titanium.Platform.displayCaps.platformWidth - 55 - 5, //-5 は右の空白分
				height:Ti.UI.SIZE,
				// borderColor:"#ff00ff",
				layout:"vertical"
			});
			
			if(dataArray[i].description != null){
				var commentLabel = Ti.UI.createLabel({
					left:0,
					top:0,
					text:dataArray[i].description, //////////////////////////////////////////////////
					font: { fontSize: 17, fontFamily: 'AppleGothic', } ,
					textAlign: 'left',
					color:"#111"
				});	
				verticalView.add(commentLabel);
			}
			
			var buttonView = Ti.UI.createView({
				width:Ti.UI.FILL,
				height:Ti.UI.SIZE,
				top:2,
				bottom:5,
				layout:"horizontal"
			});
			
			
			// createImage = function(image,size){
				// var button = Ti.UI.createButton({
					// backgroundImage : image,
					// left:size,
					// width:45,
				    // height:30,
				// });
				// return button;
			// };
// 			
			// var likeButton = createImages("/images/thumbs_up.png",0);
			// var commentButton = createImages("/images/comments.png",25);
			// var shareButton = createImages("/images/shares.png",25);
// 			
			var likeButton = Ti.UI.createButton({
				//title:"like",
				backgroundImage : "/images/thumbs_up.png",
				width:20,//45
				height:20,//25
				left:10,		
				postId:dataArray[i].postId		
			});
			
			var commentButton = Ti.UI.createButton({
				//title:"comment",
				backgroundImage : "/images/comment.png",
				left:20,
				width:20,
				height:20,
			});
			
			//copy this row's url
			var shareButton = Ti.UI.createButton({
				//title:"share",
				backgroundImage : "/images/share.png",
				left:20,
				width:20,
				height:20,
			});
			
			likeButton.addEventListener('singletap',function(e){
				///// api.vimapp.com/posts/movie_id/likes
				console.log(e);
				require('lib/vineAPI').PostLike(e.source.postId);
			});

			shareButton.addEventListener('singletap',function(){
				Ti.UI.Clipboard.clearText();
				Ti.UI.Clipboard.setText(dataArray[i].shareUrl);
				
				//message 
				
			});


			buttonView.add(likeButton);
			buttonView.add(commentButton);
			buttonView.add(shareButton);
			
			//もし自分の投稿なら消すボタンの設置
			if(Ti.App.username == dataArray[i].username){
				var deleteButton = Ti.UI.createButton({
					//title:"delete",
					backgroundImage : "/images/remove.png",
					left:25,
					width:20,
					height:25,
				});
				buttonView.add(deleteButton);
			}
			
			verticalView.add(buttonView);
			
			view.add(timeLabel);
			view.add(profileImage);
			view.add(usernameLabel);
			view.add(verticalView);
			
			videoView.videoUrl = dataArray[i].videoUrl;
			view.add(videoView);
			row.show();
			rowArray.push(row);
		}
		return rowArray;
	}
	
	return tableview;
};
