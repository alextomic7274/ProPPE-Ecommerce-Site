// Import required dependencys and create express app.
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

// Import custom authentication module
const authUser = require('./custom_modules/authUser');

// Hard code a website user for testing purposes
authUser.createUser("user", "pass");

app.set('view engine', 'ejs');
app.use(bodyParser.json());
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

// Database connection
const DBConnect = require('./custom_modules/database_connection');
const { connect } = require('http2');

// Create connection to database using a custom module
const connection = DBConnect('localhost', 'root', 'root', 'G00411239');

// Test database connection
connection.connect((err) => {
    if (err) {
        console.error('Error connecting to DB: ',err);
    }   else {
        console.log('Connected to database');
    }
});

app.get("/shop", function(req, res) {

    // Get all products with SQL
    const getProductsQuery = "SELECT * FROM product;";

    // Execute
    connection.query(getProductsQuery, function(err, results) {
        if (err) {
            console.error("Error retrieving products from database", err);
        };

        res.render('shop.ejs', { products: results });
    });
});


// Process POST request that sends contact form data from client side
app.post('/submit', (req, res) => {
    const { name, email, message } = req.body;
    console.log(`${name}, ${email}, ${message}`);

    // Process form contents - email or store in DB

    res.status(200).send('Form submitted successfully');
});

// Start the server
const port = 3000;
app.listen(port, () => {
    console.log('Server listening on port '+port);
});

// Handles log in form submission
app.post("/login", function(req, res) {
    const username = req.body.username;
    const password = req.body.password;

    const authenticated = authUser.checkUserCredentials(username, password);

    if(authenticated) {
        res.redirect('/homepage.html');
    }   else {
        console.log("Not successful");
    }

});


