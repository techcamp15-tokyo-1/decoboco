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

var channelData = [
			{
		    title:"Comedy",
		    hasChild:true,
		    dest:"come"
			},
			
			{
		    title:"Art&Experimental",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Cats",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Dogs",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Family",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Beauty & Fashion",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Health & Fitness",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Nature",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Music",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"News & Politics",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Special FX",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Sports",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"Urban",
		    hasChild:true,
		    dest:""
			},
			
			{
		    title:"wier d",
		    hasChild:true,
		    dest:""
			},
];
};