var FugitiveDAO = require("api/FugitiveDAO");

function BountyTable(isBustedTable) {
    this.isBustedTable = isBustedTable;
    this.tableView = Ti.UI.createTableView({
        backgroundColor: 'transparent'
    });
  
    this.loadData();
  
    return this;
}

BountyTable.prototype = {
    loadData: function () {
        this.tableView.setData([]);
        
        var rows = [];
        var data = new FugitiveDAO().list(this.isBustedTable);
          
        for (var index = 0; index < data.length; index++) {
            var row = Ti.UI.createTableViewRow({
                className: "forumEvent",
                height: 50,
                rowIndex:index,
                data: data[index]
            });
            
            var textField = Ti.UI.createLabel({
                left:10,
                color: "white",
                text:data[index].name
            });
            
            row.add(textField);
            row.hasChild = true;
            
            rows.push(row);
        }
      
        this.tableView.setData(rows);
    }
};


module.exports = BountyTable; 