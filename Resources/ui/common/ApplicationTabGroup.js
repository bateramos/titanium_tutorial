var Window = require("ui/handheld/Window");
var NavigationController = require("ui/common/NavigationController");

function ApplicationTabGroup() {
	var self = Titanium.UI.createTabGroup(); 

	var fugitiveNavigationController = new NavigationController();
  	var windowFugitives = new Window(false);
	var rootView = fugitiveNavigationController.root(windowFugitives);
		  	
  	var windowCaptured = new Window(true);
	  	
  	var tabFugitives = Titanium.UI.createTab({
  		title: L("tab_bar_title_fug"),
  		icon:'KS_nav_ui.png',
  		window: rootView
  	});
	  	
  	var tabCaptured = Titanium.UI.createTab({
  		title: L("tab_bar_title_cap"),
  		icon: "KS_nav_ui.png",
  		window: windowCaptured
  	});
	
  	self.addTab(tabFugitives);
  	self.addTab(tabCaptured);
	  		  	
	return self;
}

module.exports = ApplicationTabGroup;