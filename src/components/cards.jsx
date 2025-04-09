import React from "react";

const Cards = ({ image, title, price, isNew }) => {
  return (
    <div className=" p-4 rounded-2xl w-[350px] h-[350px]">
      {/* Image Container */}
      <div className="relative bg-white p-2 rounded-3xl">
        {/* "New" Badge */}
        {isNew && (
          <span className="absolute h-10 w-15 top-2 left-2 bg-blue-500 text-white text-center text-sm font-medium pt-2 rounded-br-3xl rounded-tl-3xl">
            New
          </span>
        )}
        <img
          src={image}
          alt={title}
          className="w-[318px] h-[350px] object-cover rounded-3xl"
        />
      </div>

      {/* Product Info */}
      <div className="mt-4 text-center">
        <h3 className="text-lg font-bold text-black">{title}</h3>
        <button className="mt-2 bg-black text-white font-semibold py-2 px-4 rounded-lg w-full hover:bg-gray-800 transition">
          VIEW PRODUCT - <span className="text-yellow-400">${price}</span>
        </button>
      </div>
    </div>
  );
};

export default Cards; // ✅ Make sure you're exporting it correctly!
