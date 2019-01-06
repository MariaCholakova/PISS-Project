

function logoutController() {
    $(function () {
        userStorage.logout();
        location.replace('#home');
        var profile = $('<a href="#loginRegister">&nbsp;<img src="assets/images/profileIcon.png"/><br/><span class="normalWhite">ВХОД</span></a>');
        $('#profile').html(profile);
    })
};

function settingController(page) {
    $('main').html($('#profileDiv').html());
    $('#profileDiv article').hide();
    var username = JSON.parse(sessionStorage.getItem('loggedUser'));

    if (username) {
        var favorites = username.favorites;
        var cards = username.cards;
        var address = username.addresses;
        var orders = username.orders;

        var favTemplate = $('#favTemplate').text();
        var favPage = Handlebars.compile(favTemplate);
        var addressTemplate = $('#adressessTemplate').text();
        var addressPage = Handlebars.compile(addressTemplate);
        var cardTemplate = $('#cardsTemplate').text();
        var cardPage = Handlebars.compile(cardTemplate);
        var ordTemp = $('#ordersTemplate').text();
        var ordPage = Handlebars.compile(ordTemp);

        cardPage = $(cardPage({ cards: cards }));
        addressPage = $(addressPage({ address: address }));
        favPage = $(favPage({ favorites: favorites }));
        ordPage = $(ordPage({ orders: orders }));

        switch (page) {
            case 'cards':
                $('#profileSection section').eq(1).html(cardPage);
                break;
            case 'adresses':
                $('#profileSection section').eq(1).html(addressPage);
                break;
            case 'favourites':
                $('#profileSection section').eq(1).html(favPage);
                break;
            case 'orders':
                $('#profileSection section').eq(1).html(ordPage);
                break;
            case 'settings':
                $('#profileSection section').eq(1).html($("#settingsArticle").html());
                break;
            default:
                $('#profileSection section').eq(1).html($("#settingsArticle").html());

        }

    } else {
        alert('Влезте в профила си, за да видите любимите си продукти!');
        location.replace('#loginRegister');
        return;
    }


    $('main').html($('#profileDiv').html());
    $('#username').val(username.username);
    loadGeneralSettings(username);


    //editing or deleting existing card or address
    $('.editAddress, .editCard').on('click', editCardOrAddress);
    $('.deleteAddress, .deleteCard').on('click', deleteCardOrAddress);

    //changing settings
    $('#savePersonalInfo').on('click', changeSettings);
    $('#saveNewPass').on('click', changePass);

    //adding new card or address
    $('#addCard').on('click', addCardorAddress);
    $('#addAddress').on('click', addCardorAddress);

    //adding in cart or deleting item from favourites
    $('.deleteItem').on('click', favouritesController);
    $('.addInCart').on('click', favouritesController);

    $('#selectAll').on('click', function () {
        if (this.checked) {
            $(':checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $(':checkbox').each(function () {
                this.checked = false;
            });
        }
    });

    $('#deleteAll').on('click', function () {
        var checkboxes = $('#favTable input:checked');
        if (checkboxes.length != 0) {


        }
    })




}

function loadGeneralSettings(username) {
    $('#firstName').val(username.name);
    $('#surname').val(username.surname);
    if (username.gender == 'f') {
        $('input[value=f]').prop("checked", true);
    } else {
        $('input[value=m]').prop("checked", true);
    }
}

//ProfileManager functions
function changeSettings(event) {
    event.preventDefault();
    var firstName = $('#firstName').val();
    var surname = $('#surname').val();
    var newUsername = $('#username').val();
    var gender = $('input[name=gender]:checked').val();

    if (userStorage.changeSettings(firstName, surname, newUsername, gender)) {
        alert("Вашите данни бяха променени успешно!");

    } else {
        alert("Непопълнени задължителни полета!");
    }

    $('#firstName, #surname, #username').val('');
    var username = JSON.parse(sessionStorage.getItem('loggedUser'));
    $('#username').val(username.username);
    loadGeneralSettings(username);

}

function changePass(event) {
    event.preventDefault();
    var oldPass = $('#currentPass').val();
    var newPass = $('#newPass').val();
    var newPass2 = $('#newPass2').val();

    if (userStorage.changePassword(oldPass, newPass, newPass2)) {
        alert("Вашата парола беше променена успешно!");
    } else {
        alert("Невалидни данни! Опитайте отново!");
    }
    $('input[type=password]').val('');
}


function deleteCardOrAddress() {
    var tr = $(this).parent().parent().remove();
    var cardOrAddress = $(this).attr('class').substring(6);
    var username = JSON.parse(sessionStorage.getItem('loggedUser'));

    if (cardOrAddress == 'Card') {
        var cardNumber = $(this).parent().parent().children().eq(1).text();
        var expirationDate = $(this).parent().parent().children().eq(2).text();
        userStorage.deleteCard(username.id, cardNumber, expirationDate);
    } else {
        var city = $(this).parent().parent().children().eq(2).text();
        var street = $(this).parent().parent().children().eq(4).text();
        userStorage.deleteAddress(username.id, city, street);
    }

}


