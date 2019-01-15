var productStorage = (function () {
    function ProductStorage() {

        var products=[];

    ProductStorage.prototype.getProducts=function(){
        sendRequest('allproducts', 'GET', {}, function showResponse(response){
            return response;
        });
    }

    ProductStorage.prototype.getAll = function () {
        return products.slice();
     }


     
    

    return new ProductStorage();}
});
