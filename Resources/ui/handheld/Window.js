var BountyTable = require("ui/common/BountyTable");
var DetailWindow = require("ui/common/DetailWindow");
var AddWindow = require("ui/common/AddWindow");

var FugitiveWebservice = require("api/FugitiveWebservice");
var FugitiveDAO = require("api/FugitiveDAO");

function Window(isBustedWindow){
	var title = !isBustedWindow ? L("tab_bar_title_fug") : L("tab_bar_title_cap");

    var self = Titanium.UI.createWindow({
		title: title,
		barColor: '#6d0a0c',
		backgroundImage: "images/grain.png"
	});
	
	self.navigationController = new NavigationController();
	
	var table = new BountyTable(isBustedWindow);
	
    if (!isBustedWindow) {
        table.tableView.addEventListener("click", function(clickedTableView) {
            var fugitive = clickedTableView.rowData.data;
            self.navigationController.open(new DetailWindow(fugitive));
        });
        
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
                menuItem.addEventListener("click", function() {
                    self.navigationController.open(new AddWindow());
                });
            };
        }
        
        this.loadFugitive(self);
    }
    
    Titanium.App.addEventListener("app:refreshFugitiveList", function () {
        table.loadData();
    });
    
    self.add(table.tableView);
    
	return self;
};

Window.prototype = {
    disableComponents: function(window) {
        var childViews = window.children;
        
        for (var index = 0; index < childViews.length; index++) {
            childViews[index].setTouchEnabled(false);
        }
    },
    enabledComponents: function(window) {
        var childViews = window.children;
        
        for (var index = 0; index < childViews.length; index++) {
            childViews[index].setTouchEnabled(true);
        }
    },
    loadFugitive: function(window) {
        var dataLoaded = Titanium.App.Properties.getBool("dataLoaded", false);
        
        if (dataLoaded) {
            return;
        }
        
        this.disableComponents(window);
        
        var webservice = new FugitiveWebservice();
        
        var enableComponentsFunction = this.enabledComponents;
        
        var onComplete = function(event) {
            var fugitives = JSON.parse(event.source.responseText);
            
            var fugitiveDAO = new FugitiveDAO();
            fugitiveDAO.addAll(fugitives);
            
            Titanium.App.Properties.setBool("dataLoaded", true);
            enableComponentsFunction(window);
            
            Titanium.App.fireEvent("app:refreshFugitiveList");
        };
        
        var onFail = function() {
            enableComponentsFunction(window);
            alert("Erro");
        };
        
        webservice.getFugitives(onComplete, onFail);
    }
};

module.exports = Window;