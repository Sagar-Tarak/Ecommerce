import React from "react";
import { FaFacebook, FaInstagram, FaTiktok, FaTwitter } from "react-icons/fa";

function Footer() {
  return (
    <div>
      <footer className="bg-[#4866FF] text-white rounded-t-4xl overflow-hidden">
        {/* Top Section */}
        <div className="max-w-7xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between">
          {/* Text & Form */}
          <div className="mb-6 md:mb-0 max-w-xl animate-fade-in-up">
            <h2 className="text-xl md:text-5xl font-bold uppercase tracking-wider">
              Join our KicksPlus Club & Get 15% Off
            </h2>
            <p className="mt-2 text-lg tracking-wider">
              Sign up for free! Join the community.
            </p>
            <form className="mt-6 w-full max-w-md flex items-center gap-2">
              <input
                type="email"
                placeholder="Email address"
                className="flex-1 px-5 py-3 bg-transparent text-white placeholder-gray-300 border border-white rounded-lg focus:outline-none focus:ring-2 focus:ring-white transition-all duration-300"
              />
              <button
                type="submit"
                className="bg-black text-white font-semibold px-6 py-3 rounded-lg hover:bg-gray-900 hover:shadow-[0_0_15px_2px_rgba(255,255,255,0.3)] transition-all duration-300"
              >
                SUBMIT
              </button>
            </form>
          </div>

          {/* Logo */}
          <div className="flex items-start gap-1 animate-fade-in-up">
            <img
              src="/Logo_white.svg"
              alt="KICKS Logo"
              className="h-25 object-contain"
            />
            <span className="text-yellow-400 text-2xl align-super font-extrabold">
              +
            </span>
          </div>
        </div>

        {/* Bottom Black Section */}
        <div className="bg-textBlack text-whitePrimary py-10 rounded-t-3xl">
          <div className="w-full grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-20 px-20 py-10">
            {/* About Us */}
            <div className="animate-fade-in-up">
              <h3 className="text-orange-400 text-2xl font-bold mb-3">
                About us
              </h3>
              <p className="text-xl leading-relaxed text-whitePrimary">
                We are the biggest hyperstore in the universe. We got you all
                covered with our exclusive collections and latest drops.
              </p>
            </div>

            {/* Categories */}
            <div className="animate-fade-in-up delay-100">
              <h3 className="text-orange-400 text-2xl font-bold mb-3">
                Categories
              </h3>
              <ul className="space-y-2 text-xl text-whitePrimary">
                <li>Runners</li>
                <li>Sneakers</li>
                <li>Basketball</li>
                <li>Outdoor</li>
                <li>Golf</li>
                <li>Hiking</li>
              </ul>
            </div>

            {/* Company */}
            <div className="animate-fade-in-up delay-200">
              <h3 className="text-orange-400 text-2xl font-bold mb-3">
                Company
              </h3>
              <ul className="space-y-2 text-xl text-whitePrimary">
                <li>About</li>
                <li>Contact</li>
                <li>Blogs</li>
              </ul>
            </div>

            {/* Follow Us */}
            <div className="animate-fade-in-up delay-300">
              <h3 className="text-orange-400 text-2xl font-bold mb-3">
                Follow us
              </h3>
              <div className="flex space-x-4 text-2xl text-white">
                <a
                  href="#"
                  aria-label="Facebook"
                  className="transition-transform transform hover:scale-110 hover:text-yellow-300 duration-300"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  aria-label="Instagram"
                  className="transition-transform transform hover:scale-110 hover:text-yellow-300 duration-300"
                >
                  <FaInstagram />
                </a>
                <a
                  href="#"
                  aria-label="Twitter"
                  className="transition-transform transform hover:scale-110 hover:text-yellow-300 duration-300"
                >
                  <FaTwitter />
                </a>
                <a
                  href="#"
                  aria-label="TikTok"
                  className="transition-transform transform hover:scale-110 hover:text-yellow-300 duration-300"
                >
                  <FaTiktok />
                </a>
              </div>
            </div>
          </div>

          {/* Giant KICKS text/logo */}
          <div className="relative flex justify-center items-end h-60 w-full mt-10 animate-fade-in-up">
            <img
              src="/Logo_white.svg"
              alt="KICKS Background Logo"
              className="absolute bottom-0 left-1/2 -translate-x-1/2 scale-[5] pointer-events-none select-none opacity-15"
            />
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
