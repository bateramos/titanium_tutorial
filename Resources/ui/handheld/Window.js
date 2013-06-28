var BountyTable = require("ui/common/BountyTable");
var DetailWindow = require("ui/common/DetailWindow");
var AddWindow = require("ui/common/AddWindow");

function Window(isFugitiveWindow){
	var title = isFugitiveWindow ? L("tab_bar_title_fug") : L("tab_bar_title_cap");

    var self = Titanium.UI.createWindow({
		title: title,
		barColor: '#6d0a0c',
		backgroundImage: "images/grain.png"
	});
	
	self.navigationController = new NavigationController();
	
	if (isFugitiveWindow) {
		var table = new BountyTable(isFugitiveWindow);
		
		table.addEventListener("click", function() {
	  		var fugitive = {name: "Fulano", stillAtLarge: true};
	  		
			self.navigationController.open(new DetailWindow(fugitive));
		});
		
		self.add(table);
		
		if (bountyHunter.isIOS) {
			var addButton = Ti.UI.createButton({
				title:"Add"
			});
			
			addButton.addEventListener("click", function() {
				self.navigationController.open(new AddWindow());
			});
			
			self.rightNavButton = addButton;
		} else if (bountyHunter.isAndroid) {
			self.activity.onCreateOptionsMenu = function(event) {
				var menu = event.menu;
				var menuItem = menu.add({ 
					title: "Add", 
				    showAsAction: Ti.Android.SHOW_AS_ACTION_IF_ROOM
				});
				menuItem.addEventListener("click", function(e) {
					self.navigationController.open(new AddWindow());
				});
			}
		}
	}
	
	return self;
}

module.exports = Window;