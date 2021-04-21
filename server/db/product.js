const express = require('express');
const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
    name: String,
    small_description: String,
    description: String,
    category: String,
    image: Array,
    original_price: String,
    sale_price: String,
    created_at: { type: Date, default: Date.now },
});

const Product = mongoose.model('Products', ProductsSchema);

module.exports = Product;