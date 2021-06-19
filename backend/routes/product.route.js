const express = require('express');
const app = express();
const productRoute = express.Router();

// Product model
let Product = require('../models/Product');

// Add Product
productRoute.route('/addP').post((req, res, next) => {
  Product.create(req.body, (error, data) => {
    if (error) {
      console.log(error)
    } else {
      res.json(data)
    }
  })
});

// Get All Products
productRoute.route('/getallP').get((req, res) => {
  Product.find((error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// Get single Product
productRoute.route('/getP/:_id').get((req, res) => {
  Product.findById(req.params._id, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


// Update Product
productRoute.route('/updateP/:_id').put((req, res, next) => {
  Product.findByIdAndUpdate(req.params._id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Data updated successfully')
    }
  })
})

// Delete Product
productRoute.route('/deleteP/:_id').delete((req, res, next) => {
  Product.findOneAndDelete({ _id: req.params._id }, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
})

module.exports = productRoute;
