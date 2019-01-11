function homeController() {
    $(function () {
        
        
        
        var main = $('#mainDiv').html();
        $('main').html(main);

        var selectionsTemplate = $('#itemsTemplate').text();
        var selectionsPage = Handlebars.compile(selectionsTemplate);
        
      

       getProducts=function(){
            sendRequest('products', 'GET', {}, function showResponse(response){
                var items;
               items=response.filter(i=>{
                   return i[5]=='m';
               });
                console.log(items);

                for(var i=0; i<items.length; i++){
                    var img=items[i][5];
                    items[i].url=img;
                }

                $('#actualSelections div').eq(1).append($(selectionsPage({ items: items })));
            

                items=response.filter(i=>{
                    return i[5]=='f';
                });
                 console.log(items);
 
                 for(var i=0; i<items.length; i++){
                     var img=items[i][5];
                     items[i].url=img;
                 }

 
                 $('#actualSelections div').eq(0).append($(selectionsPage({ items: items })));
             
                 localStorage.setItem("products", JSON.stringify(response));

                $('.items').on('click', function () {
                    var title = $(this).children().eq(1).text();
                    console.log(title);
                    data = {'product_name': title}
                    console.log(title);
                    sendRequest('product', 'POST', data , function showResponse(response){
                       console.log(response);
                     
                       location.replace('#item='+response);
                        console.log(response);
                       var itemTemplate = $('#itemTemplate').text();
                       var itemPage = Handlebars.compile(itemTemplate);
                       $('main').html(itemPage(response));
                        
                       $('#containter').html($('div.description').text());
                   
                       $('#desc button').on('click', function(){
                               event.preventDefault();
                   
                               var buttonClass=$(this).attr('class');
                               $('#containter').html($('div.'+buttonClass).text());
                       })
                    })});
                
            });


            
            
        }();

       
        /* var products = JSON.parse(localStorage.getItem('products'));
        items = products.filter(i => {
            return i.categories.some(c => c == 'Women');
        }); */

       /*  for (var i = 0; i < items.length; i++) {
            var img = items[i].image_urls['300x400']['0'].url;
            items[i].url = img;
        }
        const RANDOM_SELECTIONS = 20;
        var random = [];
        for (var i = 0; i < RANDOM_SELECTIONS; i++) {
            var ran = items[Math.floor(Math.random() * items.length)];
            random.push(ran);
        }

        items = random.slice();

        $('#actualSelections div').eq(0).append($(selectionsPage({ items: items })));

        items = products.filter(i => {
            return i.categories.some(c => c == 'Men');
        });
        var random = [];
        for (var i = 0; i < RANDOM_SELECTIONS; i++) {
            var ran = items[Math.floor(Math.random() * items.length)];
            random.push(ran);
        }

        items = random.slice();

      
        });
     */
    })



    function itemController(title) {

        var title=$(this).children().eq(1).text();
       
          
       
     
   
       
      
    
     
   
   
       //adding to cart
   
       $('#addToCart').on('click', function (event) {
           event.preventDefault();
           var quantity = parseInt($('#productQuantity').val());
   
           if (sessionStorage.getItem('loggedUser') != null) {
               var userId = JSON.parse(sessionStorage.getItem('loggedUser')).id;
               cartStorage.addCartItem(product, quantity);
           } else {
               alert('Трябва да се логнете, за да добавите продукт в кошницата!');
               location.replace('#loginRegister');
           }
       });
   
   
       $('#addFav').on('click', function(){
           var user = JSON.parse(sessionStorage.getItem('loggedUser'));
           if(user){
               var title=$('#itemTitle').text();
               var product = productStorage.findItem(title);
               $(this).css('background-color','#6495ED');
               if(!userStorage.addToFavorites(user.id, product)){
                   $(this).next().toggle();
               }
           } else {
               alert('Влезте в профила си, за да добавите в любими!');
               location.replace('#loginRegister');
           }
       })
   
   }
}




