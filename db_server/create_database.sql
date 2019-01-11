CREATE DATABASE fashiondb;
CREATE USER 'fashiondbuser'@'%' IDENTIFIED BY 'fashiondbpass';
GRANT ALL PRIVILEGES ON fashiondb.* TO 'fashiondbuser'@'%';
FLUSH PRIVILEGES;

USE fashiondb;
DROP TABLE IF EXISTS products;
DROP TABLE IF EXISTS customers;

CREATE TABLE products (
   product_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   product_price  FLOAT(5,2) NOT NULL,
   product_name  VARCHAR(40) NOT NULL,
   count_available  INT NOT NULL DEFAULT 30,
   product_sex  ENUM('m', 'f'),
   description  VARCHAR(100) NOT NULL,
   image VARCHAR(300) NOT NULL
) ENGINE=InnoDB;

CREATE TABLE  customers  (
   customer_id  INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
   customer_name  VARCHAR(40) NOT NULL,
   customer_password  VARCHAR(20) NOT NULL
) ENGINE=InnoDB;

INSERT INTO customers (customer_name, customer_password) VALUES ("Maria Cholakova", "Asdf1");

INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "dress", "f", 2, "Such a beautiful dess!", "https://lumiere-a.akamaihd.net/v1/images/file_be6334f7.jpeg?width=1200&region=0%2C0%2C2000%2C2000&quality=8" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "shirt", "m", 3, "Men's shirt.", "https://5.imimg.com/data5/WI/EB/MY-45054986/boys-designer-shirts-500x500.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "blouse", "f", 4, "Red blouse with short sleeves.", "https://pngimage.net/wp-content/uploads/2018/05/blouse-png-3.png" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "jeans", "f", 1, "Dolce & Gabbana jeans!", "https://webiconspng.com/wp-content/uploads/2017/09/Jeans-PNG-Image-44263.png" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "jeans", "f", 5, "Lovely pink jeans!", "https://cdn.shopify.com/s/files/1/1110/1732/products/Chet_Rock_Pink_grande.png?v=1490631055" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "blouse", "f", 2, "White blouse for every occasion.", "https://static1.squarespace.com/static/5b26a5ef25bf0296b641458a/t/5bfe29d6352f5323e24c058f/1543383583232/blouse.png" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "dress", "f", 3, "Glittery pink dress!", "https://cdn.shopify.com/s/files/1/2605/6882/products/product-image-442076407_530x@2x.jpg?v=1521459033" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "jeans", "m", 3, "Men's jeans.", "https://vignette.wikia.nocookie.net/play-rust/images/3/3f/Pants_icon.png/revision/latest?cb=20150821195647" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "jacket", "f", 1, "Addidas sports jacket!", "http://jordelsport.com/userfiles/productimages/product_5111.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "coat", "f", 3, "Winter coat which will keep you warm.", "https://thehipsterhive.com/wp-content/uploads/2018/09/7687-2a535e-600x600.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "shirt", "f", 2, "Hello Kitty T-Shirt!", "https://www.symbios.pk/image/cache/data/h/Hello%20Kitty%20White%20Women%20T-Shirt-500x500.JPG" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "shirt", "m", 3, "Men's T-Shirt.", "https://www.pngarts.com/files/3/T-Shirt-PNG-Image-Background.png" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "jacket", "m", 4, "Men's leather jacket.", "https://4.imimg.com/data4/VW/KT/MY-17715579/mens-leather-jacket-500x500.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "skirt", "f", 1, "Women's skirt in blue.", "http://www.eyesofthewildtattoostudio.com/image/cache/data/category_3/max-and-co-women-calamaio-skirt-an-essential-item-in-the-closet-ma646aa96eyp-ouvhovf-4028-500x500.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( 0.99 + ROUND(RAND() *  200 +  1, 0), "jeans", "m", 5, "Men's jeans in black.", "https://media.dcshoes-newzealand.co.nz/media/catalog/product/cache/thumbnail/500x500/9df78eab33525d08d6e5fb8d27136e95/e/d/edydp03383_dc_mens_worker_slim_denim_jeans_kvjw_1_h.jpg" );
