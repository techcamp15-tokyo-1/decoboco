exports.prepareParse = function(json){
		var str;
		// str = json.replace(/([0-9])+[,]/g,"\""+"$&"+"\"");
		// str = json.replace(/:\s([0-9]+)\[^"]$/g,function(num){
		str = json.replace(/:\s[0-9]+,/g,function(num){
			// console.log(num);
			if(num.indexOf('.') != -1){
				console.log('inin');
				console.log(num);
			}
			num = num.replace(': ','');
			num = num.replace(',', '');
			num = num.replace(' ','');
			
			// console.log(num);
			return ": \""+num+"\",";
		});
		return str;
};


