// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');



const viewProductsForSale = async () => {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'bamazon'
    });
    // query database
    const [rows, fields] = await connection.execute('SELECT * FROM `products` ');
    console.log('Here are the current items we have for sale');
    console.log('=====')
    rows.forEach(element => {
        console.log('Item ID:', element.item_id);
        console.log('Product Name:', element.product_name);
        console.log('Department:', element.department_name);
        console.log('Price:', element.price);
        console.log('Quantity', element.stock_quantity);
        console.log('=====')
    });
    main();
}

const viewLowInventory = async () => {
    // get the client
    const mysql = require('mysql2/promise');
    // create the connection
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'bamazon'
    });
    // query database
    const [rows, fields] = await connection.execute('SELECT * FROM `products` WHERE stock_quantity < 5');
    console.log('Here are the current low inventory items');
    console.log('=====')
    rows.forEach(element => {
        console.log('Item ID:', element.item_id);
        console.log('Product Name:', element.product_name);
        console.log('Department:', element.department_name);
        console.log('Price:', element.price);
        console.log('Quantity', element.stock_quantity);
        console.log('=====')
    });
    main();
}

const addToInventory = async () => {
    inquirer
        .prompt([
            {
                name: 'item_id',
                message: 'What is the item_id of the product you want to add invetory to?'
            },
            {
                name: 'quantity',
                message: 'How many of the product would you like to add?'
            }
        ])
        .then(async answers => {
            // get the client
            const mysql = require('mysql2/promise');
            // create the connection
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'bamazon'
            });
            await connection.execute('UPDATE  `products` SET stock_quantity = stock_quantity + ? WHERE item_id = ?', [answers.quantity, answers.item_id]);
            console.log('Stock quantity has been updated!');

            main();
        })
    


}

const addNewProduct = async () => {
    inquirer
        .prompt([
            {
                name: 'name',
                message: 'What is the the name of the new product?'
            },
            {
                name: 'department',
                message: 'What department does the new product belong to?'
            },
            {
                name: 'price',
                message: 'How much will we be selling the new product for?'
            },
            {
                name: 'quantity',
                message: 'How many of the new product would you like to add?'
            }
        ])
        .then(async answers => {
            // get the client
            const mysql = require('mysql2/promise');
            // create the connection
            const connection = await mysql.createConnection({
                host: 'localhost',
                user: 'root',
                password: 'root',
                database: 'bamazon'
            });
            await connection.execute('INSERT INTO  `products` (product_name, department_name, price, stock_quantity) VALUES (?,?,?,?)', [answers.name, answers.quantity,answers.price,answers.quantity]);
            console.log('New Product has been added!');

            main();
        })
    


}




const main = () => {

    inquirer
        .prompt([
            {
                type: 'list',
                name: 'option',
                message: 'What would you like to do?',
                choices: ['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product', 'Exit'],
            },
        ]).then(async answers => {
            console.info('Answer:', answers.option);
            switch (answers.option) {
                case 'View Products for Sale':
                    await viewProductsForSale();

                    break;
                case 'View Low Inventory':
                    await viewLowInventory();

                    break;
                case 'Add to Inventory':
                    await addToInventory();

                    break;
                case 'Add New Product':
                    await addNewProduct();

                    break;
                case 'Exit':
                    process.exit();
                    break;

                default:
                    break;
            }
        });
}
main();