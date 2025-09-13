# Ecommerce Frontend

A modern React-based ecommerce frontend application built with Vite, featuring a complete shopping experience with authentication, cart management, and product browsing.

## Features

- **Modern UI/UX**: Beautiful, responsive design with smooth animations
- **Authentication**: User registration and login with JWT tokens
- **Product Browsing**: Browse products with filtering, search, and pagination
- **Shopping Cart**: Add, remove, and manage cart items
- **Product Details**: Detailed product pages with image galleries and specifications
- **User Profile**: Account management and order history
- **Responsive Design**: Works seamlessly on desktop and mobile devices

## Tech Stack

- **React 18** - Frontend framework
- **Vite** - Build tool and development server
- **React Router** - Client-side routing
- **Tailwind CSS** - Utility-first CSS framework
- **Framer Motion** - Animation library
- **React Icons** - Icon library
- **Swiper** - Touch slider component

## Project Structure

```
src/
├── components/          # Reusable UI components
│   ├── cards.jsx       # Product card component
│   ├── Categories.jsx  # Category display component
│   ├── Footer.jsx      # Footer component
│   ├── Layout.jsx      # Main layout wrapper
│   ├── Navbar.jsx      # Navigation bar
│   └── Review.jsx      # Review component
├── contexts/           # React Context providers
│   ├── AuthContext.jsx # Authentication context
│   └── CartContext.jsx # Shopping cart context
├── CoreAPI/           # API integration
│   ├── Config.js      # API configuration
│   └── CoreAPI.js     # API functions
├── Pages/             # Page components
│   ├── Cart.jsx       # Shopping cart page
│   ├── Homepage.jsx   # Home page
│   ├── ListingPage.jsx # Product listing page
│   ├── Login.jsx      # Login page
│   ├── Product_Details.jsx # Product detail page
│   ├── Register.jsx   # Registration page
│   └── UserProfile.jsx # User profile page
├── App.jsx            # Main app component
├── main.jsx          # Application entry point
└── index.css         # Global styles
```

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn
- Backend API running (see Backend README)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd Frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Configure API endpoint**
   
   Update `src/CoreAPI/Config.js` to point to your backend:
   ```javascript
   export const BASE_URL = "http://localhost:5000/api";
   ```

4. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to view the application.

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Features Overview

### Authentication
- User registration and login
- JWT token-based authentication
- Protected routes
- Automatic token management

### Product Management
- Product listing with pagination
- Product search and filtering
- Product detail pages
- Related products suggestions
- Featured and new product sections

### Shopping Cart
- Add/remove items from cart
- Quantity management
- Real-time cart updates
- Cart persistence across sessions
- Order summary with shipping calculation

### User Experience
- Responsive design for all devices
- Smooth animations and transitions
- Loading states and error handling
- Intuitive navigation
- Modern UI components

## API Integration

The frontend integrates with the backend API through the `CoreAPI` module:

### Authentication Endpoints
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Product Endpoints
- `GET /api/products` - Get all products with filtering
- `GET /api/products/:id` - Get single product
- `GET /api/products/featured/list` - Get featured products
- `GET /api/products/new/list` - Get new products
- `GET /api/products/:id/related` - Get related products

### Cart Endpoints
- `GET /api/cart` - Get user's cart
- `POST /api/cart/add` - Add item to cart
- `PUT /api/cart/update` - Update cart item
- `DELETE /api/cart/remove` - Remove item from cart
- `DELETE /api/cart/clear` - Clear cart

### Order Endpoints
- `POST /api/orders/place` - Place an order
- `GET /api/orders` - Get user's orders
- `GET /api/orders/:id` - Get single order

## State Management

The application uses React Context for state management:

### AuthContext
- User authentication state
- Login/logout functionality
- Token management

### CartContext
- Shopping cart state
- Cart operations (add, remove, update)
- Cart persistence

## Styling

The application uses Tailwind CSS for styling with:
- Custom color palette
- Responsive design utilities
- Animation classes
- Component-specific styles

## Deployment

### Build for Production

```bash
npm run build
```

This creates a `dist` folder with optimized production files.

### Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

### Deploy to Netlify

1. Build the project:
   ```bash
   npm run build
   ```

2. Upload the `dist` folder to Netlify

## Environment Variables

Create a `.env` file in the root directory:

```env
VITE_API_URL=http://localhost:5000/api
```

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support or questions, please open an issue in the repository.