

// appServerAddress is the IP of our computer(the Docker host machine) + 
// + the port on our computer, which is mapped to the app server container's port (8088:80)
var appServerAddress = "http://" + window.location.href + ":8088/";
function sendRequest(uri, method, parameters, callback) {
    return jQuery.ajax({
        url: appServerAddress + uri,
        type: method,
        data: parameters,
        success: callback
    });
} 

/*  USAGE 
   Example 1
    sendRequest( '/order' , 'PUT', {} , function showResponse(response){
        console.log(response);
    } ) ;
    
    
    Example 2
    data = {'name': 'maria', 'password':'asdf'}
    sendRequest( '/customer' , 'POST', data , function showResponse(response){
        console.log(response);
    } ) ;
*/
