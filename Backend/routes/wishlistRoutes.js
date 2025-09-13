const express = require("express");
const router = express.Router();
const Wishlist = require("../models/Wishlist");
const Product = require("../models/Product");
const { protectUser } = require("../middleware/authMiddleware");

// Get user's wishlist
router.get("/", protectUser, async (req, res) => {
  try {
    const wishlist = await Wishlist.findOne({ user: req.user.id })
      .populate("products");
    
    if (!wishlist) {
      return res.json({ products: [] });
    }
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Add product to wishlist
router.post("/add", protectUser, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      wishlist = new Wishlist({
        user: userId,
        products: [productId],
      });
    } else {
      // Check if product is already in wishlist
      if (wishlist.products.includes(productId)) {
        return res.status(400).json({ message: "Product already in wishlist" });
      }
      wishlist.products.push(productId);
    }

    await wishlist.save();
    await wishlist.populate("products");
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Remove product from wishlist
router.delete("/remove", protectUser, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = wishlist.products.filter(
      (id) => id.toString() !== productId.toString()
    );

    await wishlist.save();
    await wishlist.populate("products");
    
    res.json(wishlist);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Clear entire wishlist
router.delete("/clear", protectUser, async (req, res) => {
  const userId = req.user.id;

  try {
    const wishlist = await Wishlist.findOne({ user: userId });
    
    if (!wishlist) {
      return res.status(404).json({ message: "Wishlist not found" });
    }

    wishlist.products = [];
    await wishlist.save();
    
    res.json({ message: "Wishlist cleared successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
