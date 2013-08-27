/*
 * var str = require('lib/prepareParse').prepareParse(this.responseText);
 * var json = JSON.parse(str);
 * 
*/


exports.prepareParse = function(text){
    var str = "";
	for(var i =0;i < text.length;i++){
		// console.log(str[i]);
		if(text[i] === ':' && (text[i+2] == '{' || text[i+2] == '[')){
			str += text[i];
			continue;
		}
		if(text[i] === ':'  && text[i+1] === ' ' && text[i+2] != '\"'){
			// str += ":";
			// str += "\"";
			
			for(var j = i,cnt=0;;j++,cnt++){
				if(text[j] == ' ') continue;
				if(text[j] == ',' || text[j] == '}'){
					str += "\"";
					if(text[j] == '}')  str += '}';
					else str += ",";
					i += cnt;
					break;
				}
				else str += text[j];
				if(j == i ) str +=  " \"";
			}
		}
		else str += text[i];
	}
	// console.log(text);
	// console.log(str);
	return str;
};
