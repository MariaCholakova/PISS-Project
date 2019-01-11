 // Constants
const express = require('express');
const bodyParser = require('body-parser');
const db_module = require('mysql');
const cors = require('cors');
const util = require('util');
const PORT = 8088;

const errors = {NO_ERROR:0,
    DB_ERROR:1,
    SERVER_ERROR:2};

//Database 
var pool = db_module.createPool({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "fashiondb",
    charset: "utf8_general_ci"
});
//used for ascynchronous requests
pool.query = util.promisify(pool.query);
const getConnectionAsync = util.promisify(pool.getConnection).bind(pool);

//App requests
const app = express();
//enable cross-origin reosurce sharing
app.use(cors({origin: '*'}));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const server = app.listen(PORT);

const io = require('socket.io')(server);



//listen on every connection
io.on('connection', (socket) => {
	console.log('New user connected')

	//default username
	socket.username = "Anonymous"

    //listen on change_username
    socket.on('change_username', (data) => {
        socket.username = data.username
    })

    //listen on new_message
    socket.on('new_message', (data) => {
        //broadcast the new message
        io.sockets.emit('new_message', {message : data.message, username : socket.username});
    })

    //listen on typing
    socket.on('typing', (data) => {
    	socket.broadcast.emit('typing', {username : socket.username})
    })
})
/**
 * Normalize a port into a number, string, or false.
 */


/* var chatNamespace = io
    .of('/chat')
    .on('connection', function (socket) {
        socket.on('message', async function(msg) {
            const heyRegex = /^Hey.*/;
          /* const byeRegex = /.*[b|B]ye.*/;
            /* try {
                if (msg.match(heyRegex)) {
                    socket.emit('answer', "Hello there!");
                }
                else if (msg.match(byeRegex)) {
                    socket.emit('answer', "See you soon!");
                }
                else {
                    socket.emit('answer', "I don't know what you are talking about");
                }
            }
            catch (err){
                socket.emit(err);
            }
        });
    }); */

  
//create new customer
app.post('/customer', async (req, res) => {
  
     var name = mysqlEscape(req.body.name);
    var pass = mysqlEscape(req.body.password);
    try {
       
        var connection = await getConnectionAsync();
        const queryAsync = util.promisify(connection.query).bind(connection);
        await queryAsync("START TRANSACTION");    
        const resultExistCustomer = await queryAsync(`SELECT EXISTS (SELECT * FROM customers WHERE customer_name = '${name}' FOR UPDATE) AS exist`);
        if (resultExistCustomer[0].exist != 0) {
            console.log("dsada");
            await queryAsync("ROLLBACK");
            connection.release();
            return res.send(false);
        }      
        await queryAsync(`INSERT INTO customers (customer_name, customer_password) VALUES ('${name}', '${pass}')`);
        await queryAsync("COMMIT");
        connection.release();
        console.log("customer added");
        res.send(true);
    }
    catch (err){    
        res.send([errors.DB_ERROR, err]);} 
    
});

app.post('/product', async (req, res) => {
  
    var name = mysqlEscape(req.body.name);
   try {
      
    const resultProduct =  await pool.query(`SELECT * FROM products WHERE product_name='${name}'`);
    res.send(resultProduct);
   }
   catch (err){    
       res.send([errors.DB_ERROR, err]);} 
   
});

//get products by sex - women or men
app.get('/products',  async (req, res) =>{
    try{
        const resultProducts =  await pool.query(`SELECT * FROM products`);
        var products = [];
        for (pr of resultProducts){
            products.push([pr.product_name, pr.product_price, pr.count_available, pr.description, pr.image, pr.product_sex]);
        }
        res.send(products);
    }
    catch (err){
        res.send([errors.DB_ERROR, err]);
    }
});

 //add products to cart
app.put('/cart',  async (req, res) =>{
    const product_id = req.query.product_id;
    const customer = req.query.cutomer_name;
    const product_count = req.query.count;
    try{
        var connection = await getConnectionAsync();
        const queryAsync = util.promisify(connection.query).bind(connection);
        await queryAsync("START TRANSACTION");    
        const resultProductInCart = await queryAsync(`SELECT EXISTS (SELECT * FROM products_in_cart WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_name = '${customer}') AND product_id = ${product_id} AND date_ordered IS NULL FOR UPDATE) AS exist`);
        if (resultProductInCart[0].exist != 0) {
            await queryAsync(`UPDATE products_in_cart SET quantity = ${product_count} + (SELECT quantity FROM products_in_cart WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_name = '${customer}') AND product_id = ${product_id} AND date_ordered IS NULL) `);
        } 
        else {
            await queryAsync(`INSERT INTO products_in_cart (customer_id, product_id, quantity) VALUES (${name}, ${product_id}, ${product_count})`);
        }    
        await queryAsync("COMMIT");
        connection.release();
        return res.send([errors.NO_ERROR, "Product(s) added to " + customer + "'s cart"]); 
    }
    catch (err){
        if (connection){
            connection.release();
        }
        res.send([errors.DB_ERROR, err]);
    }
});

 //remove products from cart
app.delete('/cart', async (req, res) =>{
    const product_id = req.query.product_id;
    const customer = req.query.cutomer_name;
    const product_count = req.query.count;
    try{
        var connection = await getConnectionAsync();
        const queryAsync = util.promisify(connection.query).bind(connection);
        await queryAsync("START TRANSACTION");    
        const resultProductInCart = await queryAsync(`SELECT EXISTS (SELECT * FROM products_in_cart WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_name = '${customer}') AND product_id = ${product_id} AND date_ordered IS NULL FOR UPDATE) AS exist`);
        if (resultProductInCart[0].exist != 0) {
            var quantityRes =  await queryAsync(`SELECT quantity FROM products_in_cart WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_name = '${customer}') AND product_id = ${product_id} AND date_ordered IS NULL`);
            var quantity = quantityRes[0].quantity - product_count;
            if (quantity > 0){
                await queryAsync(`UPDATE products_in_cart SET quantity = ${quantity}`);
            }
            else {
                await queryAsync(`DELETE FROM products_in_cart WHERE WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_name = '${customer}') AND product_id = ${product_id} AND date_ordered IS NULL `);
            }
        } 
        await queryAsync("COMMIT");
        connection.release();
        return res.send([errors.NO_ERROR, "Product(s) removed from " + customer + "'s cart"]); 
    }
    catch (err){
        if (connection){
            connection.release();
        }
        res.send([errors.DB_ERROR, err]);
    }
});

//order product
app.put('/order', async (req, res) =>{
    const product_id = req.query.product_id;
    const customer = req.query.cutomer_name;
    try{
        await pool.query(`UPDATE products_in_cart SET date_ordered = CURRENT_TIMESTAMP() WHERE customer_id = (SELECT customer_id FROM customers WHERE customer_name = '${customer}') AND product_id = ${product_id} AND date_ordered IS NULL) `);
        return res.send([errors.NO_ERROR,  customer + "'s order was successful"]); 
    }
    catch (err){
        res.send([errors.DB_ERROR, err]);
    }
});


function mysqlEscape(stringToEscape){
    if(stringToEscape == '') {
        return stringToEscape;
    }
    return stringToEscape.replace(/\\/g, "\\\\").replace(/\'/g, "\\\'").replace(/\"/g, "\\\"");
} 
 
//const server = app.listen(PORT);
console.log(`Running on port ${PORT}`);

