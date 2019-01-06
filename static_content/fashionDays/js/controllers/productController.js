// $(function(){
//     $('#mainMenu-women').hover(function(){
//         $('#mainMenuW').toggle();
//     });
//
//     $('#mainMenu-men').hover(function () {
//         $('#mainMenuM').toggle();
//     });
//
//     $('#mainMenu-brands').hover(function () {
//         $('#mainMenuB').toggle();
//     });
//
//
//     $('.filters').on('click', function () {
//
//         var genders = [];
//         $('input[name=genderFilter]:checked').each(function () {
//             genders.push($(this).val());
//         });
//
//
//         var categories = [];
//         $('input[name=categoryFilter]:checked').each(function () {
//             categories.push($(this).val());
//         });
//
//
//         var brands = [];
//         $('input[name=brandFilter]:checked').each(function () {
//             brands.push($(this).val());
//         });
//
//         var filter = {gender: genders, category: categories, brand: brands};
//         console.log(filter);
//
//         var result = productStorage.filterSelectedProducts(filter);
//         console.log(result);
//
//     });
// });


function productController(page) {
    var filter = {gender: page};
    var products = productStorage.filterSelectedProducts(filter);

    var productsSource = $('#itemsTemplate').text();
    var productsTemplate = Handlebars.compile(productsSource);
    $('main').html($('#filterTemplate').html());

    products.forEach(function (prod) {
        var img = prod.image_urls['300x400']['0'].url;
        prod.url = img;
    });

    var productsHTML = productsTemplate({items: products});
    $('#productSelections').html(productsHTML);

    $('.filters').on('click', function () {

        var categories = [];
        $('input[name=categoryFilter]:checked').each(function () {
            categories.push($(this).val());
        });

        var brands = [];
        $('input[name=brandFilter]:checked').each(function () {
            brands.push($(this).val());
        });

        filter.category = categories;
        filter.brand = brands;
        products = productStorage.filterSelectedProducts(filter);

        var productsHTML = productsTemplate({items: products});
        $('#productSelections').html(productsHTML);

        $('.items').on('click', function () {
            var title = $(this).children().eq(1).text();
            itemController(title);
        });
      
    });
    $('.items').on('click', function () {
        var title = $(this).children().eq(1).text();
        itemController(title);
    });
}
