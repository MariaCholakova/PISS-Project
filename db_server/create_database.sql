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

INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "dress", "f", 2, "Such a beautiful dess!", "https://lumiere-a.akamaihd.net/v1/images/file_be6334f7.jpeg?width=1200&region=0%2C0%2C2000%2C2000&quality=8" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "shirt", "m", 3, "Men's shirt", "https://5.imimg.com/data5/WI/EB/MY-45054986/boys-designer-shirts-500x500.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "blouse", "f", 4, "Turquoise blouse", "https://www.euniform.com.my/image/euniform/image/data/all_product_images/product-1618/TQ%20(1).jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "f", 1, "Dolce & Gabbana jeans!", "https://webiconspng.com/wp-content/uploads/2017/09/Jeans-PNG-Image-44263.png" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "f", 5, "Lovely pink jeans!", "https://target.scene7.com/is/image/Target/GUEST_0c750ab8-8f04-4498-9629-e07aa989b6d7?wid=488&hei=488&fmt=pjpeg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "blouse", "f", 2, "White blouse", "http://www.livsglede.org/image/cache/data/category_2/women-white-off-shoulder-elastic-waist-flared-sleeves-blouse-white-polyester-chiffon--130-500x500_0.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "dress", "f", 3, "Glittery pink dress!", "https://cdn.shopify.com/s/files/1/2605/6882/products/product-image-442076407_530x@2x.jpg?v=1521459033" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "m", 3, "Cropped jeans", "https://bfme-prod.s3.ap-south-1.amazonaws.com/Storage/Shop/1702/Products/21827/Men-s-Light-Blue-Holes-Cropped-Jeans-Pid-21827-3b70c87d9a2ecbb8.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "jacket", "f", 1, "Addidas sports jacket!", "http://jordelsport.com/userfiles/productimages/product_5111.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "coat", "f", 3, "Winter coat", "https://thehipsterhive.com/wp-content/uploads/2018/09/7687-2a535e-600x600.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "shirt", "f", 2, "Hello Kitty T-Shirt", "https://www.symbios.pk/image/cache/data/h/Hello%20Kitty%20White%20Women%20T-Shirt-500x500.JPG" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "shirt", "m", 3, "Men's T-Shirt", "https://5.imimg.com/data5/HN/ET/MY-34278/casual-tee-shirts-500x500.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "jacket", "m", 4, "Men's leather jacket", "https://4.imimg.com/data4/VW/KT/MY-17715579/mens-leather-jacket-500x500.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "skirt", "f", 1, "Women's skirt", "http://www.eyesofthewildtattoostudio.com/image/cache/data/category_3/max-and-co-women-calamaio-skirt-an-essential-item-in-the-closet-ma646aa96eyp-ouvhovf-4028-500x500.jpg" );
INSERT INTO products (product_price, product_name, product_sex, count_available, description, image) VALUES ( ROUND(RAND() *  200 +  1, 2), "jeans", "m", 5, "Men's jeans", "https://media.dcshoes-newzealand.co.nz/media/catalog/product/cache/thumbnail/500x500/9df78eab33525d08d6e5fb8d27136e95/e/d/edydp03383_dc_mens_worker_slim_denim_jeans_kvjw_1_h.jpg" );