function editCardOrAddress() {

    var cardOrAddress = $(this).attr('class').substring(4);
    var username = JSON.parse(sessionStorage.getItem('loggedUser'));
    var page = location.hash.slice(1);
    var id;

    if (cardOrAddress == 'Card') {
        var cardNumber = $(this).parent().parent().children().eq(1).text();
        var expirationDate = $(this).parent().parent().children().eq(2).text();
        id = 2;
    } else {
        var city = $(this).parent().parent().children().eq(2).text();
        var street = $(this).parent().parent().children().eq(4).text();
        id = 4;
    }
    for (var i = 0; i <= id; i++) {
        $(this).parent().parent().children().eq(i).html('<input type="text" size="12"/>');
    }

    $(".save" + cardOrAddress).show();
    $(".edit" + cardOrAddress).hide();

    $(".save" + cardOrAddress).on('click', function () {
        var newCard = [];
        var inputs = $('#' + cardOrAddress + ' input');
        for (var i = 0; i < inputs.length; i++) {
            if (inputs.eq(i).val() != '') {
                newCard.push(inputs.eq(i).val());
            } else {
                alert('Непопълнени задължителни полета');
            }
        }

        if (cardOrAddress == 'Card') {
            if (userStorage.editCard(username.id, cardNumber, expirationDate, newCard)) {
                alert('Промените бяха направени успешно!');
                settingController(page);
            }
        } else {
            if (userStorage.editAddress(username.id, city, street, newCard)) {
                alert('Промените бяха направени успешно!');
                settingController(page);
            }
        }


    })

}





function addCardorAddress() {
    var username = JSON.parse(sessionStorage.getItem('loggedUser'));
    var page = location.hash.slice(1);
    var span = $('<span>✔</span>');
    var cardOrAddress = $(this).attr('id').substring(3);
    if (cardOrAddress == 'Card') {
        var html = $('<div><p>Име: <input type="text"/></p><p>Номер <br/> на картата: <input type="text"/></p><p>Валидна до: <input type="date"/></p><p style="color:#9d0052; font-size:14px;">Всички полета са задължителни!</p></div>');
    } else {
        var html = $('<div> <p>Име: <input type="text"/></p><p>Телефонен <br/> номер: <input type="text"/></p><p>Град: <input type="text"/></p><p>Пощенски <br/> код: <input type="text"/></p><p>Улица: <input type="text"/></p><p style="color:#9d0052; font-size:14px;">Всички полета са задължителни!</p></div>');
    }
    html.append(span);
    $("#" + cardOrAddress).append(html);

    $("#" + cardOrAddress + " span").on('click', function () {
        if (cardOrAddress == 'Card') {
            var name = $("#" + cardOrAddress + " input").eq(0).val();
            var cardNumber = $("#" + cardOrAddress + " input").eq(1).val();
            var validDate = $("#" + cardOrAddress + " input").eq(2).val();
            if (name == '' || cardNumber == '' || validDate == '') {
                alert('Непопълнени задължителни полета!');
                return;
            } else {
                if (userStorage.addCard(username.id, name, cardNumber, validDate)) {
                    alert('Картата беше добавена успешно!');
                    $('#Card input').val('');
                    settingController(page);
                }
            }
        } else {
            var name = $("#" + cardOrAddress + " input").eq(0).val();
            var telephone = $("#" + cardOrAddress + " input").eq(1).val();
            var city = $("#" + cardOrAddress + " input").eq(2).val();
            var postalCode = $("#" + cardOrAddress + " input").eq(3).val();
            var street = $("#" + cardOrAddress + " input").eq(4).val();
            if (name == '' || telephone == '' || city == '' || postalCode == '' || street == '') {
                alert('Непопълнени задължителни полета!');
                return;
            } else {
                if (userStorage.addAddress(username.id, name, telephone, city, postalCode, street)) {
                    alert('Адресът беше добавен успешно!');
                    $('#Address input').val('');
                    settingController(page);
                }
            }
        }
    })
}


function favouritesController() {
    var user = JSON.parse(sessionStorage.getItem('loggedUser'));

    if ($(this).attr('class') == 'deleteItem') {
        var title = $(this).parent().prev().children().eq(0).text();
        var product = productStorage.findItem(title);
        if (userStorage.deleteFromFavourites(user.id, product)) {
            $(this).parent().parent().remove();
        }

    } else {
        var title = $(this).parent().prev().children().eq(0).text();
        var product = productStorage.findItem(title);
        if (cartStorage.addCartItem(product, 1)) {
            userStorage.deleteFromFavourites(user.id, product)
            $(this).parent().parent().remove();
        }
    }

    $('#selectAll').on('click', function () {
        if (this.checked) {
            $(':checkbox').each(function () {
                this.checked = true;
            });
        } else {
            $(':checkbox').each(function () {
                this.checked = false;
            });
        }
    });

}





