function Database() {
};

Database.prototype.getConnection = function() {
	this.myDatabase = Ti.Database.open('bountyHunterDB');
	
	var createFugitive = 'CREATE TABLE IF NOT EXISTS FUGITIVE(' +
    	'ID INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, ISBUSTED INT, PHOTOURL TEXT' +
	')';
	
	this.myDatabase.execute(createFugitive);
	
	return this.myDatabase;
};

Database.prototype.close = function() {
	this.myDatabase.close();
};

module.exports = Database;