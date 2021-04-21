const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fileUpload = require('express-fileupload');
const mongoose = require('mongoose');
const products = require('./router/product');
const User = require('./router/User');
const Order = require('./router/Order');
const app = express();
// const Router = express.Router();
app.use(bodyParser.json());
app.use(cors());
app.use(fileUpload());
app.use('/product', products);
app.use('/user', User);
app.use('/order', Order)


const connection = new mongoose.connect('mongodb://localhost:27017/products', { useNewUrlParser: true })
    .then(() => console.log("Connection Established from Mongodb"))
    .catch((error) => console.log('Connection not Estaablished from Mongodb : ', error))

app.listen(8000, () => {
    console.log('Server is Listening...');
});