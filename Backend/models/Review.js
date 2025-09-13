const mongoose = require("mongoose");

const reviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    title: {
      type: String,
      required: true,
    },
    comment: {
      type: String,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    helpful: {
      type: Number,
      default: 0,
    },
    images: [{
      type: String,
    }],
  },
  { timestamps: true }
);

// Ensure one review per user per product
reviewSchema.index({ user: 1, product: 1 }, { unique: true });

// Update product rating when review is saved
reviewSchema.post("save", async function () {
  const Review = this.constructor;
  const productId = this.product;
  
  const reviews = await Review.find({ product: productId });
  const averageRating = reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length;
  
  await mongoose.model("Product").findByIdAndUpdate(productId, {
    "rating.average": Math.round(averageRating * 10) / 10,
    "rating.count": reviews.length,
  });
});

module.exports = mongoose.model("Review", reviewSchema);
