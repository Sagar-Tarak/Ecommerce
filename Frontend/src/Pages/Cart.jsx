import React, { useState, useEffect } from "react";
import { FaHeart, FaTrashAlt, FaPlus, FaMinus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Cards from "../components/cards";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";
import { getNewProducts } from "../CoreAPI/CoreAPI";

export default function Cart() {
  const navigate = useNavigate();
  const { cart, updateItem, removeItem, getTotalPrice, getTotalItems, loading } = useCart();
  const { isAuthenticated } = useAuth();
  const [suggestedProducts, setSuggestedProducts] = useState([]);
  const [updating, setUpdating] = useState({});
  const [promoCode, setPromoCode] = useState("");
  
  const cartSectionWidth = "lg:w-3/5";
  const summarySectionWidth = "lg:w-2/5";

  useEffect(() => {
    if (!isAuthenticated) {
      navigate('/login');
      return;
    }

    const fetchSuggestedProducts = async () => {
      try {
        const products = await getNewProducts();
        setSuggestedProducts(products.slice(0, 4));
      } catch (error) {
        console.error('Error fetching suggested products:', error);
      }
    };

    fetchSuggestedProducts();
  }, [isAuthenticated, navigate]);

  const handleQuantityChange = async (productId, newQuantity) => {
    if (newQuantity < 1) {
      await removeItem(productId);
      return;
    }

    setUpdating(prev => ({ ...prev, [productId]: true }));
    await updateItem(productId, newQuantity);
    setUpdating(prev => ({ ...prev, [productId]: false }));
  };

  const handleRemoveItem = async (productId) => {
    await removeItem(productId);
  };

  const handleCheckout = () => {
    if (cart.items.length === 0) {
      alert('Your cart is empty');
      return;
    }
    // Navigate to checkout or implement checkout logic
    alert('Checkout functionality would be implemented here');
  };

  const shippingCost = getTotalPrice() >= 100 ? 0 : 6.99;
  const finalTotal = getTotalPrice() + shippingCost;

  if (!isAuthenticated) {
    return null; // Will redirect to login
  }

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      {/* Banner */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide">
          Your Shopping Cart
        </h2>
        <div className="flex flex-col sm:flex-row justify-between text-md text-gray-600 mt-1 gap-2">
          <p>
            Review your items and proceed to checkout when ready.
          </p>
          <div>
            <span className="text-gray-500">
              {getTotalItems()} item{getTotalItems() !== 1 ? 's' : ''} in cart
            </span>
          </div>
        </div>
      </div>

      {/* Main Section (Cart + Summary) */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Left - Cart Section */}
        <div
          className={`p-6 rounded-xl shadow-sm bg-white w-full ${cartSectionWidth}`}
        >
          <h3 className="text-3xl font-bold mb-1 tracking-wide">Your Bag</h3>
          <p className="text-sm text-gray-500 mb-6">
            Items in your bag not reserved – check out now to make them yours.
          </p>

          {loading ? (
            <div className="animate-pulse">
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
              <div className="h-32 bg-gray-200 rounded mb-4"></div>
            </div>
          ) : cart.items && cart.items.length > 0 ? (
            <div className="space-y-6">
              {cart.items.map((item, index) => (
                <div key={item.product._id || index} className="flex items-start gap-5 border-t pt-6">
                  <img
                    src={item.product.images?.[0] || "/1.jpg"}
                    alt={item.product.name}
                    className="w-[250px] h-[250px] object-cover rounded-xl transition-transform duration-300 hover:scale-105"
                  />
                  <div className="flex-1 space-y-3">
                    <div className="flex justify-between items-start">
                      <div>
                        <h4 className="font-bold text-2xl mb-2 tracking-wide">
                          {item.product.name}
                        </h4>
                        <p className="text-md text-gray-600 mb-2">
                          {item.product.brand}
                        </p>
                        <p className="text-md text-gray-600">
                          {item.product.category}
                        </p>
                      </div>
                      <p className="text-blue-600 font-bold text-xl mt-2">
                        ${item.product.price}
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex gap-6 items-center">
                      <div>
                        <label className="text-lg text-gray-500 mr-1">Quantity</label>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity - 1)}
                            disabled={updating[item.product._id]}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                          >
                            <FaMinus size={12} />
                          </button>
                          <span className="px-3 py-1 border border-gray-300 rounded min-w-[3rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, item.quantity + 1)}
                            disabled={updating[item.product._id]}
                            className="w-8 h-8 border border-gray-300 rounded flex items-center justify-center hover:bg-gray-100 disabled:opacity-50"
                          >
                            <FaPlus size={12} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Icons */}
                    <div className="flex gap-4 mt-2">
                      <button className="text-xl hover:scale-105 transition text-gray-600 hover:text-red-500">
                        <FaHeart />
                      </button>
                      <button 
                        onClick={() => handleRemoveItem(item.product._id)}
                        className="text-xl hover:scale-105 transition text-gray-600 hover:text-red-500"
                      >
                        <FaTrashAlt />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Your cart is empty</h3>
              <p className="text-gray-500 mb-4">Add some items to get started!</p>
              <button 
                onClick={() => navigate('/')}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition"
              >
                Continue Shopping
              </button>
            </div>
          )}
        </div>

        {/* Right - Order Summary */}
        {cart.items && cart.items.length > 0 && (
          <div className={`mt-4 lg:mt-0 w-full ${summarySectionWidth}`}>
            <h3 className="text-xl font-bold mb-4">Order Summary</h3>
            <div className="space-y-3 text-sm text-gray-700">
              <div className="flex justify-between">
                <span>{getTotalItems()} ITEM{getTotalItems() !== 1 ? 'S' : ''}</span>
                <span>${getTotalPrice().toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>{shippingCost === 0 ? 'FREE' : `$${shippingCost.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span>Sales Tax</span>
                <span>-</span>
              </div>
              <div className="flex justify-between font-bold text-gray-900 border-t pt-3">
                <span>Total</span>
                <span>${finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button 
              onClick={handleCheckout}
              className="mt-6 bg-black text-white py-3 w-full rounded-md font-semibold tracking-wide hover:bg-gray-900 transition"
            >
              CHECKOUT
            </button>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-600 mb-1">
                Promo Code
              </label>
              <div className="flex">
                <input
                  type="text"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="border border-gray-300 rounded-l-md px-3 py-2 w-full text-sm"
                  placeholder="Enter code"
                />
                <button className="bg-black text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-800">
                  Apply
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* You may also like section */}
      {suggestedProducts.length > 0 && (
        <div className="mt-20 mb-50">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-3xl md:text-4xl font-bold">You may also like</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-6">
            {suggestedProducts.map((product, index) => (
              <Cards
                key={product._id || index}
                image={product.images?.[0] || "/2.jpg"}
                title={product.name}
                price={product.price}
                isNew={product.isNew}
                productId={product._id}
                originalPrice={product.originalPrice}
                isOnSale={product.isOnSale}
                discountPercentage={product.discountPercentage}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
