const express = require('express')
const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    user_id: String,
    products: [],
    firstname: String,
    lastname: String,
    phone: String,
    country: String,
    state: String,
    address1: String,
    address2: String,
    pincode: String,
    paymentMode: String,
    totalAmount: String,
    status: String,
    created_at: { type: Date, default: Date.now() },
})

const Order = mongoose.model('order', orderSchema);

module.exports = Order;