const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors'); 
require('dotenv/config');
const authJwt = require('./helpers/jwt');
const errorHandler = require('./helpers/error-handler')

app.use(cors());
app.options('*', cors())



//middleware
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(authJwt());
app.use('/public/uploads', express.static(__dirname + '/public/uploads' ));
app.use(errorHandler);




//Routes
const categoriesRoutes = require('./routers/categories');
const productsRoutes = require('./routers/products');
const usersRoutes = require('./routers/users');
const ordersRoutes = require('./routers/orders');



const api = process.env.API_URL;

app.use(`${api}/categories`, categoriesRoutes);
app.use(`${api}/products`, productsRoutes)
app.use(`${api}/users`, usersRoutes);
app.use(`${api}/orders`, ordersRoutes);











//Database
mongoose.connect(process.env.CONNECTION_STRING ,{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName:'eshop-database'
})
.then(()=>{
    console.log('database connection is ready...')
})
.catch((err)=>{
    console.log(err);
})




//Development Server
//app.listen(3000);
 

//Production
var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    console.log("Express is walking on port " + port )
})






