

// appServerAddress is the IP of our computer(the Docker host machine) + 
// + the port on our computer, which is mapped to the app server container's port (8090:80)
var appServerAddress = "http://" + window.location.hostname + ":8090/";
function sendRequest(uri, method, parameters, callback) {
    return jQuery.ajax({
        url: appServerAddress + uri,
        type: method,
        data: parameters,
        success: function (result) {
            //no error
            if (result[0] == 0) {
                // handle the response with callback function
                callback(result[1]);
            } else {
                //alert the error
                alert(result[1]);
            }
        }
    });
}
