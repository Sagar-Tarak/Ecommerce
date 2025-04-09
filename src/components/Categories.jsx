import React, { useRef } from "react";
import { MdArrowOutward } from "react-icons/md";
import { motion, useInView } from "framer-motion";

function Categories() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true });

  return (
    <div
      className="w-full min-h-[924px] bg-textBlack relative"
      ref={containerRef}
    >
      {/* Title */}
      <motion.h1
        className="absolute text-7xl text-whitePrimary top-20 left-40 font-bold mt-3 tracking-wider"
        initial={{ opacity: 0, y: -50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        CATEGORIES
      </motion.h1>

      {/* White container with rounded top-left */}
      <motion.div
        className="absolute bottom-0 right-0 w-full max-w-screen-2xl h-[700px] bg-whitePrimary flex rounded-tl-[80px] overflow-hidden"
        initial={{ opacity: 0, y: 100 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        {/* Image 1 */}
        <div className="w-1/2 h-full relative overflow-hidden group">
          <motion.img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="/cate-1.webp"
            alt="Category"
            initial={{ scale: 1 }}
            animate={isInView ? { scale: 1 } : {}}
          />
          <motion.div
            className="absolute bottom-8 left-8 flex items-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
          >
            <p className="text-textBlack text-3xl font-semibold">
              NIKE <br /> AIRFORCE
            </p>
            <motion.button
              className="bg-textBlack text-white p-2 mt-4 rounded-md hover:bg-black focus:outline-none"
              style={{ marginLeft: "500px" }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.12)",
                transition: {
                  type: "tween",
                  duration: 0.25,
                  ease: [0.25, 0.1, 0.25, 1],
                }, // ease-in-out
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.15 },
              }}
            >
              <MdArrowOutward className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>

        {/* Image 2 */}
        <div className="w-1/2 h-full relative overflow-hidden group">
          <motion.img
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            src="/cate-2.webp"
            alt="Category"
            initial={{ scale: 1 }}
            animate={isInView ? { scale: 1 } : {}}
          />
          <motion.div
            className="absolute bottom-8 left-8 flex items-center z-10"
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.7, duration: 0.6 }}
          >
            <p className="text-textBlack text-3xl font-semibold">
              NIKE <br /> AIRFORCE
            </p>
            <motion.button
              className="bg-textBlack text-white p-2 mt-4 rounded-md hover:bg-black focus:outline-none"
              style={{ marginLeft: "500px" }}
              whileHover={{
                scale: 1.03,
                boxShadow: "0px 6px 18px rgba(0, 0, 0, 0.12)",
                transition: {
                  type: "tween",
                  duration: 0.25,
                  ease: [0.25, 0.1, 0.25, 1],
                }, // ease-in-out
              }}
              whileTap={{
                scale: 0.98,
                transition: { duration: 0.15 },
              }}
            >
              <MdArrowOutward className="h-6 w-6" />
            </motion.button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}

export default Categories;
