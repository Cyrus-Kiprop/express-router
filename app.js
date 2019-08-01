const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
// const mongoose = require('mongoose');

const app = express();

const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');



//Connect to the database
// const db = require('./keys').mongodbURI;
// mongoose.connect('mongodb://127.0.0.1:27017/shop', { useNewUrlParser: true })
// .then(()=> console.log('database connected successfully'))
// .catch(error => {
//     console.log(error);
// });


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false }));
app.use(morgan('dev'));



// Add headers to the response. This will not give any response. It will only edit the information
// This is also a way to protect your application such that only your domain can access your application
app.use((req, res, next)=> {
    res.header('Access-Control-Allow-Origin', '*');    // * gives access to any origin
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');

    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'Put, Post, Patch, Delete, Update, Get' );
        return res.status(200).json({});
    }
});



// any request that starts with /products will be handled by the middleware below. 
// The middleware is passed the productRoutes variable which is required from the  products routes
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);


// handling errors using the default Error object
// This middleware will handle all the errors related to the database, application
app.use((req, res, next)=> {
    const error = new Error('NOT FOUND');
    error.status = 404;
    next(error);
})

app.use((error, req, res, next)=>{
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    })
})

module.exports = app;
