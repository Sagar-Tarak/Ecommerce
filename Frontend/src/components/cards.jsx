import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

const Cards = ({ image, title, price, isNew, productId, originalPrice, isOnSale, discountPercentage }) => {
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  const [adding, setAdding] = useState(false);

  const handleAddToCart = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAdding(true);
    const result = await addItem(productId, 1);
    setAdding(false);
    
    if (result.success) {
      alert('Added to cart!');
    } else {
      alert(result.error || 'Failed to add to cart');
    }
  };

  const displayPrice = originalPrice && isOnSale ? originalPrice : price;
  const salePrice = isOnSale ? price : null;

  return (
    <div className="p-4 rounded-2xl w-[350px] group">
      {/* Image Container */}
      <div className="relative bg-white p-2 rounded-3xl overflow-hidden">
        {/* "New" Badge */}
        {isNew && (
          <span className="absolute h-10 w-15 top-2 left-2 bg-blue-500 text-white text-center text-sm font-medium pt-2 rounded-br-3xl rounded-tl-3xl z-10">
            New
          </span>
        )}
        
        {/* Sale Badge */}
        {isOnSale && discountPercentage && (
          <span className="absolute h-10 w-15 top-2 right-2 bg-red-500 text-white text-center text-sm font-medium pt-2 rounded-br-3xl rounded-tl-3xl z-10">
            -{discountPercentage}%
          </span>
        )}

        <Link to={`/products/${productId}`}>
          <img
            src={image}
            alt={title}
            className="w-[318px] h-[250px] object-cover rounded-3xl group-hover:scale-105 transition-transform duration-300"
          />
        </Link>
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-black mb-2">{title}</h3>
        
        {/* Price Display */}
        <div className="mb-3">
          {salePrice ? (
            <div className="flex items-center justify-center gap-2">
              <span className="text-lg font-bold text-red-500">${salePrice}</span>
              <span className="text-sm text-gray-500 line-through">${displayPrice}</span>
            </div>
          ) : (
            <span className="text-lg font-bold text-black">${displayPrice}</span>
          )}
        </div>

        <button 
          onClick={handleAddToCart}
          disabled={adding}
          className="bg-black text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-gray-800 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {adding ? 'Adding...' : 'ADD TO CART'}
        </button>
      </div>
    </div>
  );
};

export default Cards; // ✅ Make sure you're exporting it correctly!
