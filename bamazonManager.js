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

    actionSelection();
});

function actionSelection() {
    inquirer.prompt({
            type: "rawlist",
            name: "doOptions",
            message: "What are you wanting to do?",
            choices: ["VIEW ALL PRODUCTS", "VIEW LOW INVENTORY", "ADD TO INVENTORY", "ADD NEW PORDUCT"]
        })
        .then(function(answer) {
            if (answer.doOptions.toUpperCase() === "VIEW ALL PRODUCTS") {
                veiwAllSelection();
            }
            if (answer.doOptions.toUpperCase() === "VIEW LOW INVENTORY") {
                veiwLowSelection();
            }
            if (answer.doOptions.toUpperCase() === "ADD TO INVENTORY") {
                addToInvetory();
            }
            if (answer.doOptions.toUpperCase() === "ADD NEW PORDUCT") {
                addToProducts();
            }


        });
}

function veiwAllSelection() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("Here are the products on sell");
        for (var i = 0; i < results.length; i++) {
            console.log("Product ID: " + results[i].item_id + " || Product: " + results[i].product_name + " || Price: " + results[i].price + " || Quantity: " + results[i].stock_quantity);
        }
        actionSelection();
    });
}

function veiwLowSelection() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        console.log("Here are the products on sell");
        for (var i = 0; i < results.length; i++) {
            if (results[i].stock_quantity <= 5) {
                console.log("Product ID: " + results[i].item_id + " || Product: " + results[i].product_name + " || Price: " + results[i].price + " || Quantity: " + results[i].stock_quantity);
            }
        }
        actionSelection();
    });
}

function addToInvetory() {
    connection.query("SELECT * FROM products", function(err, results) {
        if (err) throw err;
        // once you have the items, prompt the user for which they'd like to bid on
        inquirer
            .prompt([{
                    name: "quantity",
                    type: "input",
                    message: "How many more of the product would you like to add?"
                },
                {
                    name: "id",
                    type: "input",
                    message: "What is the desire product id?",

                }
            ])
            .then(function(answer) {

                // when finished prompting, insert a new item into the db with that info
                var chosenItem;
                var newQuantity;
                for (var i = 0; i < results.length - 1; i++) {
                    if (results[i].item_id == parseInt(answer.id)) {
                        chosenItem = results[i].item_id;
                        newQuantity = parseInt(results[i].stock_quantity) + parseInt(answer.quantity);
                        console.log(newQuantity);
                    }
                }
                connection.query(
                    "UPDATE products SET ? WHERE ?", [{
                            stock_quantity: newQuantity,
                        },
                        {
                            item_id: chosenItem
                        }
                    ],
                    function(err) {
                        if (err) throw err;
                        console.log("The change was successfully!");
                        actionSelection();
                    }
                );


            });
    });
}

function addToProducts() {
    inquirer.prompt([{
            name: "product_name",
            type: "input",
            message: "What is the product you would like to submit?"
        },
        {
            name: "department_name",
            type: "input",
            message: "What department would you like to shop from?"
        },
        {
            name: "price",
            type: "input",
            message: "What is the product price?"
        }, {
            name: "stock_quantity",
            type: "input",
            message: "What would you like the quantity to be?"
        }
    ]).then(function(answer) {
        // when finished prompting, insert a new item into the db with that info
       console.log("The new product is ready to be added!\n");
        connection.query(
            "INSERT INTO products SET ?", {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity,
            },
            function(err) {
                if (err) throw err;
                // re-prompt the user for if they want to bid or post
                actionSelection();
            }
        );
    });
}