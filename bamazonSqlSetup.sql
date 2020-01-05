CREATE DATABASE bamazon; 

USE bamazon; 
drop table products;
CREATE TABLE products 
  ( 
     item_id         INT NOT NULL auto_increment, 
     product_name    VARCHAR(100), 
     department_name VARCHAR(100), 
     price           INT, 
     stock_quantity  INT, 
     PRIMARY KEY (item_id) 
  ); 

INSERT INTO bamazon.products 
            (product_name, 
             department_name, 
             price, 
             stock_quantity) 
VALUES      ('Comb', 
             'Health and Beauty', 
             3, 
             243), 
            ('USB-C cable', 
             'Electronics', 
             7, 
             341 ), 
            ('Camera', 
             'Electronics', 
             569, 
             42), 
            ('Hammer', 
             'Home Improvement', 
             12, 
             45), 
            ('Yeezy 700 Waverunner', 
             'Shoes', 
             300, 
             0), 
            ('Shower Poof - loofah', 
             'Health and Beauty', 
             5, 
             764), 
            ('Poster Frame', 
             'Home and Kitchen', 
             25, 
             84), 
            ('Tent', 
             'Outdoor Equipment', 
             255, 
             6), 
            ('Tire Pressure Gauge', 
             'Auto', 
             5, 
             943), 
            ('Dog Food', 
             'Pets', 
             34, 
             37); 