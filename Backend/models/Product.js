const mongoose = require("mongoose");

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    originalPrice: {
      type: Number,
    },
    sizes: {
      type: [Number], // ** e.g [7,8,9,10,11]
      required: true,
    },
    images: [{
      type: String, // Array of image URLs
    }],
    colors: [{
      name: String,
      hex: String,
    }],
    description: {
      type: String,
    },
    shortDescription: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    subcategory: {
      type: String,
    },
    isNew: {
      type: Boolean,
      default: false,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isOnSale: {
      type: Boolean,
      default: false,
    },
    discountPercentage: {
      type: Number,
      default: 0,
    },
    stock: {
      type: Number,
      default: 0,
    },
    tags: [String],
    specifications: {
      material: String,
      sole: String,
      weight: String,
      origin: String,
    },
    rating: {
      average: {
        type: Number,
        default: 0,
      },
      count: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Product", productSchema);
