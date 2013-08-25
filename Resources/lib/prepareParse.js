/*
 * var str = require('lib/prepareParse').prepareParse(this.responseText);
 * var json = JSON.parse(str);
 * 
*/


exports.prepareParse = function(text){
    var str = "";
	for(var i =0;i < text.length;i++){
		// console.log(str[i]);
		if(text[i] === ':' && text[i+2] == '{'){
			str += text[i];
			continue;
		}
		if(text[i] === ':' && text[i+2] != '\"'){
			// str += ":";
			// str += "\"";
			
			for(var j = i,cnt=0;;j++,cnt++){
				if(text[j] == ' ') continue;
				if(text[j] == ','){
					str += "\"";
					str += ",";
					i += cnt;
					console.log(i);
					break;
				}
				else str += text[j];
				if(j == i ) str +=  " \"";
			}
		}
		else str += text[i];
	}
	return str;
};
