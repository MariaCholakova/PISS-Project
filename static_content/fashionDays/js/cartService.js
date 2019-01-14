var cartStorage = (function () {
    function CartStorage() {
        this._items = [];
        this.total = 0;
    }


    CartStorage.nextId = 1;

    

    CartStorage.prototype.addCartItem = function (product, quantity) {
         this.items=JSON.parse(sessionStorage.getItem("cart"));
        if(this.items){
            var item=this.items.find(i=>i.product[0].product_name==product[0].product_name);
            if(item){
                this.removeCartItem(item.id);
                var itemQuantity=item.quantity;
            }
          
           }  
        
        // if ((product instanceof Product) && (quantity > 0)) {
            console.log(product[0].product_name);
         //
         
          
        if (quantity > 0) {
            
            if(item){
                quantity=quantity+item.quantity;
            }
            var cartItem = new CartItem(product, quantity);
            this._items.push(cartItem);

            cartItem.cartItemTotal = this.calculateItemTotal(cartItem);
            this.total += +(cartItem.cartItemTotal.toFixed(2));
            sessionStorage.setItem('cart', JSON.stringify(this._items));
            sessionStorage.setItem('total', JSON.stringify(this.total));
            alert('Успешно добавихте продукта във вашата Количка!');
            return true;
        }
        return false;
    };


    CartStorage.prototype.changeCartItem = function (itemId, newQuantity) {
        var index = this._items.findIndex(item => item.id == itemId);

        if (index != -1) {
            var cartItem = this._items[index];
            this.total -= +(cartItem.cartItemTotal.toFixed(2));
            cartItem.quantity = newQuantity;

            cartItem.cartItemTotal = this.calculateItemTotal(cartItem);
            this.total += cartItem.cartItemTotal;
            sessionStorage.setItem('cart', JSON.stringify(this._items));
            sessionStorage.setItem('total', JSON.stringify(this.total));
            return true;
        } else {
            throw new Error('there is no cartItem with ID' + itemId);
        }
    };


    CartStorage.prototype.removeCartItem = function (itemId) {
        var index = this._items.findIndex(item => item.id == itemId);

        if (index != -1) {
            var cartItem = this._items[index];
            this.total -= +(cartItem.cartItemTotal.toFixed(2));

            this._items.splice(index, 1);
            sessionStorage.setItem('cart', JSON.stringify(this._items));
            sessionStorage.setItem('total', JSON.stringify(this.total));
            return true;
        } else {
            throw new Error('there is no cartItem with ID' + itemId);
        }
    };


    CartStorage.prototype.emptyCart = function () {
        this._items.length = 0;
        this.total = 0;
        sessionStorage.setItem('cart', JSON.stringify(this._items));
        sessionStorage.setItem('total', JSON.stringify(this.total));
    };


    CartStorage.prototype.calculateItemTotal = function(cartItem) {
        return +((cartItem.quantity * cartItem.product[0].product_price).toFixed(2));
    };


    CartStorage.prototype.calculateCartTotal = function(){
        return this._items.reduce(function(total, item) {
            var t=Number(total);
            var g = Number(item.cartItemTotal)
            return t+g;
        }, 0);
    };


    function CartItem(product, quantity) {
        this.product = product;
        this.quantity = quantity;
        this.cartItemTotal = 0;
        this.id = CartStorage.nextId++;
    }

    return new CartStorage();
})();