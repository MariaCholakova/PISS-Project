var productStorage = (function () {
    function ProductStorage() {


        ProductStorage.prototype.getProducts=function(){
            let deferred = $q.defer();
            var promise = $http.get('/products').then(function (response) {
                deferred.resolve(response.data);
            });
            return deferred.promise;
        }
/* 
    }
    var products = [];
    if (products.length == 0 && !JSON.parse(localStorage.getItem('products'))) {
        $.get('http://localhost/fashiondaysproject/json/products.json').then(function (data) {
            products = products.concat(JSON.parse(data));

            products.forEach(product => {
                var random = Math.floor(Math.random() * 50);
                product.sizeAndQuantity = [
                    [{ 'size': 'S' }, { 'quantity': random }],
                    [{ 'size': 'M' }, { 'quantity': random }],
                    [{ 'size': 'L' }, { 'quantity': random }]
                ]
            });

            localStorage.setItem('products', JSON.stringify(products));
        })
    } else {
        products = JSON.parse(localStorage.getItem('products'));
    }

    
    ProductStorage.nextId = 1;


    ProductStorage.prototype.getAll = function () {
       return products.slice();
    }


    ProductStorage.prototype.deleteProduct = function (id) {
        var index = products.findIndex(product => product.id == id);

        if (index != -1) {
            products.splice(index, 1);
        } else {
            throw new Error('there is no product with such ID');
        }
    };



    ProductStorage.prototype.changeQuantity = function (id, size, quantity) {
        var product = products.find(p => p.id == id);
        var size = product.sizeAndQuantity.find(i => i.size == size);
        if (product.size[1].quantity > +quantity) {
            product.size[1].quantity -= quantity;
            localStorage.setItem('products', JSON.stringify(products));
            return true;
        }
        return false;
    };

    ProductStorage.prototype.findItem = function (title) {
        var product = products.find(p => {
            return p.name == title;
        })
        return product;
    }



    ProductStorage.prototype.filterSelectedProducts = function (filters) {
        var result = products.filter(function (prod) {
            return (prod.categories.some(gender => gender == filters.gender) &&
                ((filters.brand != undefined && filters.brand.length > 0) ? filters.brand.includes(prod.brand.toLowerCase()) : true) &&
                ((filters.category != undefined && filters.category.length > 0) ? filters.category.includes(prod.category) : true));
        });
        
        return result;
 */
    };

    return new ProductStorage();
})();
