DROP DATABASE IF EXISTS BamazonDB;

CREATE DATABASE BamazonDB;

USE BamazonDB;

CREATE TABLE products (
  item_id INT NOT NULL AUTO_INCREMENT,
  product_name VARCHAR(50) NOT NULL,
  department_name VARCHAR(50) NOT NULL,
  price DECIMAL(10,2) default 0,
  stock_quantity INT(10) NULL,
  PRIMARY KEY (item_id)
);

INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Handbag in light gray', 'Accessories', 45.79, 10);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Plate set of 12', 'Kitchen', 89.30, 4);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Suger', 'Food', 0.89, 215);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Heart neckless', 'Accessories', 17.30, 23);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Coffee', 'Food', 9.89, 467);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Handbag in namy blue', 'Accessories', 65.99, 17);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Hand blender', 'Kitchen', 115.72, 11);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Chocolate cake', 'Food', 14.65, 2);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Gatorade', 'Food', 1.29, 77);
INSERT INTO products (product_name, department_name, price, stock_quantity) values ('Men leather belt', 'Accessories', 25.50 , 21);