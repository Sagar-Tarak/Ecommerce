import React from "react";
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

function Product_Details() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10">
      {/* Product Detail Section */}
      <div className="flex gap-12">
        {/* Left - Product Images */}
        <div className="flex-[3]">
          <div className="grid grid-cols-2 gap-4">
            {[1, 2, 3, 4].map((_, i) => (
              <img
                key={i}
                src="/public/2.jpg"
                alt={`Shoe angle ${i + 1}`}
                className="w-[530px] h-[510px] object-cover rounded-3xl"
              />
            ))}
          </div>
        </div>

        {/* Right - Product Info */}
        <div className="flex-[1.5]">
          <span className="inline-block bg-blue-600 text-white text-md font-medium px-5 py-3 rounded-xl">
            New Release
          </span>

          <h1 className="text-4xl mt-5 font-bold text-gray-900 leading-snug">
            ADIDAS 4DFWD X PARLEY RUNNING SHOES
          </h1>

          <p className="text-2xl mt-2 font-semibold text-blue-600">$125.00</p>

          {/* Color Selector */}
          <div className="mb-5">
            <p className="text-md font-medium text-gray-700 mb-1 mt-5">COLOR</p>
            <div className="flex items-center space-x-3">
              <button className="w-8 h-8 rounded-full bg-[#2f3a59] border-2 border-black"></button>
              <button className="w-6 h-6 rounded-full bg-[#566257] border-2 border-transparent hover:border-black"></button>
            </div>
          </div>

          {/* Size Selector */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <p className="text-md font-medium text-gray-700">Size</p>
              <span className="text-md underline text-gray-500 cursor-pointer">
                Size Chart
              </span>
            </div>
            <div className="flex flex-wrap gap-2 mb-5">
              {["38", "39", "40", "41", "42", "43", "44", "45", "46", "47"].map(
                (size) => (
                  <button
                    key={size}
                    className={`w-13 h-13 border rounded-lg text-sm font-medium px-3 py-2 ${
                      size === "38"
                        ? "bg-black text-white border-black"
                        : "border-gray-300 hover:border-black"
                    }`}
                  >
                    {size}
                  </button>
                )
              )}
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <button className="bg-black text-white font-medium px-6 py-3 tracking-wider rounded-lg w-full">
                ADD TO CART
              </button>
              <button className="border border-gray-300 rounded-lg w-12 h-12 flex items-center justify-center">
                ❤️
              </button>
            </div>

            <button className="bg-blue-600 text-white font-medium px-6 py-3 tracking-wider rounded-lg w-full">
              BUY IT NOW
            </button>
          </div>

          {/* Product Info */}
          <div className="pt-4 space-y-2 text-sm text-gray-600">
            <h3 className="font-semibold text-gray-800">About the Product</h3>
            <p>Shadow Navy / Army Green</p>
            <p>
              This product is excluded from all promotional discounts and
              offers.
            </p>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                Pay over time in interest-free installments with Affirm, Klarna
                or Afterpay.
              </li>
              <li>
                Join adiClub to get unlimited free standard shipping, returns, &
                exchanges.
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* You may also like section */}
      <div className="mt-20 mb-50">
        {/* Heading + Arrows */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-5xl font-bold">You may also like</h2>

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

export default Product_Details;
