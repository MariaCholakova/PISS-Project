var userStorage = (function () {


    function UserStorage() {

    }

    

       

        /* UserStorage.prototype.loginUser = function (user) {
            let deferred = $q.defer();
            $http.post('/login', user)
                .then(function (response) {
                    if (response.status === OK_STATUS) {
                        delete response.data.user.password
                        sessionStorage.setItem("loggedUser", JSON.stringify(response.data.user));
                        deferred.resolve(response.status);
                    } else {
                        deferred.reject(response.status);
                    }
                })
                .catch(function (err) {
                    deferred.reject(err);
                })
            return deferred.promise;
        } */

        UserStorage.prototype.logout = function () {
            this.loggedUserId = 0;
            sessionStorage.clear();
        };

   /*  function saveChanges(){
        localStorage.setItem('users', JSON.stringify(this._users));
        var products=productStorage.getAll();
        localStorage.setItem('products', JSON.stringify(products));
    
    }



    UserStorage.nextId = 1;




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

  
 */


    return new UserStorage();
})();
