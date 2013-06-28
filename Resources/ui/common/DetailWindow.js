function DetailWindow(fugitive) {
	
	var self = Ti.UI.createWindow({
		title: fugitive.name,
		layout: "vertical",
		barColor: '#6d0a0c',
		backgroundImage: "images/grain.png"
	}); 
	
	var statusFugitive = fugitive.stillAtLarge ? L("fugitive_status_at_large"): L("fugitive_status_cap");
	
	var statusLabel = Ti.UI.createLabel({
		text: statusFugitive
	});
	
	self.add(statusLabel);
	
	if (fugitive.stillAtLarge) {
		var captureButton = Ti.UI.createButton({
			titleid: "button_cap"
		});
		
		self.add(captureButton);
	}
	
	var deleteButton = Ti.UI.createButton({
		titleid: "button_del"
	});
		
	self.add(deleteButton);
	
	return self;
}

module.exports = DetailWindow;