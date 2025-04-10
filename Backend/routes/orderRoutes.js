const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const router = express.Router();

// ** Place an order
router.post("/place", async (req, res) => {
  const { userId, shippingAddress } = req.body;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is Empty" });

    // ** Calculate total price
    const totalPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    const order = new Order({
      user: userId,
      items: cart.items,
      totalPrice,
      shippingAddress,
    });

    await order.save();
    //** Clear tbe Cart after the order is Placed
    await Cart.deleteOne({ user: userId });

    res.status(210).json(order);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

// ** Get all order Api
router.get("/:userId", async (req, res) => {
  try {
    const order = await Order.find({ user: req.params.userId }).populate(
      "items.product"
    );
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "server error" });
  }
});

module.exports = router;
