const express = require('express')
const Router = express.Router();
const mongoose = require('mongoose')
const Order = require('../db/Order')

Router.post('/', (req, res, next) => {
    res.json(req.body);
    const { user_id, products, firstname, lastname, phone, country, state, address1, address2, pincode, paymentMode, totalAmount } = req.body

    const newOrder = new Order({
        user_id,
        products,
        firstname,
        lastname,
        phone,
        country,
        state,
        address1,
        address2,
        pincode,
        paymentMode,
        totalAmount,
        status: 'processing',
    })

    newOrder.save((err, result) => {
        if (err) {
            consoe.log(err)
        }
        console.log(result)
    });
    res.json('Order Successful');

})

Router.get('/orders/:id', (req, res, next) => {
    const { id } = req.params;
    Order.find({ user_id: id }).sort({ created_at: 'desc' }).exec((err, result) => {
        if (err) {
            console.log(err)
        }
        console.log("Orders => ", result)
        res.json(result);
    })

})

Router.post('/updateStatus', (req, res, next) => {
    const { id, status } = req.body;
    Order.updateOne({ _id: id }, { status: status }, (err, result) => {
        console.log(result);
        res.json(result);
    })
})

Router.get('/', (req, res, next) => {
    Order.find({}).sort({ created_at: "desc" }).exec((err, result) => {
        if (err) {
            console.log(err)
        }
        res.json(result);
    })
})

module.exports = Router;