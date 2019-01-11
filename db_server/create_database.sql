CREATE DATABASE fashiondb;
USE fashiondb;

CREATE USER 'fashiondbuser'@'%' IDENTIFIED BY 'fashiondbpass';
GRANT ALL PRIVILEGES ON fashiondb.* to 'fashiondbuser'@'%';
FLUSH PRIVILEGES;

DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;
DROP TABLE IF EXISTS procucts_in_carts;
DROP TABLE IF EXISTS procuct_names;

CREATE TABLE products (
   product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   product_price  FLOAT(5,2) NOT NULL,
   product_name  VARCHAR(40) NOT NULL,
   count_available  INT NOT NULL DEFAULT 30,
   product_sex  ENUM('men', 'women'),
   description  VARCHAR(100) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE  customers  (
   customer_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   customer_name  VARCHAR(40) NOT NULL,
   customer_password  VARCHAR(20) NOT NULL,
   address  VARCHAR(40) NOT NULL,
   town  VARCHAR(40) NOT NULL
) ENGINE=InnoDB;

INSERT INTO customers (customer_name, customer_password, address, town) VALUES ("maria", "Asdf1", "Luben Karavelov 10", "Rogosh");

CREATE TABLE  products_in_carts  (
   order_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   customer_id  INT NOT NULL,
   product_id  INT NOT NULL,
   quantity  INT NOT NULL,
   date_ordered  TIMESTAMP DEFAULT NULL,
   FOREIGN KEY (customer_id) REFERENCES  customers(customer_id),
   FOREIGN KEY (product_id) REFERENCES  products(product_id)
) ENGINE=InnoDB;


INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "men", "dolce & gabbana jeans!" );
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "men", "Louis Vuitton jeans!" );           
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "women", "The dolce & gabbana jeans are great!" );                          
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "women", "The Louis Vuitton are great!" );                     
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "shirt", "men", "This D&G shirt is great!" );
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "shirt", "men", "This LV shirt is great!" );
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "shirt", "women", "This ladies D&G shirt is great!" );           
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "shirt", "women", "This ladies LV shirt is great!" );                          
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jacket", "men", "dolce & gabbana men jacket!" );                     
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jacket", "men", "Louis Vuitton men jacket" );
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jacket", "women", "dolce & gabbana women jacket!" );
INSERT INTO products (product_price, product_name, product_sex,  description) VALUES ( ROUND(RAND() *  200 +  1, 2), "jacket", "women", "Louis Vuitton women jacket!" );           
