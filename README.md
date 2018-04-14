# bamazon- Node.js and MySQL

### Overview

This app simulates an online store It can be used to track inventory.In the app there is one central MySQL database. The database is in the bamzon.sql file and includes a products table. There are two JavaScript files that view and update the database. 

### Customer User

1. In this portion of the app is for the customer to check if there is enough inventory of his desire product. 
2. A customer will start the app through node.js
	* The file name is bamazonCustomer.js.
	* At the beginning, a view of all the products will be shown.
	* Questions about the purchase will be prompt.
	* The app will inform the customer if there is enough inventory for the purchase to go through, and if so, the total of his purchase. 

![bamazon-insufficient](https://github.com/n184/bamazon/blob/master/pic/bamazon-insufficient.GIF)

### Manager User

1. In this portion of the app is for the manager to view and manipulate the store inventory. 
2. A customer will start the app through node.js
	* The file name is bamazonManager.js.
	* At the beginning questions about the desire action will be prompt.
	* Choosing "VIEW ALL PRODUCTS" will display all products.
	* Choosing "VIEW LOW INVENTORY" will display all products with an inventory that is smaller than five.
	* Choosing "ADD TO INVENTORY" will prompt additional questions that will result with an increase inventory to a specific product.
	* Choosing "ADD NEW PORDUCT" will prompt additional questions that will result with a new product added to the exisiting inventory.

### Development Personal

Noa hershko has developed this app. She is also responsible for maintaince the app.


