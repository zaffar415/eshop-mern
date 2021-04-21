const express = require('express');
const Product = require('../db/product');
const Router = express.Router();
const shortid = require('shortid');
const path = require('path');
const fs = require('fs');

Router.post('/add', (req, res, next) => {
    console.log(req.body);
    var imagesArr = [];
    var id = shortid.generate();
    if (req.files) {
        for (var key in req.files) {
            console.log(key);
            console.log(req.files[key].name);
            req.files[key].mv(`./uploads/products/${id + req.files[key].name}`, err => {
                console.log(err);
            })

            imagesArr.push(id + req.files[key].name)
        }
    }

    const newProduct = new Product({
        name: req.body.name,
        small_description: req.body.small_description,
        description: req.body.description,
        category: req.body.category,
        image: imagesArr,
        original_price: req.body.original_price,
        sale_price: req.body.sale_price,
    });

    newProduct.save((err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result);
    });

    res.json(imagesArr);
});

Router.get("/:id", (req, res, next) => {
    let id = req.params.id;
    Product.findOne({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
            res.json(err);
        }
        console.log(result)
        res.json(result)
    })
})

Router.post('/delete', (req, res, next) => {
    let id = req.body.productID;

    Product.findOne({ _id: id }, (err, result) => {
        if (err) {
            console.log(err);
        }
        if (result.image.length !== 0) {
            for (let i = 0; i < result.image.length; i++) {
                fs.unlink(`./uploads/products/${result.image[i]}`, (err) => {
                    console.log(err);
                })
            }
        }

        Product.deleteOne({ _id: id }, (err, result) => {
            if (err) {
                console.log(err)
                res.json(err)
            }
            console.log(result)
            res.json(result)
        })
    })

})

Router.get('/', (req, res, next) => {
    Product.find({}).sort({ created_at: 'desc' }).exec((err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result)
        res.json(result)
    })
})

Router.get('/category/:category', (req, res, next) => {
    const category = req.params.category;
    Product.find({ category: category }, (err, result) => {
        if (err) {
            console.log(err);
        }
        console.log(result)
        res.json(result)
    })
})

Router.get('/image/:name', (req, res, next) => {
    console.log(req.params.name);
    res.sendFile(`${req.params.name}`, {
        root: path.join('./uploads/products/'),
    });
})


module.exports = Router;