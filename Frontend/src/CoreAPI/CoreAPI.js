// src/api/core.js
import { BASE_URL } from "./config";

// Helper function to get auth headers
const getAuthHeaders = () => {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// ============ AUTH API ============
// POST /login
export const loginUser = async ({ email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    if (!res.ok) throw new Error("Login failed");

    return await res.json();
  } catch (err) {
    throw err;
  }
};

// POST /register
export const registerUser = async ({ name, email, password }) => {
  try {
    const res = await fetch(`${BASE_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });

    if (!res.ok) throw new Error("Registration failed");

    return await res.json();
  } catch (err) {
    throw err;
  }
};

// ============ PRODUCTS API ============
// GET /products
export const getProducts = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/products?${queryString}`);
    
    if (!res.ok) throw new Error("Failed to fetch products");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// GET /products/:id
export const getProduct = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    
    if (!res.ok) throw new Error("Failed to fetch product");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// GET /products/featured/list
export const getFeaturedProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products/featured/list`);
    
    if (!res.ok) throw new Error("Failed to fetch featured products");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// GET /products/new/list
export const getNewProducts = async () => {
  try {
    const res = await fetch(`${BASE_URL}/products/new/list`);
    
    if (!res.ok) throw new Error("Failed to fetch new products");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// GET /products/:id/related
export const getRelatedProducts = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/products/${id}/related`);
    
    if (!res.ok) throw new Error("Failed to fetch related products");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// ============ CATEGORIES API ============
// GET /categories
export const getCategories = async () => {
  try {
    const res = await fetch(`${BASE_URL}/categories`);
    
    if (!res.ok) throw new Error("Failed to fetch categories");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// ============ CART API ============
// GET /cart
export const getCart = async () => {
  try {
    const res = await fetch(`${BASE_URL}/cart`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) throw new Error("Failed to fetch cart");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// POST /cart/add
export const addToCart = async ({ productId, quantity }) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });
    
    if (!res.ok) throw new Error("Failed to add to cart");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// PUT /cart/update
export const updateCartItem = async ({ productId, quantity }) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/update`, {
      method: "PUT",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, quantity }),
    });
    
    if (!res.ok) throw new Error("Failed to update cart item");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// DELETE /cart/remove
export const removeFromCart = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/cart/remove`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });
    
    if (!res.ok) throw new Error("Failed to remove from cart");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// DELETE /cart/clear
export const clearCart = async () => {
  try {
    const res = await fetch(`${BASE_URL}/cart/clear`, {
      method: "DELETE",
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) throw new Error("Failed to clear cart");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// GET /cart/count
export const getCartCount = async () => {
  try {
    const res = await fetch(`${BASE_URL}/cart/count`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) throw new Error("Failed to get cart count");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// ============ ORDERS API ============
// POST /orders/place
export const placeOrder = async ({ shippingAddress, paymentMethod }) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/place`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ shippingAddress, paymentMethod }),
    });
    
    if (!res.ok) throw new Error("Failed to place order");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// GET /orders
export const getOrders = async (params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/orders?${queryString}`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) throw new Error("Failed to fetch orders");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// GET /orders/:id
export const getOrder = async (id) => {
  try {
    const res = await fetch(`${BASE_URL}/orders/${id}`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) throw new Error("Failed to fetch order");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// ============ WISHLIST API ============
// GET /wishlist
export const getWishlist = async () => {
  try {
    const res = await fetch(`${BASE_URL}/wishlist`, {
      headers: getAuthHeaders(),
    });
    
    if (!res.ok) throw new Error("Failed to fetch wishlist");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// POST /wishlist/add
export const addToWishlist = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/wishlist/add`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });
    
    if (!res.ok) throw new Error("Failed to add to wishlist");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// DELETE /wishlist/remove
export const removeFromWishlist = async (productId) => {
  try {
    const res = await fetch(`${BASE_URL}/wishlist/remove`, {
      method: "DELETE",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId }),
    });
    
    if (!res.ok) throw new Error("Failed to remove from wishlist");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// ============ REVIEWS API ============
// GET /reviews/product/:productId
export const getProductReviews = async (productId, params = {}) => {
  try {
    const queryString = new URLSearchParams(params).toString();
    const res = await fetch(`${BASE_URL}/reviews/product/${productId}?${queryString}`);
    
    if (!res.ok) throw new Error("Failed to fetch reviews");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};

// POST /reviews
export const createReview = async ({ productId, rating, title, comment, images }) => {
  try {
    const res = await fetch(`${BASE_URL}/reviews`, {
      method: "POST",
      headers: getAuthHeaders(),
      body: JSON.stringify({ productId, rating, title, comment, images }),
    });
    
    if (!res.ok) throw new Error("Failed to create review");
    
    return await res.json();
  } catch (err) {
    throw err;
  }
};
