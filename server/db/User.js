const express = require('express');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String,
    image: String,
    cart: [],
    created_at: { type: Date, default: Date.now }
})

const User = mongoose.model('user', UserSchema);

module.exports = User;