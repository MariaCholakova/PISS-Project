CREATE DATABASE fashiondb;
USE fashiondb;

CREATE USER 'fashiondbuser'@'%' IDENTIFIED BY 'fashiondbpass';
GRANT ALL PRIVILEGES ON fashiondb.* to 'fashiondbuser'@'%';
FLUSH PRIVILEGES;

DROP TABLE IF EXISTS `products`;
DROP TABLE IF EXISTS `customers`;
DROP TABLE IF EXISTS `procucts_in_carts`;
DROP TABLE IF EXISTS `procuct_names`;

CREATE TABLE `products` (
  `product_id` INT NOT NULL AUTO_INCREMENT,
  `product_price` FLOAT(5,2) NOT NULL,
  `product_name` VARCHAR(40) NOT NULL,
  `count_available` INT NOT NULL DEFAULT 30,
  --`product_size` ENUM('x-small', 'small', 'medium', 'large', 'x-large'),
  `product_sex` ENUM('men', 'women'),
  `description` VARCHAR(100) NOT NULL
   PRIMARY KEY(`product_id`)
) sENGINE=InnoDB;

CREATE TABLE `customers` (
  `customer_id` INT NOT NULL AUTO_INCREMENT,
  `customer_name` VARCHAR(40) NOT NULL,
  `cutomer_password` VARCHAR(20) NOT NULL,
  `address` VARCHAR(40) NOT NULL,
  `town` VARCHAR(40) NOT NULL,
  PRIMARY KEY(`cutomer_id`)
) ENGINE=InnoDB;

CREATE TABLE `product_in_carts` (
  `order_id` INT NOT NULL AUTO_INCREMENT,
  `customer_id` INT NOT NULL,
  `product_id` INT NOT NULL,
  `quantity` INT NOT NULL,
  `date_ordered` TIMESTAMP DEFAULT NULL,  --if the item has not been ordered, this field is null 
  PRIMARY KEY(`order_id`),
  FOREIGN KEY(`customer_id`) REFERENCES `customers`(`customer_id`),
  FOREIGN KEY(`product_id`) REFERENCES `products`(`product_id`)
) ENGINE=InnoDB;

CREATE TABLE `product_names` (
   `productname_id` INT NOT NULL AUTO_INCREMENT,
   `name` VARCHAR(40) NOT NULL,
) ENGINE=InnoDB;

INSERT INTO `product_names` (`name`) VALUES 
("jeans"), 
("shirt"),
("jacket");


DELIMITER $
DROP PROCEDURE IF EXISTS `populate_products` $
CREATE PROCEDURE populate_products(entries INT, sex NVARCHAR(5))
    BEGIN
        DECLARE pr INT DEFAULT 1;
        WHILE  pr <= 3 
            DO           
                DECLARE i INT DEFAULT 1;
                WHILE i <= entries
                    DO INSERT INTO `products` (`product_price`, `product_name`, `product_sex`, `product_description`) VALUES
                        (   (ROUND(RAND() * 0.200 + 0.01, 2)), 
                            (SELECT name FROM product_names where productname_id = pr),
                            sex,
                            (CONCAT ("Our product ", (SELECT name FROM product_names where productname_id = pr), "-", i, " is very comfortable and looks great!"))
                        ); 
                    SET i = i + 1;
                END WHILE;
        END WHILE;
    END $
DELIMITER ;

EXEC populate_products(2, "men");
EXEC populate_products(2, "women");