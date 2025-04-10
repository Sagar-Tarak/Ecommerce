const express = require("express");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protectUser } = require("../middleware/authMiddleware"); // Import protectUser middleware
const router = express.Router();

// ** Add items to cart - POST route (Protected for authenticated users)
router.post("/add", protectUser, async (req, res) => {
  const { productId, quantity } = req.body;
  const userId = req.user.id; // Extract userId from the decoded JWT (from protectUser middleware)

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    let cart = await Cart.findOne({ user: userId });
    if (!cart) {
      // If no cart exists for the user, create a new cart
      cart = new Cart({
        user: userId,
        items: [{ product: productId, quantity }],
      });
      await cart.save();
      return res.status(201).json(cart);
    }

    // If cart exists, update the quantity of the item or add it if not already present
    const itemIndex = cart.items.findIndex(
      (item) => item.product.toString() === productId.toString()
    );
    if (itemIndex >= 0) {
      // Item already in cart, update the quantity
      cart.items[itemIndex].quantity += quantity;
    } else {
      // Item not in cart, add it
      cart.items.push({ product: productId, quantity });
    }

    await cart.save();
    res.json(cart); // Return the updated cart
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ** View cart - GET route (Protected for authenticated users)
router.get("/:userId", protectUser, async (req, res) => {
  const userId = req.user.id; // Get userId from JWT decoded data

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }
    res.json(cart); // Return the cart with populated items
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ** Remove items from the cart - DELETE route (Protected for authenticated users)
router.delete("/remove", protectUser, async (req, res) => {
  const { productId } = req.body;
  const userId = req.user.id; // Extract userId from the decoded JWT

  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(400).json({ message: "Cart not found" });
    }

    // Filter out the item to be removed from the cart
    const updatedItems = cart.items.filter(
      (item) => item.product.toString() !== productId.toString()
    );
    cart.items = updatedItems; // Update cart with remaining items
    await cart.save();
    res.json(cart); // Return updated cart
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
