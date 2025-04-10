const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

// @route POST /api/products
// @desc Create a new product
router.post("/", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    const saved = await newProduct.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// routes/productRoutes.js

router.get("/", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get /api/product/:id
router.get("/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(400).json({ error: "Product not found" });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/product/:id
router.put("/:id", async (req, res) => {
  try {
    const updated = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updated) return res.status(404).json({ error: "Product not found" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/product/:id
router.delete("/:id", async (req, res) => {
  try {
    const deleted = await Product.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(400).json({ error: "Product not found" });
    res.json({ message: "Product deleted successfully " });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
