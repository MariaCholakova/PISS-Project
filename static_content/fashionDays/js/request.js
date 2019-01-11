

// appServerAddress is the IP of our computer(the Docker host machine) + 
// + the port on our computer, which is mapped to the app server container's port (8088:80)
var appServerAddress = "http://localhost:8088/";
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
            }
            else {
                //alert the error
                alert(result[1]);
            }
        }
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


	Example 3
	sendRequest('/products', 'GET', {}, function showResponse(response){
		console.log(response);
	});


    Example 4
	sendRequest('/cart', 'PUT', {}, function showResponse(response){
		console.log(response);
	});

	
	Example 5
	sendRequest('/cart', 'DELETE', {}, function showResponse(response){
		console.log(response);
	});

});
*/
