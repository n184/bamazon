var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "BamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    displayTable();
});

function displayTable() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("Here are the products");
        for (var i = 0; i < results.length - 1; i++) {
            console.log("Product ID: " + results[i].item_id + " || Product: " + results[i].product_name + " || Price: " + results[i].price);
        }
        buyProduct();
    });
}

function buyProduct() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([{
                    name: "productId",
                    type: "input",
                    message: "What is the ID of the product they would like to buy?"
                },
                {
                    name: "amount",
                    type: "input",
                    message: "How many units of the product they would like to buy?",

                }

            ])
            .then(function(answer) {
                //console.log(results);
                var chosenItemId;
                var chosenItemPrice;
                for (var i = 0; i < results.length; i++) {
                    if ((results[i].item_id == answer.productId) && (results[i].stock_quantity <= parseInt(answer.amount))) {
                        console.log("Insufficient quantity!");
                    }
                    if ((results[i].item_id == answer.productId) && (results[i].stock_quantity >= parseInt(answer.amount))) {
                        chosenItemId = results[i].item_id;
                        chosenItemPrice = results[i].price;
                        newQuantity = results[i].stock_quantity - answer.amount

                        connection.query(
                            "UPDATE products SET ? WHERE ?", [{
                                    stock_quantity: answer.amount,
                                },
                                {
                                    item_id: chosenItemId
                                }
                            ],
                            function(err) {
                                if (err) throw err;
                                var total = chosenItemPrice * parseInt(answer.amount)
                                console.log("Your order is ready to be processed. Your total is : " + total);
                                connection.end();
                            }
                        );


                    }
                }

            });
    });
}