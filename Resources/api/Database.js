function Database() {
};

Database.prototype.getConnection = function() {
	this.myDatabase = Ti.Database.open('bountyDB');
	
	var createFugitive = 'CREATE TABLE IF NOT EXISTS FUGITIVE(' +
    	'id INTEGER PRIMARY KEY AUTOINCREMENT, NAME TEXT, CAPTURED INT' +
	')';
	
	myDatabase.execute(createFugitive);
	
	return myDatabase;
};

Database.prototype.close = function(argument) {
	this.myDatabase.close();
};

module.exports = Database;