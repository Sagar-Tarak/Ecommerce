const express = require("express");
const router = express.Router();
const Category = require("../models/Category");
const { protectAdmin } = require("../middleware/authMiddleware");

// Get all categories
router.get("/", async (req, res) => {
  try {
    const categories = await Category.find({ isActive: true })
      .populate("subcategories")
      .sort({ sortOrder: 1 });
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Get category by slug
router.get("/:slug", async (req, res) => {
  try {
    const category = await Category.findOne({ 
      slug: req.params.slug, 
      isActive: true 
    }).populate("subcategories");
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Create category (Admin only)
router.post("/", protectAdmin, async (req, res) => {
  try {
    const category = new Category(req.body);
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Update category (Admin only)
router.put("/:id", protectAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

// Delete category (Admin only)
router.delete("/:id", protectAdmin, async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }
    
    res.json({ message: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
