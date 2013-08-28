exports.explore = function(){
	var tableview = Ti.UI.createTableView({
		width:Ti.UI.FILL,
		height:Ti.UI.FILL,	
		selectionStyle: Titanium.UI.iPhone.TableViewCellSelectionStyle.NONE,
		backgroundColor:"#ffffff"
	});
	
		var channelData = [
					{
				    title:"Comedy",
				    hasChild:true,
					},
					
					{
				    title:"Art & Experimental",
				    hasChild:true,
					},
					
					{
				    title:"Cats",
				    hasChild:true,		    
					},
					
					{
				    title:"Dogs",
				    hasChild:true,		    
					},
					
					{
				    title:"Family",
				    hasChild:true,		    
					},
					
					{
				    title:"Beauty & Fashion",
				    hasChild:true,		    
					},
					
					{
				    title:"Health & Fitness",
				    hasChild:true,		    
					},
					
					{
				    title:"Nature",
				    hasChild:true,		    
					},
					
					{
					title:"Music",
				    hasChild:true,		    
					},
					
					{
				    title:"News & Politics",
				    hasChild:true,		    
					},
					
					{
				    title:"Special FX",
				    hasChild:true,    
					},
					
					{
				    title:"Sports",
				    hasChild:true,  
					},
					
					{
				    title:"Urban",
				    hasChild:true,		    
					},
					
					{
				    title:"wier d",
				    hasChild:true,
					},
		];

};