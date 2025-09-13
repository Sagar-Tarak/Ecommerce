# Ecommerce Backend API

A comprehensive Node.js backend API for an ecommerce application built with Express.js and MongoDB.

## Features

- **User Authentication**: JWT-based authentication for users and admins
- **Product Management**: CRUD operations for products with advanced filtering and search
- **Shopping Cart**: Full cart functionality with add, update, remove, and clear operations
- **Order Management**: Complete order processing with status tracking
- **Wishlist**: Save favorite products for later
- **Review System**: Product reviews and ratings
- **Category Management**: Hierarchical category system
- **Search & Filtering**: Advanced product search with multiple filters
- **Pagination**: Efficient data pagination for large datasets

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (JSON Web Tokens)
- **Password Hashing**: bcryptjs
- **Environment Variables**: dotenv

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Backend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/ecommerce
   JWT_SECRET=your_super_secret_jwt_key_here_change_this_in_production
   NODE_ENV=development
   ```

4. **Start MongoDB**
   Make sure MongoDB is running on your system

5. **Seed the database** (optional)
   ```bash
   npm run seed
   ```

6. **Start the server**
   ```bash
   # Development mode
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/user/register` - Alternative user registration
- `POST /api/user/login` - Alternative user login

### Products
- `GET /api/products` - Get all products (with filtering, search, pagination)
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/new/list` - Get new products
- `GET /api/products/category/:category` - Get products by category
- `GET /api/products/:id/related` - Get related products
- `POST /api/products` - Create product (Admin only)
- `PUT /api/products/:id` - Update product (Admin only)
- `DELETE /api/products/:id` - Delete product (Admin only)

### Categories
- `GET /api/categories` - Get all categories
- `GET /api/categories/:slug` - Get category by slug
- `POST /api/categories` - Create category (Admin only)
- `PUT /api/categories/:id` - Update category (Admin only)
- `DELETE /api/categories/:id` - Delete category (Admin only)

### Cart
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item quantity
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear` - Clear entire cart
- `GET /api/cart/count` - Get cart item count

### Orders
- `POST /api/orders/place` - Place an order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order
- `PUT /api/orders/:id/status` - Update order status
- `GET /api/orders/stats/summary` - Get order statistics

### Wishlist
- `GET /api/wishlist` - Get user's wishlist
- `POST /api/wishlist/add` - Add product to wishlist
- `DELETE /api/wishlist/remove` - Remove product from wishlist
- `DELETE /api/wishlist/clear` - Clear wishlist

### Reviews
- `GET /api/reviews/product/:productId` - Get product reviews
- `GET /api/reviews/user` - Get user's reviews
- `POST /api/reviews` - Create a review
- `PUT /api/reviews/:id` - Update a review
- `DELETE /api/reviews/:id` - Delete a review
- `POST /api/reviews/:id/helpful` - Mark review as helpful

## Query Parameters

### Products
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 12)
- `search` - Search term
- `category` - Filter by category
- `brand` - Filter by brand
- `minPrice` - Minimum price
- `maxPrice` - Maximum price
- `sortBy` - Sort field (default: createdAt)
- `sortOrder` - Sort direction (asc/desc, default: desc)
- `isNew` - Filter new products (true/false)
- `isFeatured` - Filter featured products (true/false)
- `isOnSale` - Filter sale products (true/false)

### Orders
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `status` - Filter by order status

### Reviews
- `page` - Page number (default: 1)
- `limit` - Items per page (default: 10)
- `rating` - Filter by rating (1-5)

## Authentication

Most endpoints require authentication. Include the JWT token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

## Data Models

### Product
```javascript
{
  name: String,
  brand: String,
  price: Number,
  originalPrice: Number,
  sizes: [Number],
  images: [String],
  colors: [{ name: String, hex: String }],
  description: String,
  shortDescription: String,
  category: String,
  subcategory: String,
  isNew: Boolean,
  isFeatured: Boolean,
  isOnSale: Boolean,
  discountPercentage: Number,
  stock: Number,
  tags: [String],
  specifications: {
    material: String,
    sole: String,
    weight: String,
    origin: String
  },
  rating: {
    average: Number,
    count: Number
  }
}
```

### User
```javascript
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
```

### Cart
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }]
}
```

### Order
```javascript
{
  user: ObjectId (ref: User),
  items: [{
    product: ObjectId (ref: Product),
    quantity: Number
  }],
  totalPrice: Number,
  status: String,
  shippingAddress: {
    address: String,
    city: String,
    country: String,
    zip: String
  },
  paymentMethod: String
}
```

## Error Handling

The API returns appropriate HTTP status codes and error messages:

- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Internal Server Error

Error response format:
```javascript
{
  "message": "Error description"
}
```

## Development

### Running in Development Mode
```bash
npm run dev
```

This uses nodemon for automatic server restarts on file changes.

### Database Seeding
```bash
npm run seed
```

This populates the database with sample products and categories.

## Production Deployment

1. Set `NODE_ENV=production` in your environment variables
2. Use a strong, unique `JWT_SECRET`
3. Use a production MongoDB instance
4. Consider using PM2 for process management

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the ISC License.
