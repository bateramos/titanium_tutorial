NavigationController = function() {
	this.windowStack = [];
	this.isAndroid = bountyHunter.isAndroid;
	this.isIOS = bountyHunter.isIOS;
};

NavigationController.prototype.root = function(rootWindow) {
	this.windowStack.push(rootWindow);
	
	if(this.isIOS) {
		this.navGroup = Ti.UI.iPhone.createNavigationGroup({
			window : rootWindow
		});
		var containerWindow = Ti.UI.createWindow();
		containerWindow.navBarHidden = true;
		containerWindow.add(this.navGroup);
		
		rootWindow.navigationController = this;
		
		return containerWindow;
	}
	
	rootWindow.navigationController = this;
	
	return rootWindow;
};

NavigationController.prototype.open = function(windowToOpen) {
	this.windowStack.push(windowToOpen);

	var that = this;
	windowToOpen.addEventListener('close', function() {
		if (that.windowStack.length > 1) {
			that.windowStack.pop();
		}
	});
	windowToOpen.navBarHidden = windowToOpen.navBarHidden || false;

	if(this.windowStack.length === 0) {
		if(this.isAndroid) {
			windowToOpen.exitOnClose = true;
			windowToOpen.open();
		} else if (this.isIOS) {
			this.navGroup = Ti.UI.iPhone.createNavigationGroup({
				window : windowToOpen
			});
			var containerWindow = Ti.UI.createWindow();
			containerWindow.add(this.navGroup);
			containerWindow.open();
		}
	} else {
		if(this.isAndroid) {
			windowToOpen.open();
		} else if (this.isIOS) {
			this.navGroup.open(windowToOpen);
		}
	}
	
	windowToOpen.navigationController = this;
};

NavigationController.prototype.home = function() {
	var windows = this.windowStack.concat([]);
	for(var i = 1, l = windows.length; i < l; i++) {
		(this.navGroup) ? this.navGroup.close(windows[i]) : windows[i].close();
	}
	this.windowStack = [this.windowStack[0]];
};

NavigationController.prototype.back = function(w) {
	if(this.isAndroid) {
		w.close();
	} else if (this.isIOS) {
		this.navGroup.close(w);
	}
};

module.exports = NavigationController;