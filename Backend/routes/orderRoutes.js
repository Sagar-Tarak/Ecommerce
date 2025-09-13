const express = require("express");
const Order = require("../models/Order");
const Cart = require("../models/Cart");
const Product = require("../models/Product");
const { protectUser } = require("../middleware/authMiddleware");
const router = express.Router();

// ** Place an order
router.post("/place", protectUser, async (req, res) => {
  const { shippingAddress, paymentMethod = "card" } = req.body;
  const userId = req.user.id;

  try {
    const cart = await Cart.findOne({ user: userId }).populate("items.product");
    if (!cart || cart.items.length === 0)
      return res.status(400).json({ message: "Cart is Empty" });

    // ** Calculate total price
    const totalPrice = cart.items.reduce(
      (total, item) => total + item.product.price * item.quantity,
      0
    );

    // Calculate shipping cost (example: $6.99 for orders under $100)
    const shippingCost = totalPrice >= 100 ? 0 : 6.99;
    const finalTotal = totalPrice + shippingCost;

    const order = new Order({
      user: userId,
      items: cart.items,
      totalPrice: finalTotal,
      shippingAddress,
      paymentMethod,
      status: "Pending",
    });

    await order.save();
    await order.populate("items.product");
    
    //** Clear the Cart after the order is Placed
    await Cart.deleteOne({ user: userId });

    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ** Get user's orders
router.get("/", protectUser, async (req, res) => {
  try {
    const { page = 1, limit = 10, status } = req.query;
    const skip = (page - 1) * limit;
    
    let query = { user: req.user.id };
    if (status) {
      query.status = status;
    }

    const orders = await Order.find(query)
      .populate("items.product")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Order.countDocuments(query);

    res.json({
      orders,
      pagination: {
        current: parseInt(page),
        pages: Math.ceil(total / limit),
        total,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ** Get single order
router.get("/:id", protectUser, async (req, res) => {
  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    }).populate("items.product");
    
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }
    
    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ** Update order status (for admin or user cancellation)
router.put("/:id/status", protectUser, async (req, res) => {
  const { status } = req.body;
  const userId = req.user.id;

  try {
    const order = await Order.findOne({ 
      _id: req.params.id, 
      user: userId 
    });

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // Only allow certain status changes
    const allowedStatuses = ["Cancelled"];
    if (!allowedStatuses.includes(status)) {
      return res.status(400).json({ message: "Invalid status update" });
    }

    order.status = status;
    await order.save();
    await order.populate("items.product");

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// ** Get order statistics
router.get("/stats/summary", protectUser, async (req, res) => {
  try {
    const userId = req.user.id;
    
    const totalOrders = await Order.countDocuments({ user: userId });
    const pendingOrders = await Order.countDocuments({ 
      user: userId, 
      status: "Pending" 
    });
    const completedOrders = await Order.countDocuments({ 
      user: userId, 
      status: "Completed" 
    });
    
    const totalSpent = await Order.aggregate([
      { $match: { user: userId, status: "Completed" } },
      { $group: { _id: null, total: { $sum: "$totalPrice" } } }
    ]);

    res.json({
      totalOrders,
      pendingOrders,
      completedOrders,
      totalSpent: totalSpent[0]?.total || 0,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
