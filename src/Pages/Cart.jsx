import React from "react";
import { FaHeart, FaTrashAlt } from "react-icons/fa";
import Cards from "../components/cards";

const suggestedProducts = [
  {
    image: "/public/2.jpg",
    title: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    isNew: true,
  },
  {
    image: "/public/2.jpg",
    title: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 135,
    isNew: true,
  },
  {
    image: "/public/2.jpg",
    title: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    isNew: true,
  },
  {
    image: "/public/2.jpg",
    title: "ADIDAS 4DFWD X PARLEY RUNNING SHOES",
    price: 125,
    isNew: true,
  },
];

export default function Cart() {
  const cartSectionWidth = "lg:w-3/5"; // Adjustable width for left section
  const summarySectionWidth = "lg:w-2/5"; // Adjustable width for right section

  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      {/* Banner */}
      <div className="mb-12">
        <h2 className="text-4xl font-bold text-gray-800 tracking-wide">
          Saving to celebrate
        </h2>
        <div className="flex flex-col sm:flex-row justify-between text-md text-gray-600 mt-1 gap-2">
          <p>
            Enjoy up to 60% off thousands of styles during the End of Year sale
            – while supplies last. No code needed.
          </p>
          <div>
            <a href="#" className="underline mr-2">
              Join us
            </a>
            or
            <a href="#" className="underline ml-2">
              Sign-in
            </a>
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

          {/* Cart Item */}
          <div className="flex items-start gap-5 border-t pt-6">
            <img
              src="/public/1.jpg"
              alt="DROPSET TRAINER SHOES"
              className="w-[250px] h-[250px] object-cover rounded-xl transition-transform duration-300 hover:scale-105"
            />
            <div className="flex-1 space-y-3">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-2xl mb-2 tracking-wide">
                    DROPSET TRAINER SHOES
                  </h4>
                  <p className="text-md text-gray-600 mb-2">
                    Men’s Road Running Shoes
                  </p>
                  <p className="text-md text-gray-600">
                    Enamel Blue / University White
                  </p>
                </div>
                <p className="text-blue-600 font-bold text-xl mt-2">$130.00</p>
              </div>

              {/* Size and Quantity */}
              <div className="flex gap-6">
                <div>
                  <label className="text-lg text-gray-500 mr-1">Size</label>
                  <select className="border border-gray-300 rounded px-2 py-1 text-md">
                    <option>10</option>
                    <option>11</option>
                    <option>12</option>
                  </select>
                </div>
                <div>
                  <label className="text-lg text-gray-500 mr-1">Quantity</label>
                  <select className="border border-gray-300 rounded px-2 py-1 text-md">
                    <option>1</option>
                    <option>2</option>
                  </select>
                </div>
              </div>

              {/* Icons */}
              <div className="flex gap-4 mt-2">
                <button className="text-xl hover:scale-105 transition text-gray-600 hover:text-red-500">
                  <FaHeart />
                </button>
                <button className="text-xl hover:scale-105 transition text-gray-600 hover:text-black">
                  <FaTrashAlt />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Right - Order Summary */}
        <div className={`mt-4 lg:mt-0 w-full ${summarySectionWidth}`}>
          <h3 className="text-xl font-bold mb-4">Order Summary</h3>
          <div className="space-y-3 text-sm text-gray-700">
            <div className="flex justify-between">
              <span>1 ITEM</span>
              <span>$130.00</span>
            </div>
            <div className="flex justify-between">
              <span>Delivery</span>
              <span>$6.99</span>
            </div>
            <div className="flex justify-between">
              <span>Sales Tax</span>
              <span>-</span>
            </div>
            <div className="flex justify-between font-bold text-gray-900 border-t pt-3">
              <span>Total</span>
              <span>$136.99</span>
            </div>
          </div>

          <button className="mt-6 bg-black text-white py-3 w-full rounded-md font-semibold tracking-wide hover:bg-gray-900 transition">
            CHECKOUT
          </button>

          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Promo Code
            </label>
            <div className="flex">
              <input
                type="text"
                className="border border-gray-300 rounded-l-md px-3 py-2 w-full text-sm"
                placeholder="Enter code"
              />
              <button className="bg-black text-white px-4 py-2 text-sm rounded-r-md hover:bg-gray-800">
                Apply
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* You may also like section (below cart & summary) */}
      <div className="mt-20 mb-50">
        {/* Heading + Arrows */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl md:text-4xl font-bold">You may also like</h2>

          <div className="flex gap-2">
            <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
              ◀
            </button>
            <button className="w-10 h-10 border border-gray-300 rounded-lg flex items-center justify-center hover:bg-gray-100 transition">
              ▶
            </button>
          </div>
        </div>

        {/* Suggested Product Cards */}
        <div className="flex flex-wrap justify-center gap-6">
          {suggestedProducts.map((item, index) => (
            <Cards
              key={index}
              image={item.image}
              title={item.title}
              price={item.price}
              isNew={item.isNew}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
