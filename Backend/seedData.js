const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Product = require("./models/Product");
const Category = require("./models/Category");
const User = require("./models/User");

dotenv.config();

const sampleProducts = [
  {
    name: "Nike Air Max 270",
    brand: "Nike",
    price: 125,
    originalPrice: 150,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    images: ["/1.jpg", "/2.jpg", "/3.jpg"],
    colors: [
      { name: "Shadow Navy", hex: "#2f3a59" },
      { name: "Army Green", hex: "#566257" }
    ],
    description: "The Nike Air Max 270 delivers visible cushioning under every step. The design draws inspiration from Air Max icons, showcasing Nike's greatest innovation with its large window and fresh array of colors.",
    shortDescription: "Visible cushioning under every step",
    category: "Sneakers",
    subcategory: "Running",
    isNew: true,
    isFeatured: true,
    isOnSale: true,
    discountPercentage: 17,
    stock: 50,
    tags: ["running", "comfort", "air max"],
    specifications: {
      material: "Mesh and synthetic upper",
      sole: "Rubber outsole",
      weight: "320g",
      origin: "Vietnam"
    },
    rating: {
      average: 4.5,
      count: 23
    }
  },
  {
    name: "Adidas 4DFWD X Parley Running Shoes",
    brand: "Adidas",
    price: 125,
    originalPrice: 125,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    images: ["/2.jpg", "/3.jpg", "/4.jpg"],
    colors: [
      { name: "Core Black", hex: "#000000" },
      { name: "Cloud White", hex: "#ffffff" }
    ],
    description: "These running shoes are made with Primeblue, a high-performance recycled material made in part with Parley Ocean Plastic. The 4D midsole is designed to help you run longer.",
    shortDescription: "High-performance recycled material",
    category: "Sneakers",
    subcategory: "Running",
    isNew: true,
    isFeatured: false,
    isOnSale: false,
    discountPercentage: 0,
    stock: 30,
    tags: ["running", "sustainable", "parley"],
    specifications: {
      material: "Primeblue recycled material",
      sole: "4D midsole",
      weight: "310g",
      origin: "China"
    },
    rating: {
      average: 4.2,
      count: 15
    }
  },
  {
    name: "Puma RS-X3 X-Ray",
    brand: "Puma",
    price: 110,
    originalPrice: 130,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    images: ["/5.jpg", "/1.jpg", "/2.jpg"],
    colors: [
      { name: "Black", hex: "#000000" },
      { name: "White", hex: "#ffffff" },
      { name: "Red", hex: "#ff0000" }
    ],
    description: "The RS-X3 X-Ray takes the retro-futuristic aesthetic to the next level with bold color combinations and chunky silhouettes that make a statement.",
    shortDescription: "Retro-futuristic aesthetic",
    category: "Sneakers",
    subcategory: "Lifestyle",
    isNew: false,
    isFeatured: true,
    isOnSale: true,
    discountPercentage: 15,
    stock: 25,
    tags: ["lifestyle", "retro", "statement"],
    specifications: {
      material: "Synthetic upper",
      sole: "Rubber outsole",
      weight: "350g",
      origin: "Indonesia"
    },
    rating: {
      average: 4.0,
      count: 8
    }
  },
  {
    name: "Nike Jordan 1 Retro High",
    brand: "Nike",
    price: 170,
    originalPrice: 170,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    images: ["/3.jpg", "/4.jpg", "/5.jpg"],
    colors: [
      { name: "Bred", hex: "#000000" },
      { name: "White", hex: "#ffffff" }
    ],
    description: "The Air Jordan 1 Retro High OG 'Bred' brings back the classic colorway that started it all. This iconic silhouette features premium leather construction and the legendary Air-Sole unit.",
    shortDescription: "The classic that started it all",
    category: "Sneakers",
    subcategory: "Basketball",
    isNew: false,
    isFeatured: true,
    isOnSale: false,
    discountPercentage: 0,
    stock: 15,
    tags: ["jordan", "basketball", "classic", "premium"],
    specifications: {
      material: "Premium leather",
      sole: "Air-Sole unit",
      weight: "400g",
      origin: "China"
    },
    rating: {
      average: 4.8,
      count: 45
    }
  },
  {
    name: "Dropset Trainer Shoes",
    brand: "Nike",
    price: 130,
    originalPrice: 130,
    sizes: [38, 39, 40, 41, 42, 43, 44, 45, 46, 47],
    images: ["/1.jpg", "/2.jpg", "/3.jpg"],
    colors: [
      { name: "Enamel Blue", hex: "#0066cc" },
      { name: "University White", hex: "#ffffff" }
    ],
    description: "Men's Road Running Shoes designed for comfort and performance. Features responsive cushioning and breathable upper for all-day wear.",
    shortDescription: "Comfort and performance",
    category: "Sneakers",
    subcategory: "Training",
    isNew: false,
    isFeatured: false,
    isOnSale: false,
    discountPercentage: 0,
    stock: 40,
    tags: ["training", "comfort", "performance"],
    specifications: {
      material: "Mesh upper",
      sole: "Rubber outsole",
      weight: "280g",
      origin: "Vietnam"
    },
    rating: {
      average: 4.3,
      count: 12
    }
  }
];

const sampleCategories = [
  {
    name: "Sneakers",
    slug: "sneakers",
    description: "All types of athletic and lifestyle sneakers",
    image: "/cate-1.webp",
    isActive: true,
    sortOrder: 1
  },
  {
    name: "Running",
    slug: "running",
    description: "Running and athletic shoes",
    image: "/cate-2.webp",
    isActive: true,
    parentCategory: null,
    sortOrder: 2
  },
  {
    name: "Basketball",
    slug: "basketball",
    description: "Basketball shoes and sneakers",
    image: "/cate-1.webp",
    isActive: true,
    parentCategory: null,
    sortOrder: 3
  },
  {
    name: "Lifestyle",
    slug: "lifestyle",
    description: "Casual and lifestyle sneakers",
    image: "/cate-2.webp",
    isActive: true,
    parentCategory: null,
    sortOrder: 4
  }
];

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB");

    // Clear existing data
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log("Cleared existing data");

    // Insert categories
    const categories = await Category.insertMany(sampleCategories);
    console.log("Inserted categories");

    // Insert products
    const products = await Product.insertMany(sampleProducts);
    console.log("Inserted products");

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

// Run the seed function
seedDatabase();
