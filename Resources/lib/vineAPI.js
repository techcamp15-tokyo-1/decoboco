exports.vineSignUp = function(email,password,username){

	var xhr = Ti.Network.createHTTPClient();
	//login
	xhr.open('POST','https://api.vineapp.com/users');
	// xhr.setRequestHeader('vine-session-id',Ti.App.key);
	// xhr.open('POST','https://api.vineapp.com/users?authenticate=');
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.1.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	
	xhr.send({
		username:username,
		password:password,
		email:email,
		authenticate:1,
	});

	xhr.onload = function(){
		var str = require('lib/prepareParse').prepareParse(this.responseText);
		// console.log(this.responseText);
		var json = JSON.parse(str);
		
	    if(json.error != "") alert('error');
	    else{
	    	
			Ti.App.key = json.data.key;
	    	Ti.App.username = json.data.username;
	    	Ti.App.fireEvent('loginComplete');
	    }
	};
};




exports.vineLogin = function(username,password){
	
	var xhr = Ti.Network.createHTTPClient();
	//login
	xhr.open('POST','https://api.vineapp.com/users/authenticate');
	
	xhr.send({
	    username: username,
	    password: password
	});
	
	xhr.onload = function(){
		var str = require('lib/prepareParse').prepareParse(this.responseText);
		var json = JSON.parse(str);
	    if(json.error != "") alert('error');
	    else{
	    	// console.log(json);
	    	Ti.App.key = json.data.key;
	    	Ti.App.username = json.data.username;
	    	Ti.App.password = password;
	    	Ti.App.email = username;
	    	Ti.App.fireEvent('loginComplete');
	    }
	};
};

exports.vineGraphTimeLine = function(){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/timelines/graph');
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
		// var json = JSON.parse(this.responseText);
		console.log(this.responseText);
		var str = require('lib/regex').prepareParse(this.responseText);
		console.log(str);
		var json = JSON.parse(str);
	    if(json.error != "") alert('error');
	    else{
	    	var data = require('lib/parseJson').parseJson(json);
	    	// console.log(require('UI/timelineTemplete').tableTemplete(data));
	    	Ti.App.scrollview.views[0].add(require('UI/timelineTemplete').tableTemplete(data));
	    }
	};
};


exports.vineExploreTimeLine = function(channelId){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/timelines/channels/'+channelId+'/recent');
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
		// var json = JSON.parse(this.responseText);
		console.log(this.responseText);
		var str = require('lib/regex').prepareParse(this.responseText);
		console.log(str);
		var json = JSON.parse(str);
	    if(json.error != "") alert('error');
	    else{
	    	var data = require('lib/parseJson').parseJson(json);
	    	// console.log(require('UI/timelineTemplete').tableTemplete(data));
	    	Ti.App.scrollview.views[0].add(require('UI/explore').tableTemplete(data));
	    }
	};
};





exports.vinePopularTimeLine = function(){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/timelines/popular?size=1');
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
		// var str = require('lib/prepareParse').prepareParse(this.responseText);
		// var json = JSON.parse(str);
	    // if(json.error != "") alert('error');
	    // else{
	    // //result
		// // console.log(json);
		// // return json;
	    // }
	};
};


// var str = require('lib/prepareParse').prepareParse(this.responseText);
// var json = JSON.parse(str);

//me 
exports.myProfile = function(){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/users/me');
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
		var str = require('lib/regex').prepareParse(this.responseText);
		var json = JSON.parse(str);
	    if(json.error != "") alert('error');
	    else{
	    	
	    	xhr = null;
	    	// console.log(json);
	    	// return json;
	    }
	};
};

// 
// exports.userData = function(userid){/////////error
// var xhr = Ti.Network.createHTTPClient();
// xhr.open('GET','https://api.vineapp.com/users/profiles/'+userid);
// console.log(userid);
// // xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
// 	
// xhr.setRequestHeader('vine-session-id',Ti.App.key);
// 	
// xhr.send();
// 	
// xhr.onload = function(){
// var str = require('lib/prepareParse').prepareParse(this.responseText);
// var json = JSON.parse(str);
// if(json.error != "") alert('error');
// else{
// xhr = null;
// console.log(json);
// // return json;
// }
// };
// };


exports.tag = function(tag){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/timelines/tags/'+tag);//<tag>
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
		var str = require('lib/prepareParse').prepareParse(this.responseText);
		var json = JSON.parse(str);
	    if(json.error != "") alert('error');
	    else{
	    	Ti.App.fireEvent('userTagComplete');
	    	// console.log(json);
	    	return json;
	    }
	};
};


exports.singlePost = function(postid){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/timelines/posts/'+str[0]+'/thumbs');//<postid>
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
		var str = require('lib/prepareParse').prepareParse(this.responseText);
		var json = JSON.parse(str);
	    if(json.error != "") alert('error');
	    else{
	    	Ti.App.fireEvent('singlePostComplete');
	    	return json;
	    }
	};
};

exports.PostLike = function(id){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('POST','https://api.vineapp.com/posts/'+id+'/likes');//<postid>
	
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
		var str = require('lib/prepareParse').prepareParse(this.responseText);
		var json = JSON.parse(str);
	    if(json.error != "") alert('error');
	    else{
	    	console.log(json);
	    }
	};	
};

