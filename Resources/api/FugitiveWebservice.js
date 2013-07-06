var WEBSERVICE_URL = "http://bountyhunterapp.appspot.com/bounties";
var REQUEST_TIME_OUT = 5000;

function FugitiveWebservice() {
    
}

FugitiveWebservice.prototype = {
    getFugitives: function(onComplete, onError) {
        var httpClient = Ti.Network.createHTTPClient({
            onload: onComplete,
            onerror: onError,
            timeout: REQUEST_TIME_OUT 
        });
        
        httpClient.open("GET", WEBSERVICE_URL);
        
        httpClient.send();
    },
    bustFugitive: function(macAddress, onComplete) {
        var httpClient = Ti.Network.createHTTPClient({
            onload: onComplete,
            timeout: REQUEST_TIME_OUT 
        });
        
        httpClient.open("POST", WEBSERVICE_URL);
        
        var param = {
            udid: macAddress
        }
        
        httpClient.send(param);
    }
}

module.exports = FugitiveWebservice;