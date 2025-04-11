const express = require('express');
const Product = require('../model/Product');

const router = express.Router();

// ADD PRODUCT
router.post('/add', async (req, res) => {
  try {
    const { productName, productPrice, productUnit, productDescription } = req.body;

    const productExist = await Product.findOne({ productName });
    if (productExist) {
      return res.json({
        status: false,
        message: "Product already exist"
      });
    }

    const prodObj = new Product({ productName, productPrice, productUnit, productDescription });
    await prodObj.save();

    res.json({
      status: true,
      message: "Product added successfully"
    });
  } catch (err) {
    res.json({
      status: false,
      message: err
    });
  }
});

// GET ALL PRODUCTS
router.get('/get', async (req, res) => {
  try {
    const results = await Product.find();
    res.json({
      status: true,
      message: results
    });
  } catch (err) {
    res.json({
      status: false,
      message: err
    });
  }
});

// DELETE PRODUCT (fix route to include :id)
router.delete('/delete/:id', async (req, res) => {
  try {
    const id = req.params.id;
    await Product.findByIdAndDelete(id);
    res.json({
      status: true,
      message: 'Delete product successfully'
    });
  } catch (err) {
    res.json({
      status: false,
      message: err
    });
  }
});

// UPDATE PRODUCT
router.put('/update/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const updated = await Product.findByIdAndUpdate(id, req.body, { new: true });
    res.json({
      status: true,
      message: 'Product updated successfully',
      data: updated
    });
  } catch (err) {
    res.json({
      status: false,
      message: err
    });
  }
});

module.exports = router;
