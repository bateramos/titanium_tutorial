var FugitiveDAO = require("api/FugitiveDAO");
var Fugitive = require("entity/Fugitive");

function AddWindow() {
	var self = Ti.UI.createWindow({
  		titleid:"add_window_title",
  		barColor: '#6d0a0c',
  		backgroundImage: "images/grain.png",
  		layout: "vertical"
  	});
  	
  	var fugitiveNameLabelValue = L("add_window_title");
    
    var fugitiveNameField = Ti.UI.createTextField({
       borderStyle: Ti.UI.INPUT_BORDERSTYLE_ROUNDED,
       width:"100%", 
       hintText : fugitiveNameLabelValue,
       height:50,
       enableReturnKey:true
    });
    
    self.add(fugitiveNameField);
    
    self.addEventListener("close", function() {
        var fugitiveName = fugitiveNameField.value;
        var hasNewFugitive = fugitiveName !== "";
        
        if (hasNewFugitive) {
            var fugitive = new Fugitive(null, fugitiveName, false);
            new FugitiveDAO().add(fugitive);
            Titanium.App.fireEvent("app:refreshFugitiveList");
        }
    });
    
  	return self;
}

module.exports = AddWindow;