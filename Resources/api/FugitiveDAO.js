var Database = require("api/Database");

function FugitiveDAO() {
	this.database = new Database();
};

FugitiveDAO.prototype.list = function(isBusted) {
	var connection = this.database.getConnection();
	
	connection.execute();
};

FugitiveDAO.prototype.add = function(fugitive) {
	var connection = this.database.getConnection();
	
	var sql = 'INSERT INTO FUGITIVE (NAME, ISBUSTED) VALUES (?,?)';
	
	try {
		connection.execute(sql, fugitive.name, fugitive.isBusted);
	} finally {
		this.database.close();
	}
};

FugitiveDAO.prototype.remove = function(fugitive) {
	var connection = this.database.getConnection();
	
	var sql = 'REMOVE FROM FUGITIVE WHERE ID = ?';
	
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
		connection.execute(sql, fugitive.isBusted, fugitive.id);
	} finally {
		this.database.close();
	}
};

module.exports = FugitiveDAO;