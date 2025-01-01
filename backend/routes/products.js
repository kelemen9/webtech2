// routes/products.js
const express = require('express');
const Products = require('../models/Products');
const router = express.Router();

// GET all products
router.get('/', async (req, res) => {
  try {
    const products = await Products.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

//GET a single product by ID
router.get('/:id', async (req, res) => {
  try {
    const product = await Products.findById(req.params.id);
    if (!product) {
      return res.status(404).send('Nincs ilyen termék!');
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// POST a new product
router.post('/', async (req, res) => {
  try {
    const { name, type, price, quantity } = req.body;
    const existingProduct = await Products.findOne({ name });
    if (existingProduct) {
      return res.status(400).send('Ilyen névvel már létezik termék!');
    }
    const product = new Products({ name, type, price, quantity });
    await product.save();
    res.status(201).send('A termék sikeresen hozzáadva!');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// PUT update a product by ID
router.put('/:id', async (req, res) => {
  try {
    const { name, type, price, quantity } = req.body;

    const existingProduct = await Products.findOne({ name });
    if (existingProduct && existingProduct._id.toString() !== req.params.id) {
      return res.status(400).send('Ilyen névvel már létezik termék!');
    }

    const product = await Products.findByIdAndUpdate(
      req.params.id,
      { name, type, price, quantity },
      { new: true },
    );
    if (!product) {
      return res.status(404).send('Nincs ilyen termék!');
    }
    res.status(200).send('A termék sikeresen módosítva!');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

// DELETE a product by ID
router.delete('/:id', async (req, res) => {
  try {
    const product = await Products.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send('Nincs ilyen termék!');
    }
    res.status(200).send('A termék törlése sikeres!');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
