$(function () {
    function router() {

        loadF();
        //itemsHash();

        var page = location.hash.slice(1);

        switch (page) {
            case 'loginRegister':
                loginRegisterController();
                break;
            case 'home':
                homeController();
                break;
            case 'help':
                faqController();
                break;
            case 'Women':
            case 'Men':
                productController(page);
                break;
            case 'contact':
            case 'condition':
            case 'forUs':
            case 'generalCondition':
                helpController(page);
                break;
            case 'logout':
                logoutController();
                break;
            case 'cart':
                cartController();
                break;
            case 'settings':
            case 'orders':
            case 'favourites':
            case 'adresses':
            case 'cards':
                settingController(page);
                break;
            default:
                homeController();
                break;
        }
    }

    window.addEventListener('hashchange', router);
    window.addEventListener('load', router);
    router();
   // searchController();
    //
    // $('#searchByTitle').on('click', function(){
    //     var title = $(this).parent().children().eq(0).val();
    //     var product = productStorage.findItem(title);
    //     var itemTemplate = $('#itemTemplate').text();
    //     var itemPage = Handlebars.compile(itemTemplate);
    //     $('main').html(itemPage(product));
    // })

});


function loadF() {
    if (sessionStorage.getItem('loggedUser')) {
        var profile = $('<a href="#settings" id="set">&nbsp;<img src="assets/images/profileIcon.png"/><br/><span class="normalWhite">МОЯТ ПРОФИЛ</span></a>');
        $('#profile').html(profile);
    };
}
/* 
function itemsHash() {
    var pages = location.hash.split('=');
    var page = pages[0].slice(1);
    var item = pages[1];
    if (page == 'item') {
        itemController(item);
    }

} */