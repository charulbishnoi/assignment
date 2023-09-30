console.log("Welcome to order management application")
const express = require('express');
const app = new express();
const cors = require('cors');
const config = require('./config.json');
const bodyParser = require('body-parser');
const port = config.serverPort;
const orderRoutes = require('./routes/order.route')
require('./db/connection');

// Allowing cors
app.use(cors());
app.options('*', cors());
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
});

app.use(bodyParser.json({extended: true}));

// Route will be start with /api/
app.use('/api', orderRoutes);

app.listen(port, ()=> {
console.log(`Server is running on ${port}`);
})

module.exports = app;