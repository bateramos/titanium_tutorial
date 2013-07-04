var FugitiveDAO = require("api/FugitiveDAO");

function DetailWindow(fugitive) {
	
	var self = Ti.UI.createWindow({
		title: fugitive.name,
		layout: "vertical",
		barColor: '#6d0a0c',
		backgroundImage: "images/grain.png"
	});
	
	var fugitiveDAO = new FugitiveDAO();
	
	var statusFugitive = !fugitive.isBusted ? L("fugitive_status_at_large"): L("fugitive_status_cap");
	
	var statusLabel = Ti.UI.createLabel({
		text: statusFugitive
	});
	
	self.add(statusLabel);
	
	if (!fugitive.isBusted) {
		var captureButton = Ti.UI.createButton({
			titleid: "button_cap"
		});
		
		captureButton.addEventListener("click", function () {
             fugitiveDAO.bust(fugitive);
             Titanium.App.fireEvent("app:refreshFugitiveList");
             self.navigationController.back(self);
		});
		
		self.add(captureButton);
	}
	
	var deleteButton = Ti.UI.createButton({
		titleid: "button_del"
	});
	
	deleteButton.addEventListener("click", function() {
	    fugitiveDAO.remove(fugitive);
	    Titanium.App.fireEvent("app:refreshFugitiveList");
	    
	    self.navigationController.back(self);
	});
		
	self.add(deleteButton);
	
	return self;
}

module.exports = DetailWindow;