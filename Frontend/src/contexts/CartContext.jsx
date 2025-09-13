import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCart, 
  addToCart, 
  updateCartItem, 
  removeFromCart, 
  clearCart, 
  getCartCount 
} from '../CoreAPI/CoreAPI';
import { useAuth } from './AuthContext';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState({ items: [] });
  const [cartCount, setCartCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const { isAuthenticated } = useAuth();

  // Load cart when user is authenticated
  useEffect(() => {
    if (isAuthenticated) {
      loadCart();
    } else {
      setCart({ items: [] });
      setCartCount(0);
    }
  }, [isAuthenticated]);

  const loadCart = async () => {
    try {
      setLoading(true);
      const cartData = await getCart();
      setCart(cartData);
      setCartCount(cartData.items?.length || 0);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setLoading(false);
    }
  };

  const addItem = async (productId, quantity = 1) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to add items to cart' };
    }

    try {
      setLoading(true);
      const response = await addToCart({ productId, quantity });
      setCart(response);
      setCartCount(response.items?.length || 0);
      return { success: true };
    } catch (error) {
      console.error('Error adding to cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (productId, quantity) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to update cart' };
    }

    try {
      setLoading(true);
      const response = await updateCartItem({ productId, quantity });
      setCart(response);
      setCartCount(response.items?.length || 0);
      return { success: true };
    } catch (error) {
      console.error('Error updating cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (productId) => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to remove items from cart' };
    }

    try {
      setLoading(true);
      const response = await removeFromCart(productId);
      setCart(response);
      setCartCount(response.items?.length || 0);
      return { success: true };
    } catch (error) {
      console.error('Error removing from cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const clearAll = async () => {
    if (!isAuthenticated) {
      return { success: false, error: 'Please login to clear cart' };
    }

    try {
      setLoading(true);
      await clearCart();
      setCart({ items: [] });
      setCartCount(0);
      return { success: true };
    } catch (error) {
      console.error('Error clearing cart:', error);
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const getTotalPrice = () => {
    return cart.items?.reduce((total, item) => {
      return total + (item.product?.price || 0) * item.quantity;
    }, 0) || 0;
  };

  const getTotalItems = () => {
    return cart.items?.reduce((total, item) => total + item.quantity, 0) || 0;
  };

  const value = {
    cart,
    cartCount,
    loading,
    addItem,
    updateItem,
    removeItem,
    clearAll,
    loadCart,
    getTotalPrice,
    getTotalItems
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};
