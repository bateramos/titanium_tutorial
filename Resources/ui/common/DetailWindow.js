var FugitiveDAO = require("api/FugitiveDAO");
var FugitiveWebservice = require("api/FugitiveWebservice");

var FileUtil = require("api/FileUtil");

function DetailWindow(fugitive) {
	
	var self = Ti.UI.createWindow({
		title: fugitive.name,
		layout: "vertical",
		barColor: '#6d0a0c',
		backgroundImage: "images/grain.png"
	});
	
	var fugitiveDAO = new FugitiveDAO();
	
	Ti.API.info(fugitive.id + " " + fugitive.photoUrl);
	var fugitivePhoto = fugitive.photoUrl ? fugitive.photoUrl : "images/burglar.png";
	
	var fugitivePhotoView = Ti.UI.createImageView({
	    width: 100,
	    height: 75,
	    image: fugitivePhoto
	});
	
	self.add(fugitivePhotoView);
	
	var statusFugitive = !fugitive.isBusted ? L("fugitive_status_at_large"): L("fugitive_status_cap");
	
	var statusLabel = Ti.UI.createLabel({
		text: statusFugitive
	});
	
	self.add(statusLabel);
	
	if (!fugitive.isBusted) {
	    var photoModified = false;
	    
	    var addPhotoButton = Ti.UI.createButton({
	       titleid: "button_photo" 
	    });
	    
	    addPhotoButton.addEventListener("click", function() {
	        Titanium.Media.openPhotoGallery({
	           mediaTypes: Titanium.Media.MEDIA_TYPE_PHOTO,
	           success: function(event) {
	               fugitivePhotoView.image = event.media;
	               photoModified = true;
	           } 
	        });
	    });
	    
	    self.add(addPhotoButton);
	    
		var captureButton = Ti.UI.createButton({
			titleid: "button_cap"
		});
		
		captureButton.addEventListener("click", function () {
             fugitiveDAO.bust(fugitive);
             Titanium.App.fireEvent("app:refreshFugitiveList");
             
             var macAddress = Titanium.Platform.macaddress;
             var fugitiveWebservice = new FugitiveWebservice();
             
             var onComplete = function(event) {
                 var returnMessage = JSON.parse(event.source.responseText); 
                 
                 alert(returnMessage.message);  
             };
             
             fugitiveWebservice.bustFugitive(macAddress, onComplete);
             
             self.navigationController.back(self);
		});
		
		self.add(captureButton);
		
		self.addEventListener("close", function() {
		    if (photoModified) {
		        var fileUtil = new FileUtil();
		        
		        var destinyFileUrl = fileUtil.getFilePathForApplicationDirectory("fugitive" + fugitive.id + ".png");
		        
		        fileUtil.saveFile(fugitivePhotoView.image, destinyFileUrl); 
		        
		        fugitive.photoUrl = destinyFileUrl;
		        
		        fugitiveDAO.updatePhoto(fugitive);
		        
		        Titanium.App.fireEvent("app:refreshFugitiveList");
		    }
		});
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