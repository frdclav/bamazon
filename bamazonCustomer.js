// get the client
const mysql = require('mysql2');
const inquirer = require('inquirer');

// create the connection to database
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'bamazon'
});

// connection.query(
//     'SELECT * FROM `products`',
//     function (err, results, fields) {
//         if (err) {
//             console.log(err)
//         }
//         console.log(results); // results contains rows returned by server
//         console.log(fields); // fields contains extra meta data about results, if available
//     }
// );

const beginCustomerOrder = () => {

}








//   create function to display the current items:
const main = async () => {
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
        console.log('Item ID:', element.item_id)
        console.log('Product Name:', element.product_name);
        console.log('Department:', element.department_name);
        console.log('Price:', element.price)
        console.log('=====')
    });
    inquirer
        .prompt([
            {
                name: 'item_id',
                message: 'What is the item_id of the product you want to order?'
            },
            {
                name: 'quantity',
                message: 'How many of the product would you like to order?'
            }
        ])
        .then(async answers => {
            console.log('Checking if we have item_id', answers.item_id,'in stock...')
            if (rows[answers.item_id-1]) {
                if (rows[answers.item_id-1].stock_quantity < answers.quantity) {
                    console.log('Unfortunately, we only have', rows[answers.item_id-1].stock_quantity, 'of the item you have requested.')
                } else {
                    // update code here
                    await connection.execute('UPDATE `products` SET  stock_quantity = ? WHERE item_id = ?', [rows[answers.item_id-1].stock_quantity - answers.quantity, answers.item_id]);
                    console.log('Thank you for your purchase! Your total cost for this order is', answers.quantity*rows[answers.item_id-1].price);
                    
                }
            } else {
                console.log ('Unfortunately, item_id', answers.item_id, 'does not exist.')
            }
            process.exit();
        })
        
}

main();
