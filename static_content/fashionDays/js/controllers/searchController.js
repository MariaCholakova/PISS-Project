function searchController() {
    var products = JSON.parse(localStorage.getItem('products')).sort(function(p1, p2){
        if (p1.product_name > p2.product_name){
            return 1;
        }
        if (p1.product_name < p2.product_name){
            return -1;
        }
        return 0;
    });

    console.log(products);

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