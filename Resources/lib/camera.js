exports.camera = function(){
	console.log('in');
	
	Titanium.Media.showCamera({
	    success: function(event){
	        var video = event.media;
	        movieFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory,'mymovie.mov');
	        movieFile.write(video);
	    },
	    cancel:function(){
	    },
	    error:function(error){
	        // create alert
	        var a = Titanium.UI.createAlertDialog({title:'Video'});
	
	        // set message
	        if (error.code == Titanium.Media.NO_VIDEO){
	            a.setMessage('Device does not have video recording capabilities');
	        }
	        else{
	            a.setMessage('Unexpected error: ' + error.code);
	        }
	        a.show();
	    },
	    mediaTypes: Titanium.Media.MEDIA_TYPE_VIDEO,
	    videoMaximumDuration:10000,
	    videoQuality:Titanium.Media.QUALITY_HIGH
	});
};
