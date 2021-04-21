const express = require('express');
const User = require('../db/User');
const Router = express.Router();
const shortid = require('shortid');

Router.post('/add-user', (req, res, next) => {
    console.log(req.files);
    const { name, email, password } = req.body;
    var image = null;

    User.find({ email: email }, (err, result) => {
        if (result.length == 0) {
            if (req.files) {
                const file = req.files.image;
                image = shortid.generate() + file.name;
                file.mv(`./uploads/profiles/${image}`, err => {
                    console.log(err);
                })
            }

            const newUser = new User({
                name,
                email,
                password,
                image,
                cart: [],
            });
            newUser.save((err, result) => {
                if (err) {
                    console.log(err);
                }
                console.log(result);
                res.json(result);
            });

        } else {
            res.json("User Already exist");
        }
    })

});

Router.post('/login', (req, res, next) => {
    const { email, password } = req.body;
    
    User.findOne({ email: email }, (err, result) => {
        if (err) {
            console.log(err)
            res.json('Some Critical Error try after sometime');
        }
        if (result !== null) {

            if (result.password === password) {
                console.log(result)
                res.json(result);
            } else {
                res.json('Wrong Password')
            }
        } else {
            console.log('Email Not Found');
            res.json('Email Not Found');
        }
    })

})

Router.post('/addtocart', (req, res, next) => {
    // console.log(req.body)
    const { _id, cart } = req.body;
    User.updateOne({ _id: _id }, { $set: { cart: cart } }, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
        res.json(result);
    })
})

Router.post('/updateCart', (req, res, next) => {
    console.log(req.body);
    const { user_id, cart } = req.body;
    User.updateOne({ _id: user_id }, { $set: { cart: cart } }, (err, result) => {
        if (err) {
            console.log(err)
        }
        console.log(result);
        res.json(result)
    })


})

module.exports = Router;