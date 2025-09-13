import React, { useState, useEffect } from "react";
import Cards from "../components/cards";
import Categories from "../components/Categories";
import Review from "../components/Review";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import { getFeaturedProducts, getNewProducts } from "../CoreAPI/CoreAPI";
const textFade = {
  hidden: { opacity: 0, y: 60 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: "easeOut" },
  },
};

const imageFade = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { delay: 0.2, duration: 0.8, ease: "easeOut" },
  },
};

const cardStagger = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.5,
    },
  },
};

function Homepage() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [newProducts, setNewProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [featured, newProds] = await Promise.all([
          getFeaturedProducts(),
          getNewProducts()
        ]);
        setFeaturedProducts(featured);
        setNewProducts(newProds);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div className="w-[1600px] flex flex-col mx-auto">
          {/* Heading */}
          <motion.h1
            variants={textFade}
            initial="hidden"
            animate="visible"
            className="text-center text-[#232321] text-[223px] tracking-widest font-bold mt-2"
          >
            DO IT<span className="text-bluePrimary"> RIGHT</span>
          </motion.h1>

          {/* Hero Image Section */}
          <motion.div
            variants={imageFade}
            initial="hidden"
            animate="visible"
            className="relative w-full h-[750px] mt-1"
          >
            <img
              className="h-full w-full object-cover rounded-4xl"
              src="/homeShoes2.jpg"
              alt="Home"
            />

            {/* Text over Image */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="absolute w-[490px] h-[226px] bottom-0 left-12"
            >
              <h2 className="text-whitePrimary font-semibold text-7xl">
                Nike Jordan
              </h2>
              <p className="text-whitePrimary font-light text-2xl mt-2">
                Nike introducing the new air max for everyone's comfort
              </p>
              <button className="mt-6 bg-bluePrimary text-whitePrimary font-bold py-3 px-6 rounded-lg hover:bg-gray-200 transition duration-300 hover:text-textBlack">
                Shop Now
              </button>
            </motion.div>

            {/* Right thumbnails */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="absolute w-[160px] h-[336px] bottom-0 right-8"
            >
              <img className="pb-2" src="/Rectangle 2.svg" alt="homeShoe3" />
              <img className="pb-2" src="/Rectangle 1.svg" alt="homeShoe2" />
            </motion.div>

            {/* Vertical label */}
            <motion.div
              initial={{ opacity: 0, y: -30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="absolute top-15 left-0 bg-black text-white text-xl py-4 px-2 w-12 h-60 flex items-center justify-center tracking-wider rounded-br-xl rounded-tr-xl"
            >
              <p className="text-sm font-semibold transform -rotate-90 whitespace-nowrap">
                Nike product of the year
              </p>
            </motion.div>
          </motion.div>

          {/* DropOut Section */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={cardStagger}
            className="w-full mt-20"
          >
            {/* Heading + Button */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="w-full h-[120px] flex justify-between items-end relative"
            >
              <p className="text-textBlack text-7xl font-semibold">
                DON'T MISS OUT <br />
                NEW DROPS
              </p>
              <button className="bg-bluePrimary text-whitePrimary font-bold py-3 px-6 rounded-lg hover:bg-white transition duration-300 hover:text-textBlack">
                Shop Now
              </button>
            </motion.div>

            {/* Cards Section */}
            <motion.div className="flex justify-center gap-15 mt-20 mb-60">
              {loading ? (
                // Loading skeleton
                Array.from({ length: 4 }).map((_, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                    className="w-64 h-80 bg-gray-200 rounded-lg animate-pulse"
                  />
                ))
              ) : (
                newProducts.slice(0, 4).map((product, index) => (
                  <motion.div
                    key={product._id}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.2 }}
                  >
                    <Cards
                      image={product.images?.[0] || "/1.jpg"}
                      title={product.name}
                      price={product.price}
                      isNew={product.isNew}
                      productId={product._id}
                    />
                  </motion.div>
                ))
              )}
            </motion.div>
          </motion.div>
        </div>
        {/* //* Categories Section */}
        <Categories />
        <Review />
      </div>
      {/* <Footer /> */}
    </>
  );
}

export default Homepage;
