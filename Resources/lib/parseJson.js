exports.parseJson = function(json){
	// console.log(json);
	var arrayData = [];
	for(var i in json.data.records){
		var obj = {};
		obj.avatarUrl = json.data.records[i].avatarUrl;
		var comment = [];
		
		// if(records[i].comments.records.length != 0){
			// for( var j in records.comments.records){
// 				
			// }	
		// }
		
		obj.comment = comment;
		obj.created = json.data.records[i].created;
		obj.liked = json.data.records[i].liked;
		obj.description = json.data.records[i].description;
		//likes
		obj.location = json.data.records[i].location;
		obj.postId = json.data.records[i].postId;
		obj.shareUrl = json.data.records[i].shareUrl;
		obj.userId = json.data.records[i].userId;
		obj.username = json.data.records[i].username;
		obj.videoUrl = json.data.records[i].videoUrl;
		obj.thumbnailUrl = json.data.records[i].thumbnailUrl;
		
		arrayData.push(obj);
	}
	// console.log(arrayData);
	
	return arrayData;
};
