var userStorage = (function () {

    function User(username, password) {
        this.username = username;
        this.password = password;
        this.id = UserStorage.nextId++;
        this.basket = [];
        this.favorites = [];
        this.orders = [];
        this.addresses = [];
        this.cards = [];
        this.gender = '';
        this.surname = '';
        this.name = '';
    }

    function saveChanges(){
        localStorage.setItem('users', JSON.stringify(this._users));
        var products=productStorage.getAll();
        localStorage.setItem('products', JSON.stringify(products));
    
    }

    function UserStorage() {

        if (localStorage.getItem('users') != null)
            this._users = JSON.parse(localStorage.getItem('users'));
        else
            this._users = [];

        this.loggedUserId = 0;
    }


    UserStorage.nextId = 1;


    UserStorage.prototype.register = function (username, password) {
        if ((username.trim().length == 0) || (password.trim().length < 8)) {
            return false;
        }

        var isAlreadyRegistered = (this._users.find(user => user.username == username) != null);

        if (!isAlreadyRegistered) {
            var newUser = new User(username, password);
            this._users.push(newUser);
            localStorage.setItem('users', JSON.stringify(this._users));
            return true;
        }

        return false;
    };


    UserStorage.prototype.login = function (username, password) {
        var user = this._users.find(function (u) {
            return u.username === username && u.password === password;
        });

        if (user != null) {
            this.loggedUserId = user.id;
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            return this.loggedUserId;
        }

        return false;
    };


    UserStorage.prototype.logout = function () {
        this.loggedUserId = 0;
        sessionStorage.clear();
        localStorage.setItem('users', JSON.stringify(this._users));
    };


    UserStorage.prototype.purchase = function (userId) {
        var index = this._users.findIndex(user => user.id == userId);

        if (index != -1) {
            var user = this._users[index];
            var newOrder = JSON.parse(sessionStorage.getItem('cart'));
            //newOrder.date=new Date().toJSON().slice(0,10).replace(/-/g,'/');
            user.orders.push(newOrder);
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            localStorage.setItem('users', JSON.stringify(this._users));
        }
    };


    UserStorage.prototype.addToFavorites = function (userId, product) {
        var index = this._users.findIndex(user => user.id == userId);

        if (index != -1) {
            if(this._users[index].favorites.find(p=>p.id==product.id)!=null){
                return false;
            }
            this._users[index].favorites.push(product);
            localStorage.setItem('users', JSON.stringify(this._users));
            sessionStorage.setItem('loggedUser', JSON.stringify(this._users[index]));
            return true;

        }

        return false;
    };


    UserStorage.prototype.deleteFromFavourites=function(userId, product){
        var user = this._users.find(user => user.id == userId);
        if (user) {
            if(user.favorites.length!=0){
                
            }
            var index=user.favorites.findIndex(p=>p.id==product.id);
            user.favorites.splice(index,1);
            localStorage.setItem('users', JSON.stringify(this._users));
            sessionStorage.setItem('loggedUser', JSON.stringify(user));
            return true;
        }

        return false;


    }

    UserStorage.prototype.addAddress = function (userId, name, phoneNumber, city, postcode, streetAddress) {
        var index = this._users.findIndex(user => user.id == userId);

        if (index != -1) {
            var newAddress = new Address(name, phoneNumber, city, postcode, streetAddress);
            this._users[index].addresses.push(newAddress);
            sessionStorage.setItem('loggedUser', JSON.stringify(this._users[index]));
            localStorage.setItem('users', JSON.stringify(this._users));
            return true;
        }

        return false;
    };


    UserStorage.prototype.deleteAddress = function (userId, city, streetAddress) {
        var user = this._users.find(user => user.id == userId);

        if (user) {
            var index = user.addresses.findIndex(a => {
                return a.city == city && a.streetAddress == streetAddress;
            })
            if (index != -1) {
                user.addresses.splice(index, 1);
                sessionStorage.setItem('loggedUser', JSON.stringify(user));
                localStorage.setItem('users', JSON.stringify(this._users));
                return true;
            }

        }

        return false;
    };


    UserStorage.prototype.editAddress = function (userId, currCity, currStreet, newAddress) {
        var user = this._users.find(user => user.id == userId);

        if (user) {
            var address = user.addresses.find(a => {
                return a.city == currCity && a.streetAddress == currStreet;
            })
            if (address) {
                address.fullName = newAddress[0];
                address.phoneNumber = newAddress[1];
                address.postcode = newAddress[2];
                address.streetAddress = newAddress[3];
                sessionStorage.setItem('loggedUser', JSON.stringify(user));
                localStorage.setItem('users', JSON.stringify(this._users));
                return true;
            }

        }

        return false;
    };


    UserStorage.prototype.addCard = function (userId, nameOnCard, cardNumber, expirationDate) {
        var index = this._users.findIndex(user => user.id == userId);

        if (index != -1) {
            var newCard = new Card(nameOnCard, cardNumber, expirationDate);
            this._users[index].cards.push(newCard);
            sessionStorage.setItem('loggedUser', JSON.stringify(this._users[index]));
            localStorage.setItem('users', JSON.stringify(this._users));
            return true;
        }

        return false;
    };



    UserStorage.prototype.deleteCard = function (userId, cardNumber, expirationDate) {
        var user = this._users.find(user => user.id == userId);

        if (user) {
            var index = user.cards.findIndex(c => {
                return c.cardNumber == cardNumber && c.expirationDate == expirationDate;
            })
            if (index != -1) {
                user.cards.splice(index, 1);
                sessionStorage.setItem('loggedUser', JSON.stringify(user));
                localStorage.setItem('users', JSON.stringify(this._users));
                return true;
            }

        }

        return false;
    };

    UserStorage.prototype.editCard = function (userId, currNumber, currExpDate, newCard) {
        var user = this._users.find(user => user.id == userId);

        if (user) {
            var card = user.cards.find(a => {
                return a.cardNumber == currNumber && a.expirationDate == currExpDate;
            })
            if (card) {
                card.nameOnCard = newCard[0];
                card.cardNumber = newCard[1];
                card.expirationDate = newCard[2];
                sessionStorage.setItem('loggedUser', JSON.stringify(user));
                localStorage.setItem('users', JSON.stringify(this._users));
                return true;
            }

        }

        return false;
    };

    UserStorage.prototype.changePassword = function (oldPass, newPass, repeatedPass) {
        var user = JSON.parse(sessionStorage.getItem("loggedUser"));
        var usr = this._users.find(u => {
            return user.id == u.id;
        });

        if (usr) {
            if ((usr.password == oldPass) && (newPass.trim().length > 8) && (newPass === repeatedPass)) {
                usr.password = newPass;
                sessionStorage.setItem('loggedUser', JSON.stringify(usr));
                localStorage.setItem('users', JSON.stringify(this._users));
                return true;
            }
        }

        return false;

    }



    UserStorage.prototype.changeSettings = function (name, surname, newUsername, gender) {
        var user = JSON.parse(sessionStorage.getItem("loggedUser"));
        var usr = this._users.find(u => {
            return user.id == u.id;
        });

        if (usr) {
            if (name.trim().length > 0 && surname.trim().length > 0 && newUsername.trim().length > 0) {
                usr.name = name;
                usr.surname = surname;
                usr.username = newUsername;
                usr.gender = gender;
                sessionStorage.setItem('loggedUser', JSON.stringify(usr));
                localStorage.setItem('users', JSON.stringify(this._users));
                return true;
            }
        }

        return false;

    }

    function Address(fullName, phoneNumber, city, postcode, streetAddress) {
        this.fullName = fullName;
        this.phoneNumber = phoneNumber;
        this.city = city;
        this.postcode = postcode;
        this.streetAddress = streetAddress;
    }


    function Card(nameOnCard, cardNumber, expirationDate) {
        this.nameOnCard = nameOnCard;
        this.cardNumber = cardNumber;
        this.expirationDate = expirationDate;
    }



    return new UserStorage();
})();
