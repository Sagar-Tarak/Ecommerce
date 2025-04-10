import React from "react";
import Cards from "../components/cards";

const products = [
  {
    image: "/public/1.jpg",
    title: "ULTRABOOST 1.0 MIAMI",
    price: 120,
    isNew: true,
  },
  {
    image: "/public/2.jpg",
    title: "ADIDAS OZELIA SHOES",
    price: 130,
    isNew: true,
  },
  {
    image: "/public/3.jpg",
    title: "ADIDAS 4DFWD 2 RUNNING SHOES",
    price: 110,
    isNew: true,
  },
  {
    image: "/public/1.jpg",
    title: "ULTRABOOST 1.0 MIAMI",
    price: 120,
    isNew: false,
  },
  {
    image: "/public/2.jpg",
    title: "ADIDAS OZELIA SHOES",
    price: 130,
    isNew: false,
  },
  {
    image: "/public/3.jpg",
    title: "ADIDAS 4DFWD 2 RUNNING SHOES",
    price: 110,
    isNew: true,
  },
];

function Banner() {
  return (
    <div className="relative overflow-hidden rounded-2xl h-[280px] w-full mb-15">
      <img
        src="/public/banner.jpg"
        alt="Banner"
        className="object-cover w-full h-full"
      />
      <div className="absolute inset-0 bg-black bg-opacity-50 flex flex-col justify-center px-8">
        <h2 className="text-white text-4xl font-bold mb-2">
          Limited time only
        </h2>
        <h3 className="text-white text-5xl font-extrabold mb-4">Get 30% off</h3>
        <p className="text-gray-200 max-w-md">
          Sneakers made with your comfort in mind so you can put all of your
          focus into your next session.
        </p>
      </div>
    </div>
  );
}

export default function ListingPage() {
  return (
    <div className="max-w-[1600px] mx-auto px-4 py-10 mb-15">
      {/* Banner */}
      <Banner />

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-1/4">
          <h2 className="text-xl font-bold mb-6">Filters</h2>

          {/* Sizes */}
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Size</h4>
            <div className="flex gap-2 flex-wrap">
              {["6", "7", "8", "9", "10", "11"].map((size) => (
                <button
                  key={size}
                  className="border border-gray-300 text-sm px-3 py-1 rounded hover:bg-black hover:text-white transition"
                >
                  {size}
                </button>
              ))}
            </div>
          </div>

          {/* Colors */}
          <div className="mb-6">
            <h4 className="text-md font-semibold mb-2">Color</h4>
            <div className="flex gap-2 flex-wrap">
              {["bg-red-500", "bg-blue-500", "bg-green-500", "bg-black"].map(
                (color, index) => (
                  <div
                    key={index}
                    className={`${color} w-6 h-6 rounded-full border border-gray-300 cursor-pointer`}
                  />
                )
              )}
            </div>
          </div>
        </aside>

        {/* Product Listing */}
        <main className="w-full lg:w-3/4">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Life Style Shoes</h2>
            <select className="border border-gray-300 rounded px-3 py-2 text-sm">
              <option>Trending</option>
              <option>Price Low to High</option>
              <option>Price High to Low</option>
            </select>
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 gap-6 ">
            {products.map((item, idx) => (
              <Cards
                key={idx}
                image={item.image}
                title={item.title}
                price={item.price}
                isNew={item.isNew}
              />
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center mt-10 gap-2">
            {[1, 2, 3, 4].map((page) => (
              <button
                key={page}
                className="px-3 py-2 border border-gray-300 rounded hover:bg-black hover:text-white transition"
              >
                {page}
              </button>
            ))}
            <button className="px-3 py-2 border border-gray-300 rounded hover:bg-black hover:text-white transition">
              &gt;
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
