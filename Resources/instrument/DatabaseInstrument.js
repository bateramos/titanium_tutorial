var meld = require("/meld");

var Database = require("api/Database");

exports.instrumentDatabaseOpen = function (instance, methods) {
    
    var database = new Database();
    
    var aroundMethod = function(methodCall) {
        instance.connection = database.getConnection();
        
        try {
            return methodCall.proceed();
        } finally {
            instance.connection.close();
        }
    };
    
    for (var i = 0; i < methods.length; i++) {
        meld.around(instance, methods[i], aroundMethod);
    }
};