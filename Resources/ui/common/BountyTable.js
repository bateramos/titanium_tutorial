function BountyTable(isFugitiveTable) {
  
  var rows = [];
  var data = [{title: "Teste"}, {title: "Teste 2"}];
  
  for (var index = 0; index < data.length; index++) {
  	var row = Ti.UI.createTableViewRow({
  		className: "forumEvent",
  		height: 50,
  		rowIndex:index
  	});
  	
  	var textField = Ti.UI.createLabel({
  		left:10,
  		color: "white",
  		text:data[index].title
  	});
  	
  	row.add(textField);
  	row.hasChild = true;
  	
  	rows.push(row);
  }
  
  var self = Ti.UI.createTableView({
  	backgroundColor: 'transparent',
  	data: rows
  });
  
  return self;
}


module.exports = BountyTable; 