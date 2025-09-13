import React, { useState } from "react";
import { FaFacebookF, FaGoogle, FaApple } from "react-icons/fa";
import { HiMail, HiLockClosed, HiUser, HiEye, HiEyeOff } from "react-icons/hi";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const result = await register(formData);
      
      if (result.success) {
        navigate('/login');
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-screen h-screen flex items-center justify-center bg-[#FAFAFA]">
      <div className="flex w-full h-full md:h-[90vh] md:max-w-6xl shadow-lg rounded-lg overflow-hidden">
        
        {/* Left: Register Form */}
        <div className="w-full md:w-1/2 bg-white p-10 flex flex-col justify-center">
          <div className="mb-8">
            <h1 className="text-2xl font-extrabold text-black">KICKS</h1>
          </div>

          <h2 className="text-sm text-gray-500 mb-1">Join the movement</h2>
          <h3 className="text-2xl font-bold mb-8">Create your account</h3>

          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Name */}
            <div className="relative">
              <HiUser className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Email */}
            <div className="relative">
              <HiMail className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="example@mail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
            </div>

            {/* Password */}
            <div className="relative">
              <HiLockClosed className="absolute top-3.5 left-3 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded px-10 py-2 focus:outline-none focus:ring-2 focus:ring-black"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-500"
              >
                {showPassword ? <HiEyeOff /> : <HiEye />}
              </button>
            </div>

            {/* Error */}
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:opacity-90 transition font-semibold uppercase tracking-wide disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Signing Up...' : 'Sign Up'}
            </button>
          </form>

          <div className="text-center text-sm text-gray-500 my-6">or sign up with</div>

          <div className="flex justify-center gap-4">
            <button className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition">
              <FaFacebookF />
            </button>
            <button className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition">
              <FaGoogle />
            </button>
            <button className="border border-gray-300 rounded px-4 py-2 hover:bg-gray-100 transition">
              <FaApple />
            </button>
          </div>

          <div className="mt-8 text-sm text-gray-600 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-black font-semibold hover:underline">
              Log in
            </a>
          </div>
        </div>

        {/* Right: Sneaker Image */}
        <div className="hidden md:block md:w-1/2">
          <img
            src="/kicks-login-banner.png"
            alt="Register Banner"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
}
