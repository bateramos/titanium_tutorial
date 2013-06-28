function AddWindow() {
	var self = Ti.UI.createWindow({
  		titleid:"add_window_title",
  		barColor: '#6d0a0c',
  		backgroundImage: "images/grain.png"
  	});
  
  	return self;
}

module.exports = AddWindow;