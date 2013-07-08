var Fugitive = require("entity/Fugitive");

var DatabaseInstrument = require("instrument/DatabaseInstrument");

var TRUE_VALUE = 1;
var FALSE_VALUE = 0;

function FugitiveDAO() {
	DatabaseInstrument.instrumentDatabaseOpen(this, ["list", "add", "addAll", "remove", "updatePhoto", "bust"]);
};

FugitiveDAO.prototype.list = function(isBusted) {
	var sql = 'SELECT ID, NAME, PHOTOURL FROM FUGITIVE WHERE ISBUSTED = ?';
	var fugitives = [];
	
	var rows = null;
	
	try {
	    rows = this.connection.execute(sql, isBusted ? 1 : 0);
	    
	    while(rows.isValidRow()) {
	        var id = rows.fieldByName("ID");
	        var name = rows.fieldByName("NAME");
	        var photoURL = rows.fieldByName("PHOTOURL");
	        
	        var fugitive = new Fugitive(id, name, isBusted, photoURL);
	        fugitives.push(fugitive);
	        rows.next();
	    }
	} finally {
	    if (rows) {
	        rows.close();
	    }
	}
	
    return fugitives;
};

FugitiveDAO.prototype.add = function(fugitive) {
	var sql = 'INSERT INTO FUGITIVE (NAME, ISBUSTED) VALUES (?,?)';
	
	this.connection.execute(sql, fugitive.name, fugitive.isBusted ? 1 : 0);
};

FugitiveDAO.prototype.addAll = function(fugitives) {
    var sql = 'INSERT INTO FUGITIVE (NAME, ISBUSTED) VALUES (?,?)';
    
    for (var index = 0; index < fugitives.length; index++) {
        this.connection.execute(sql, fugitives[index].name, FALSE_VALUE);
    }
};

FugitiveDAO.prototype.remove = function(fugitive) {
	var sql = 'DELETE FROM FUGITIVE WHERE ID = ?';
	
	this.connection.execute(sql, fugitive.id);
};

FugitiveDAO.prototype.updatePhoto = function(fugitive) {
    var sql = "UPDATE FUGITIVE SET PHOTOURL = ? WHERE ID = ?";
    
    this.connection.execute(sql, fugitive.photoUrl, fugitive.id);
};

FugitiveDAO.prototype.bust = function(fugitive) {
	var sql = 'UPDATE FUGITIVE SET isBusted = ? WHERE ID = ?';
	
	this.connection.execute(sql, TRUE_VALUE, fugitive.id);
};

module.exports = FugitiveDAO;