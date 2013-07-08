function FileUtil() {
    
};

FileUtil.prototype = {
    saveFile: function(blobOrigin, pathDestiny) {
        var destinyFile = Titanium.Filesystem.getFile(pathDestiny);
        
        destinyFile.write(blobOrigin);
    },
    getFilePathForApplicationDirectory: function(fileName) {
        var destinyFile = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, fileName);
        
        if (destinyFile.exists) {
            destinyFile.deleteFile();
        }
        
        return destinyFile.getNativePath();
    }
}

module.exports = FileUtil;
