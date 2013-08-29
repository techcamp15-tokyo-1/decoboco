exports.tableTemplete = function(dataArray){
	var tableView = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor:"#F5F1E9",
		prependMovie:"none",
		old_row:"null",
		leastId:0,
	});
	
	var  tableViewData= {new_data:'',
						 reload_flg:false,
						 first_flg:false,
						 lastDistance:0,
						 upper_reloading:false,
						 pulling:false
						};
	
	tableView.addEventListener('singletap',function(e){
		// console.log('log  '+e.source.video);
		if(e.source == '[object TiUIImageView]'){
			if(tableView.prependMovie != "none"){
				tableView.prependMovie.stop();
				tableView.prependMovie = e.source.video;
				console.log(e.source.video);
				console.log(tableView.prependMovie);
				console.log("-------------------------------------------------------");
			}
			
			//すでに一回再生していた場合追加する必要性がないため存在の確認
			if(e.source.video == undefined){
				var video = Ti.Media.createVideoPlayer({
				    backgroundColor : 'black',
				    top:4,
				    height : 300,
				    width : 300,
				    movieControlMode: Titanium.Media.VIDEO_CONTROL_HIDDEN,
				    mediaControlStyle: Titanium.Media.VIDEO_CONTROL_NONE,
				    scalingMode:Titanium.Media.VIDEO_SCALING_NONE,
				    url : e.source.videoUrl,
				    autoplay:false,
				    // borderColor:"#ff0000",
				});
				
				var act = require('UI/actind').actind();
				e.source.add(act);
				act.show();
				
				video.addEventListener('mediatypesavailable',function(){
					// e.source.remove(act);
					act.hide();
					// act = null;
					video.play();
					e.source.add(video);
					tableView.prependMovie = video;
				});
				
				e.source.video = video;	
				
			}
			else{				
				var animation = Ti.UI.createAnimation({
					opacity:1,
					duration:1
				});
				
				//opacityを１にする
				e.source.video.animate(animation);
				animation.addEventListener('complete',function(){
					e.source.video.play();
					console.log(e.source.video);
					console.log("---------------------else video start--------------");
					animation = null;
				});
			}
			
			e.source.video.addEventListener('complete',function(){
				e.source.video.stop();
				console.log("----------------------video complete-----------------");
				var animation2 = Ti.UI.createAnimation({
					opacity:0,
					duration:1
				});
				e.source.video.animate(animation2);
				animation2 = null;
			});
			
			// e.source.video.addEventListener('playing',function(e){
			// console.log(e);
			// });
		}
	});

	tableView.data = require('UI/timelineTemplete').createRow(dataArray);

	////////////////////上更新 pull down to refresh //////////////////////////////////
    tableView.headerPullView = require('UI/pullToDown').pull_to_down(); //UIの参照
    
    tableView.addEventListener('scroll',function(e){
	    var offset = e.contentOffset.y;
	    if (offset < -70.0 && !tableViewData.pulling && !tableViewData.reloading){
		    var t = Ti.UI.create2DMatrix();
		    t = t.rotate(-180);
		    tableViewData.pulling = true;
		    tableView.headerPullView.arrow.animate({transform:t,duration:180});
		    tableView.headerPullView.statusLabel.text = "Release to refresh...";
	    }
	    else if((offset > -70.0 && offset < 0 ) && tableViewData.pulling && !tableViewData.reloading){
		    tableViewData.pulling = false;
		    var t = Ti.UI.create2DMatrix();
		    tableView.headerPullView.arrow.animate({transform:t,duration:180});
		    tableView.headerPullView.statusLabel.text = "Pull down to refresh...";
	    }    
    });

    tableView.addEventListener('dragEnd', function(){	
	    if(tableViewData.pulling && !tableViewData.reloading){
		    tableViewData.reloading = true;
		    tableViewData.pulling = false;
		    // statusLabel.text = "Reloading...";
		    tableView.setContentInsets({top:60},{animated:true});
		    tableView.scrollToTop(-60,true);
		    tableView.headerPullView.arrow.transform = Ti.UI.create2DMatrix();	        
		    tableView.fireEvent('upReload');
		    // tableView.leastId = data[data.length].postId;
		    
		    tableView.setContentInsets({top:0},{animated:true});
	        tableView.headerPullView.statusLabel.text = "Pull down to refresh...";
	        tableView.headerPullView.arrow.show();
	        tableViewData.reload_flg = false;
	        tableViewData.reloading = false;
	    }
    });
    
    //下更新
    tableView.addEventListener('scroll',function(e){
	    var offset = e.contentOffset.y; // テーブルの見えてる部分の位置（上)
        var height = e.size.height; // テーブルの見えてる部分のサイズ(画面内の）固定
        var total = offset + height; // テーブルの見えている部分の位置（下）
        var theEnd = e.contentSize.height; 
        var distance = theEnd - total; // テーブル全体の底辺からの今見えてる部分の距離
        if (distance < tableViewData.lastDistance){
            var nearEnd = theEnd;

            // 更新中じゃなく、テーブルのサイズの99％以上までスクロールしたら。
            if (!tableViewData.reload_flg && (total >= nearEnd)){
				// var actind = require('UI/UI_option').actind();
				// actind.show();
				// Ti.App.win_base.add(actind);
				tableView.fireEvent('underReload');
		        tableViewData.reload_flg = false;
		        
            }         
            //home_time_line_data.lastDistance = distance; //現在の距離を保存する。
        }
        tableViewData.lastDistance = distance; //現在の距離を保存する。
    });
    
	return tableView;
};


exports.createRow = function(dataArray){
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
				text:dataArray[i].description, 
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
			// console.log(e);
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
				postId:dataArray[i].postId
			});
			
			deleteButton.addEventListener('singletap',function(e){
				console.log(e);
				// require('lib/vineAPI').myPostDelete(e.source.postId);
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
};