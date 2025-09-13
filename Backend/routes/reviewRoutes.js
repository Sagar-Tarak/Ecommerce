const express = require("express");
const router = express.Router();
const Review = require("../models/Review");
const Product = require("../models/Product");
const { protectUser } = require("../middleware/authMiddleware");

// Get reviews for a product
router.get("/product/:productId", async (req, res) => {
  try {
    const { page = 1, limit = 10, rating } = req.query;
    const skip = (page - 1) * limit;

    let query = { product: req.params.productId };
    if (rating) {
      query.rating = parseInt(rating);
    }

    const reviews = await Review.find(query)
      .populate("user", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Review.countDocuments(query);

    res.json({
      reviews,
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

// Get user's reviews
router.get("/user", protectUser, async (req, res) => {
  try {
    const reviews = await Review.find({ user: req.user.id })
      .populate("product", "name images price")
      .sort({ createdAt: -1 });

    res.json(reviews);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create a review
router.post("/", protectUser, async (req, res) => {
  const { productId, rating, title, comment, images } = req.body;
  const userId = req.user.id;

  try {
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Check if user already reviewed this product
    const existingReview = await Review.findOne({ user: userId, product: productId });
    if (existingReview) {
      return res.status(400).json({ message: "You have already reviewed this product" });
    }

    const review = new Review({
      user: userId,
      product: productId,
      rating,
      title,
      comment,
      images: images || [],
    });

    await review.save();
    await review.populate("user", "name");

    res.status(201).json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update a review
router.put("/:id", protectUser, async (req, res) => {
  try {
    const review = await Review.findOne({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    Object.assign(review, req.body);
    await review.save();
    await review.populate("user", "name");

    res.json(review);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete a review
router.delete("/:id", protectUser, async (req, res) => {
  try {
    const review = await Review.findOneAndDelete({ 
      _id: req.params.id, 
      user: req.user.id 
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ message: "Review deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Mark review as helpful
router.post("/:id/helpful", async (req, res) => {
  try {
    const review = await Review.findByIdAndUpdate(
      req.params.id,
      { $inc: { helpful: 1 } },
      { new: true }
    );

    if (!review) {
      return res.status(404).json({ message: "Review not found" });
    }

    res.json({ helpful: review.helpful });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
