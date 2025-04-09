import React from "react";
import { motion } from "framer-motion";
function Review() {
  return (
    <div className="w-full h-full relative">
      {/* Title section */}
      <h1 className="absolute text-7xl text-textBlack font-bold tracking-wider top-20 left-40 z-10">
        REVIEWS
      </h1>

      {/* Review Cards section */}
      <div className="relative mt-[200px] mb-30 flex justify-center items-center gap-x-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-[500px] h-[500px] rounded-xl overflow-hidden shadow-lg flex flex-col bg-white"
        >
          {/* Top Text Section */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-textBlack">
                  Good Quality
                </h3>
                <p className="text-sm text-textBlack">
                  I highly recommend shopping from kicks
                </p>
              </div>
              <img
                src="/user.jpg"
                alt="user"
                className="w-10 h-10 rounded-full object-cover ml-4"
              />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="text-textBlack font-medium ml-2">5.0</span>
            </div>
          </div>

          {/* Image taking remaining space */}
          <div className="flex-1 overflow-hidden">
            <img
              src="/r1.jpg"
              alt="review1"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-[500px] h-[500px] rounded-xl overflow-hidden shadow-lg flex flex-col bg-white"
        >
          {/* Top Text Section */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-textBlack">
                  Good Quality
                </h3>
                <p className="text-sm text-textBlack">
                  I highly recommend shopping from kicks
                </p>
              </div>
              <img
                src="/user.jpg"
                alt="user"
                className="w-10 h-10 rounded-full object-cover ml-4"
              />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="text-textBlack font-medium ml-2">5.0</span>
            </div>
          </div>

          {/* Image taking remaining space */}
          <div className="flex-1 overflow-hidden">
            <img
              src="/r2.jpg"
              alt="review1"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.3 }}
          className="w-[500px] h-[500px] rounded-xl overflow-hidden shadow-lg flex flex-col bg-white"
        >
          {/* Top Text Section */}
          <div className="p-4">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-xl font-bold text-textBlack">
                  Good Quality
                </h3>
                <p className="text-sm text-textBlack">
                  I highly recommend shopping from kicks
                </p>
              </div>
              <img
                src="/user.jpg"
                alt="user"
                className="w-10 h-10 rounded-full object-cover ml-4"
              />
            </div>

            {/* Rating */}
            <div className="flex items-center gap-1 mt-3">
              <span className="text-yellow-500 text-lg">★★★★★</span>
              <span className="text-textBlack font-medium ml-2">5.0</span>
            </div>
          </div>

          {/* Image taking remaining space */}
          <div className="flex-1 overflow-hidden">
            <img
              src="/r3.jpg"
              alt="review1"
              className="w-full h-full object-cover object-center"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

export default Review;
