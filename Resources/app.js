bountyHunter = {};
bountyHunter.osname = Ti.Platform.osname;
bountyHunter.isAndroid = bountyHunter.osname === 'android'; 
bountyHunter.isIOS = bountyHunter.osname === 'iphone';

(function() {
	Titanium.UI.setBackgroundColor('gray');
	
	var ApplicationTabGroup = require("ui/common/ApplicationTabGroup");
	
	var tabGroup = new ApplicationTabGroup();
	tabGroup.open();
})();
