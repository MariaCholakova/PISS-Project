function searchController() {
    var products = JSON.parse(localStorage.getItem('products')).sort(function(p1, p2){
        if (p1.name > p2.name){
            return 1;
        }
        if (p1.name < p2.name){
            return -1;
        }
        return 0;
    });

    var source = $('#searchTemplate').html();
    var template = Handlebars.compile(source);

    var searchHTML = template({product: products});
    $('#productList').html(searchHTML);

    $('#searchByTitle').on('click', function () {
        event.preventDefault();

        var title = $('#searchItem').val();
        itemController(title);
        $('#searchItem').val('');
    });
}