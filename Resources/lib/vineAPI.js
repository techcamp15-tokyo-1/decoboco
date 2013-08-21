exports.vineLogin = function(username,passwd){
	
	var xhr = Ti.Network.createHTTPClient();
	//login
	xhr.open('POST','https://api.vineapp.com/users/authenticate');
	
	xhr.send({
	    username: username,
	    password: passwd
	});
	
	xhr.onload = function(){
	    var json = JSON.parse(this.responseText);
	    if(json.error != "") alert('error');
	    else{
	    	Ti.App.key = json.data.key;
	    	Ti.App.userId = json.data.userId;
	    }
	    Ti.App.fireEvent('loginComplete');
	};
}

exports.vinePopularTimeLine = function(){
	var xhr = Ti.Network.createHTTPClient();
	xhr.open('GET','https://api.vineapp.com/timelines/popular?size=1');
		
	// xhr.setRequestHeader('user-agent','com.vine.iphone/1.0.3 (unknown, iPhone OS 6.1.0, iPhone, Scale/2.000000)');
	xhr.setRequestHeader('vine-session-id',Ti.App.key);
	
	xhr.send();
	
	xhr.onload = function(){
	    var json = JSON.parse(this.responseText);
	    if(json.error != "") alert('error');
	    else{
	    	//result
	    	console.log(json);
	    }
	};
}

exports.userTimeLine = function(){
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
	    	return json;
	    }
	};
}
