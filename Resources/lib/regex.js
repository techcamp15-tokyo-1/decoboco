exports.prepareParse = function(json){
		var str;
		// str = json.replace(/([0-9])+[,]/g,"\""+"$&"+"\"");
		str = json.replace(/([0-9])+[,]/g,function(num){
			num = num.split(",");
			return "\""+num[0]+"\",";
		});
		return str;
};


