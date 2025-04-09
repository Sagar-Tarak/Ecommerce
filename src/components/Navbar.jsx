import React, { useState } from "react";
import {
  FaSearch,
  FaShoppingCart,
  FaUser,
  FaBars,
  FaTimes,
} from "react-icons/fa";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const navItemVariants = {
  hidden: { opacity: 0, y: -10 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1 },
  }),
};

function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="bg-[#FAFAFA] max-w-[1600px] mx-auto mt-8 rounded-3xl px-6 md:px-8 py-4 relative shadow-sm"
    >
      <div className="flex justify-between items-center h-16">
        {/* Mobile Menu Button */}
        <button
          className="md:hidden text-xl text-gray-700 z-50"
          onClick={toggleMenu}
        >
          {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Left Nav Items */}
        <ul className="hidden md:flex space-x-6 text-md font-medium">
          {["New Drops", "Mens", "Womens"].map((label, i) => (
            <motion.li
              key={label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="cursor-pointer hover:text-orange-500 transition"
            >
              <Link to="/listing">{label}</Link>
            </motion.li>
          ))}
        </ul>

        {/* Centered Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2"
        >
          <Link to="/">
            <img src="/Logo.svg" alt="logo" className="h-10 w-auto" />
          </Link>
        </motion.div>

        {/* Right Icons */}
        <ul className="hidden md:flex gap-6 list-none">
          {[
            { icon: <FaSearch size={20} />, label: "Search", path: "/search" },
            { icon: <FaUser size={20} />, label: "Profile", path: "/profile" },
            {
              icon: <FaShoppingCart size={20} />,
              label: "Cart",
              badge: "3",
              path: "/cart",
            },
          ].map((item, i) => (
            <motion.li
              key={item.label}
              custom={i}
              initial="hidden"
              animate="visible"
              variants={navItemVariants}
              className="relative"
            >
              <Link to={item.path} aria-label={item.label}>
                <button className="hover:text-orange-500 transition">
                  {item.icon}
                </button>
                {item.badge && (
                  <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                    {item.badge}
                  </span>
                )}
              </Link>
            </motion.li>
          ))}
        </ul>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 space-y-4">
          {["New Drops", "Mens", "Womens"].map((label) => (
            <Link
              key={label}
              to="/listing"
              onClick={toggleMenu}
              className="block text-center font-medium text-gray-700 hover:text-orange-500"
            >
              {label}
            </Link>
          ))}
          <div className="flex justify-center gap-6 mt-4">
            <Link to="/search" onClick={toggleMenu}>
              <FaSearch size={20} />
            </Link>
            <Link to="/profile" onClick={toggleMenu}>
              <FaUser size={20} />
            </Link>
            <Link to="/cart" onClick={toggleMenu} className="relative">
              <FaShoppingCart size={20} />
              <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                3
              </span>
            </Link>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default Navbar;
