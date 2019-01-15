

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














