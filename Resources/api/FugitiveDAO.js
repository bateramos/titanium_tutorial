var Database = require("api/Database");
var Fugitive = require("entity/Fugitive");

var TRUE_VALUE = 1;
var FALSE_VALUE = 0;

function FugitiveDAO() {
	this.database = new Database();
};

FugitiveDAO.prototype.list = function(isBusted) {
	var connection = this.database.getConnection();
	
	var sql = 'SELECT ID, NAME FROM FUGITIVE WHERE ISBUSTED = ?';
	var fugitives = [];
	
	var rows = null;
	
	try {
	    rows = connection.execute(sql, isBusted ? 1 : 0);
	    
	    while(rows.isValidRow()) {
	        var id = rows.fieldByName("ID");
	        var name = rows.fieldByName("NAME");
	        
	        var fugitive = new Fugitive(id, name, isBusted);
	        fugitives.push(fugitive);
	        rows.next();
	    }
	} finally {
	    if (rows) {
	        rows.close();
	    }
	    
	    connection.close();
	}
	
    return fugitives;
};

FugitiveDAO.prototype.add = function(fugitive) {
	var connection = this.database.getConnection();
	
	var sql = 'INSERT INTO FUGITIVE (NAME, ISBUSTED) VALUES (?,?)';
	
	try {
		connection.execute(sql, fugitive.name, fugitive.isBusted ? 1 : 0);
	} finally {
		this.database.close();
	}
};

FugitiveDAO.prototype.addAll = function(fugitives) {
    var connection = this.database.getConnection();
    
    var sql = 'INSERT INTO FUGITIVE (NAME, ISBUSTED) VALUES (?,?)';
    
    try {
        for (var index = 0; index < fugitives.length; index++) {
            connection.execute(sql, fugitives[index].name, FALSE_VALUE);
        }
    } finally {
        this.database.close();
    }
};

FugitiveDAO.prototype.remove = function(fugitive) {
	var connection = this.database.getConnection();
	
	var sql = 'DELETE FROM FUGITIVE WHERE ID = ?';
	
	try {
		connection.execute(sql, fugitive.id);
	} finally {
		this.database.close();
	}
};

FugitiveDAO.prototype.bust = function(fugitive) {
	var connection = this.database.getConnection();
	
	var sql = 'UPDATE FUGITIVE SET isBusted = ? WHERE ID = ?';
	
	try {
		connection.execute(sql, TRUE_VALUE, fugitive.id);
	} finally {
		this.database.close();
	}
};

module.exports = FugitiveDAO;