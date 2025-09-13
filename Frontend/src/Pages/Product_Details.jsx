import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import Cards from "../components/cards";
import { getProduct, getRelatedProducts } from "../CoreAPI/CoreAPI";
import { useCart } from "../contexts/CartContext";
import { useAuth } from "../contexts/AuthContext";

function Product_Details() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const { isAuthenticated } = useAuth();
  
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState("");
  const [selectedColor, setSelectedColor] = useState("");
  const [selectedSize, setSelectedSize] = useState(null);
  const [adding, setAdding] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const [productData, relatedData] = await Promise.all([
          getProduct(id),
          getRelatedProducts(id)
        ]);
        setProduct(productData);
        setRelatedProducts(relatedData);
        
        // Set initial selections
        if (productData.images && productData.images.length > 0) {
          setSelectedImage(productData.images[0]);
        }
        if (productData.colors && productData.colors.length > 0) {
          setSelectedColor(productData.colors[0].hex);
        }
      } catch (error) {
        console.error('Error fetching product:', error);
        navigate('/');
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    }
  }, [id, navigate]);

  const handleAddToCart = async () => {
    if (!selectedSize) return alert("Please select a size first.");
    
    if (!isAuthenticated) {
      alert('Please login to add items to cart');
      return;
    }

    setAdding(true);
    const result = await addItem(product._id, 1);
    setAdding(false);
    
    if (result.success) {
      alert('Added to cart!');
    } else {
      alert(result.error || 'Failed to add to cart');
    }
  };

  const handleBuyNow = () => {
    if (!selectedSize) return alert("Please select a size first.");
    if (!isAuthenticated) {
      alert('Please login to proceed with purchase');
      return;
    }
    // Navigate to checkout or handle buy now
    navigate('/cart');
  };

  if (loading) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-10">
        <div className="animate-pulse">
          <div className="flex flex-col lg:flex-row gap-12">
            <div className="flex-[3]">
              <div className="grid grid-cols-2 gap-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-[510px] bg-gray-200 rounded-3xl"></div>
                ))}
              </div>
            </div>
            <div className="flex-[1.5]">
              <div className="h-8 bg-gray-200 rounded mb-4"></div>
              <div className="h-12 bg-gray-200 rounded mb-4"></div>
              <div className="h-6 bg-gray-200 rounded mb-4"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-[1600px] mx-auto px-4 py-10 text-center">
        <h1 className="text-2xl font-bold mb-4">Product not found</h1>
        <button 
          onClick={() => navigate('/')}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Go Home
        </button>
      </div>
    );
  }

  const productImages = product.images || ["/2.jpg"];
  const colorOptions = product.colors || [{ hex: "#2f3a59" }, { hex: "#566257" }];
  const sizeOptions = product.sizes || [38, 39, 40, 41, 42, 43, 44, 45, 46, 47];

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      {/* Product Detail Section */}
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Left - Product Images */}
        <div className="flex-[3]">
          <div className="grid grid-cols-2 gap-4">
            {productImages.map((img, i) => (
              <img
                key={i}
                src={img}
                alt={`Product angle ${i + 1}`}
                onClick={() => setSelectedImage(img)}
                className={`w-full h-[510px] object-cover rounded-3xl cursor-pointer border-4 transition ${
                  selectedImage === img ? "border-blue-500" : "border-transparent"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex-[1.5]">
          {product.isNew && (
            <span className="inline-block bg-blue-600 text-white text-md font-medium px-5 py-3 rounded-xl">
              New Release
            </span>
          )}

          <h1 className="text-4xl mt-5 font-bold text-gray-900 leading-snug">
            {product.name}
          </h1>

          <div className="mt-2">
            {product.isOnSale && product.originalPrice ? (
              <div className="flex items-center gap-3">
                <p className="text-2xl font-semibold text-red-600">${product.price}</p>
                <p className="text-xl text-gray-500 line-through">${product.originalPrice}</p>
                <span className="bg-red-100 text-red-600 px-2 py-1 rounded text-sm font-medium">
                  -{product.discountPercentage}% OFF
                </span>
              </div>
            ) : (
              <p className="text-2xl font-semibold text-blue-600">${product.price}</p>
            )}
          </div>

          {/* Color Selector */}
          {colorOptions.length > 0 && (
            <div className="mb-5">
              <p className="text-md font-medium text-gray-700 mb-1 mt-5">COLOR</p>
              <div className="flex items-center space-x-3">
                {colorOptions.map((color, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedColor(color.hex || color)}
                    className={`w-8 h-8 rounded-full border-2 transition ${
                      selectedColor === (color.hex || color) ? "border-black" : "border-transparent hover:border-black"
                    }`}
                    style={{ backgroundColor: color.hex || color }}
                    title={color.name || `Color ${index + 1}`}
                  ></button>
                ))}
              </div>
            </div>
          )}

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-md font-medium text-gray-700">Size</p>
              <span className="text-md underline text-gray-500 cursor-pointer">
                Size Chart
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {sizeOptions.map((size) => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  className={`w-13 h-13 border rounded-lg text-sm font-medium px-3 py-2 transition ${
                    selectedSize === size
                      ? "bg-black text-white border-black"
                      : "border-gray-300 hover:border-black"
                  }`}
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="bg-black text-white font-medium px-6 py-3 tracking-wider rounded-lg w-full disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {adding ? 'ADDING...' : 'ADD TO CART'}
              </button>
              <button className="border border-gray-300 rounded-lg w-12 h-12 flex items-center justify-center hover:bg-gray-100 transition">
                ❤️
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="bg-blue-600 text-white font-medium px-6 py-3 tracking-wider rounded-lg w-full hover:bg-blue-700 transition"
            >
              BUY IT NOW
            </button>
          </div>

          {/* Product Info */}
          <div className="pt-4 space-y-2 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800">About the Product</h3>
            <p>{product.shortDescription || product.description}</p>
            {product.specifications && (
              <div className="mt-4">
                <h4 className="font-semibold text-gray-800 mb-2">Specifications</h4>
                <ul className="space-y-1">
                  {product.specifications.material && (
                    <li><strong>Material:</strong> {product.specifications.material}</li>
                  )}
                  {product.specifications.sole && (
                    <li><strong>Sole:</strong> {product.specifications.sole}</li>
                  )}
                  {product.specifications.weight && (
                    <li><strong>Weight:</strong> {product.specifications.weight}</li>
                  )}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* You may also like section */}
      {relatedProducts.length > 0 && (
        <div className="mt-20 mb-50">
          <h2 className="text-5xl font-bold mb-6">You may also like</h2>

          <Swiper
            modules={[Navigation]}
            navigation
            autoHeight={true}
            spaceBetween={24}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1.2 },
              768: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 },
              1280: { slidesPerView: 3.5 },
            }}
          >
            {relatedProducts.map((product, index) => (
              <SwiperSlide key={product._id || index}>
                <Cards
                  image={product.images?.[0] || "/2.jpg"}
                  title={product.name}
                  price={product.price}
                  isNew={product.isNew}
                  productId={product._id}
                  originalPrice={product.originalPrice}
                  isOnSale={product.isOnSale}
                  discountPercentage={product.discountPercentage}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default Product_Details;
