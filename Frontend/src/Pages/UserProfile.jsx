import React, { useState } from "react";
import { Modal, Box, Typography, IconButton, Divider } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
// Sidebar menu
const sidebarItems = [
  { key: "orders", label: "My Orders", icon: "📦" },
  { key: "addresses", label: "Your Addresses", icon: "🏠" },
  { key: "security", label: "Login & Security", icon: "🔒" },
  { key: "payments", label: "Payments", icon: "💳" },
  { key: "saved", label: "Saved Items", icon: "❤️" },
  { key: "support", label: "Support", icon: "🛠️" },
  { key: "logout", label: "Log Out", danger: true, icon: "🔓" },
];

// Sample dummy data
const initialAddresses = Array.from({ length: 5 }, (_, i) => ({
  id: i + 1,
  type: `Address ${i + 1}`,
  address: `${101 + i} Sample Street, City, ZIP ${90001 + i}`,
}));

const initialPayments = Array.from({ length: 4 }, (_, i) => ({
  id: i + 1,
  type: "Visa",
  number: `**** **** **** ${4000 + i + 1}`,
  expiry: `${String((i % 12) + 1).padStart(2, "0")}/${String(27 + (i % 3))}`,
}));

const initialSavedItems = Array.from({ length: 7 }, (_, i) => ({
  id: i + 1,
  name: `Product ${i + 1}`,
  price: `$${109 + i * 10}.00`,
}));

const UserAccountPage = () => {
  const [active, setActive] = useState("orders");
  const [addresses, setAddresses] = useState(initialAddresses);
  const [savedItems, setSavedItems] = useState([
    {
      id: 1,
      name: "Wireless Headphones",
      price: "$129.99",
      image: "https://via.placeholder.com/120x120", // or your actual product image
    },
    {
      id: 2,
      name: "Smartwatch Series 5",
      price: "$249.99",
      image: "https://via.placeholder.com/120x120",
    },
  ]);
  const [email, setEmail] = useState("alexjohn@example.com");
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [contact, setContact] = useState({
    name: "",
    subject: "",
    message: "",
  });
  const [showAddForm, setShowAddForm] = useState(false);
  const [newAddress, setNewAddress] = useState({ type: "", address: "" });
  const [showEmailEdit, setShowEmailEdit] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);
  const [showPasswordEdit, setShowPasswordEdit] = useState(false);
  const [tempPassword, setTempPassword] = useState("supersecret");

  const [userDetails, setUserDetails] = useState({
    fullName: "Alex Johnson",
    phone: "+1 555 123 4567",
    dob: "1990-04-21",
  });
  const [editDetails, setEditDetails] = useState(false);
  const [notifyByEmail, setNotifyByEmail] = useState(true);
  const [notifyBySMS, setNotifyBySMS] = useState(false);
  const [twoFAEnabled, setTwoFAEnabled] = useState(false);
  const [payments, setPayments] = useState([
    {
      id: 1,
      type: "Visa",
      number: "**** **** **** 1234",
      expiry: "06/26",
    },
    {
      id: 2,
      type: "MasterCard",
      number: "**** **** **** 9876",
      expiry: "11/25",
    },
  ]);
  const [trackingOrder, setTrackingOrder] = useState(null);

  const [showAddPaymentForm, setShowAddPaymentForm] = useState(false);
  const [newPayment, setNewPayment] = useState({
    type: "Visa",
    number: "",
    expiry: "",
  });
  const [orders] = useState([
    {
      id: "ORD-001234",
      date: "2025-06-15",
      status: "Shipped",
      total: "$159.98",
      items: [
        {
          name: "Wireless Headphones",
          price: "$89.99",
          image: "https://via.placeholder.com/80x80",
          qty: 1,
        },
        {
          name: "USB-C Charging Cable",
          price: "$19.99",
          image: "https://via.placeholder.com/80x80",
          qty: 2,
        },
      ],
    },
    {
      id: "ORD-001235",
      date: "2025-06-10",
      status: "Delivered",
      total: "$59.99",
      items: [
        {
          name: "Smartwatch Band",
          price: "$59.99",
          image: "https://via.placeholder.com/80x80",
          qty: 1,
        },
      ],
    },
    {
      id: "ORD-001236",
      date: "2025-06-02",
      status: "Cancelled",
      total: "$42.50",
      items: [
        {
          name: "Bluetooth Speaker",
          price: "$42.50",
          image: "https://via.placeholder.com/80x80",
          qty: 1,
        },
      ],
    },
  ]);

  const deleteAddress = (id) =>
    setAddresses((arr) => arr.filter((a) => a.id !== id));
  const deletePayment = (id) =>
    setPayments((arr) => arr.filter((p) => p.id !== id));
  const deleteSaved = (id) =>
    setSavedItems((arr) => arr.filter((i) => i.id !== id));

  const renderHeader = (title, subtitle) => (
    <div className="mb-6">
      <h2 className="text-2xl font-semibold mb-1">{title}</h2>
      {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
      <hr className="mt-4" />
    </div>
  );

  return (
    <div className="flex min-h-screen bg-[#E7E7E3] px-10 md:px-40 py-8 font-[Rubik] text-[#232321] animate-fade-in-up">
      {/* Sidebar */}
      <aside className="hidden lg:block min-w-[320px] bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
        <div className="mb-8">
          <h1 className="text-xl font-semibold text-[#232321]">My Account</h1>
          <p className="text-sm text-gray-500 mt-1">Welcome back</p>
        </div>

        <nav className="flex flex-col gap-1">
          {sidebarItems.map((item) => {
            const isActive = active === item.key;
            const isLogout = item.key === "logout";

            return (
              <button
                key={item.key}
                onClick={() => {
                  if (isLogout) return alert("Logged out!");
                  setActive(item.key);
                }}
                className={`text-left text-sm font-medium px-4 py-2 rounded-md transition-all duration-150
            ${
              isActive
                ? "bg-[#4A69E2] text-white shadow-sm"
                : isLogout
                ? "text-red-500 hover:bg-red-50"
                : "text-[#232321] hover:bg-gray-100"
            }`}
              >
                {item.label}
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 lg:p-12">
        {active === "orders" && (
          <>
            {renderHeader(
              "My Orders",
              "Review past and current order statuses"
            )}

            {orders.length === 0 ? (
              <p className="text-center text-gray-500">
                You have no orders yet.
              </p>
            ) : (
              <div className="space-y-6">
                {orders.map((order) => (
                  <div
                    key={order.id}
                    className="bg-white rounded-xl border border-gray-200 shadow-sm p-6"
                  >
                    <div className="flex justify-between items-center flex-wrap gap-2 mb-4">
                      <div className="text-sm text-gray-600">
                        <p>
                          <span className="font-medium text-gray-800">
                            Order:
                          </span>{" "}
                          {order.id}
                        </p>
                        <p>
                          <span className="font-medium text-gray-800">
                            Date:
                          </span>{" "}
                          {order.date}
                        </p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span
                          className={`text-sm px-3 py-1 rounded-full font-medium ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : order.status === "Shipped"
                              ? "bg-blue-100 text-blue-700"
                              : "bg-red-100 text-red-600"
                          }`}
                        >
                          {order.status}
                        </span>
                        <span className="text-sm font-semibold text-gray-800">
                          Total: {order.total}
                        </span>
                      </div>
                    </div>

                    <div className="divide-y divide-gray-100">
                      {order.items.map((item, index) => (
                        <div
                          key={index}
                          className="flex items-center justify-between py-4"
                        >
                          <div className="flex items-center gap-4">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-md"
                            />
                            <div>
                              <p className="font-medium text-gray-800">
                                {item.name}
                              </p>
                              <p className="text-sm text-gray-500">
                                Quantity: {item.qty}
                              </p>
                            </div>
                          </div>
                          <p className="text-sm font-medium text-gray-700">
                            {item.price}
                          </p>
                        </div>
                      ))}
                    </div>

                    <div className="flex justify-end gap-3 mt-6">
                      <button className="px-4 py-2 text-sm text-gray-600 border border-gray-300 rounded-md hover:bg-gray-100 transition">
                        View Details
                      </button>
                      {order.status !== "Cancelled" && (
                        <button
                          onClick={() => setTrackingOrder(order)}
                          className="px-4 py-2 text-sm bg-[#4A69E2] text-white rounded-md hover:bg-[#3a56c5] transition"
                        >
                          Track Order
                        </button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {active === "addresses" && (
          <>
            {/* Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-[#232321]">
                  Your Addresses
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Add or manage your delivery addresses
                </p>
              </div>
              <button
                onClick={() => setShowAddForm((prev) => !prev)}
                className="px-5 py-2 bg-[#4A69E2] text-white text-sm font-medium rounded-md hover:bg-[#3a56c5] transition"
              >
                {showAddForm ? "Cancel" : "+ Add Address"}
              </button>
            </div>

            {/* Add Address Form */}
            {showAddForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newAddress.type || !newAddress.address) return;
                  setAddresses((prev) => [
                    ...prev,
                    { id: Date.now(), ...newAddress },
                  ]);
                  setNewAddress({ type: "", address: "" });
                  setShowAddForm(false);
                }}
                className="bg-white border border-gray-200 p-6 rounded-xl mb-8 shadow-sm space-y-5"
              >
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Address Label
                    </label>
                    <input
                      type="text"
                      value={newAddress.type}
                      onChange={(e) =>
                        setNewAddress({ ...newAddress, type: e.target.value })
                      }
                      placeholder="e.g. Home, Office"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A69E2]"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Full Address
                    </label>
                    <input
                      type="text"
                      value={newAddress.address}
                      onChange={(e) =>
                        setNewAddress({
                          ...newAddress,
                          address: e.target.value,
                        })
                      }
                      placeholder="Street, City, ZIP"
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-[#4A69E2]"
                      required
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#4A69E2] text-white rounded-md text-sm font-medium hover:bg-[#3a56c5] transition"
                  >
                    Save Address
                  </button>
                </div>
              </form>
            )}

            {/* Address Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addresses.map((a) => (
                <div
                  key={a.id}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition"
                >
                  <div className="mb-4">
                    <p className="font-medium text-[#232321]">{a.type}</p>
                    <p className="text-sm text-gray-600 mt-1">{a.address}</p>
                  </div>
                  <div className="flex justify-end">
                    <button
                      onClick={() => deleteAddress(a.id)}
                      className="text-sm px-4 py-1.5 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}

        {active === "security" && (
          <>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-[#232321]">
                Account Settings
              </h2>
              <p className="text-sm text-gray-500 mt-1">
                Update your personal details and security preferences
              </p>
            </div>

            <div className="space-y-6">
              {/* Personal Info */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 space-y-4">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-[#232321] text-lg">
                    Personal Information
                  </h3>
                  <button
                    onClick={() => setEditDetails(!editDetails)}
                    className="text-sm text-[#4A69E2] font-medium hover:underline"
                  >
                    {editDetails ? "Save" : "Edit"}
                  </button>
                </div>
                {editDetails ? (
                  <div className="grid sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      value={userDetails.fullName}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          fullName: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Full Name"
                    />
                    <input
                      type="tel"
                      value={userDetails.phone}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          phone: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="Phone Number"
                    />
                    <input
                      type="date"
                      value={userDetails.dob}
                      onChange={(e) =>
                        setUserDetails({ ...userDetails, dob: e.target.value })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    />
                    <select
                      value={userDetails.gender}
                      onChange={(e) =>
                        setUserDetails({
                          ...userDetails,
                          gender: e.target.value,
                        })
                      }
                      className="px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                      <option>Prefer not to say</option>
                    </select>
                  </div>
                ) : (
                  <div className="grid sm:grid-cols-2 text-sm text-gray-700 gap-1">
                    <p>
                      <span className="font-medium">Full Name:</span>{" "}
                      {userDetails.fullName}
                    </p>
                    <p>
                      <span className="font-medium">Phone:</span>{" "}
                      {userDetails.phone}
                    </p>
                    <p>
                      <span className="font-medium">Date of Birth:</span>{" "}
                      {userDetails.dob}
                    </p>
                    <p>
                      <span className="font-medium">Gender:</span>{" "}
                      {userDetails.gender}
                    </p>
                  </div>
                )}
              </div>

              {/* Email */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-[#232321] text-lg">Email</h3>
                  <button
                    onClick={() => {
                      if (showEmailEdit) setEmail(tempEmail);
                      setShowEmailEdit(!showEmailEdit);
                    }}
                    className="text-sm text-[#4A69E2] font-medium hover:underline"
                  >
                    {showEmailEdit ? "Save" : "Change"}
                  </button>
                </div>
                {showEmailEdit ? (
                  <input
                    type="email"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    value={tempEmail}
                    onChange={(e) => setTempEmail(e.target.value)}
                  />
                ) : (
                  <p className="text-sm text-gray-700">{email}</p>
                )}
              </div>

              {/* Password */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center mb-2">
                  <h3 className="font-medium text-[#232321] text-lg">
                    Password
                  </h3>
                  <button
                    onClick={() => {
                      if (showPasswordEdit)
                        console.log("Password updated:", tempPassword);
                      setShowPasswordEdit(!showPasswordEdit);
                    }}
                    className="text-sm text-[#4A69E2] font-medium hover:underline"
                  >
                    {showPasswordEdit ? "Save" : "Change"}
                  </button>
                </div>
                {showPasswordEdit ? (
                  <input
                    type={passwordVisible ? "text" : "password"}
                    value={tempPassword}
                    onChange={(e) => setTempPassword(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-gray-700">
                      {passwordVisible ? tempPassword : "••••••••"}
                    </p>
                    <button
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="text-sm text-[#4A69E2] hover:underline"
                    >
                      {passwordVisible ? "Hide" : "Show"}
                    </button>
                  </div>
                )}
              </div>

              {/* Notification Preferences */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <h3 className="font-medium text-[#232321] text-lg mb-4">
                  Contact Preferences
                </h3>
                <div className="space-y-3">
                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={notifyByEmail}
                      onChange={(e) => setNotifyByEmail(e.target.checked)}
                      className="w-4 h-4"
                    />
                    Receive updates via Email
                  </label>
                  <label className="flex items-center gap-3 text-sm text-gray-700">
                    <input
                      type="checkbox"
                      checked={notifyBySMS}
                      onChange={(e) => setNotifyBySMS(e.target.checked)}
                      className="w-4 h-4"
                    />
                    Receive SMS notifications
                  </label>
                </div>
              </div>

              {/* 2FA Status */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100">
                <div className="flex justify-between items-center">
                  <h3 className="font-medium text-[#232321] text-lg">
                    Two-Factor Authentication
                  </h3>
                  <button
                    onClick={() => setTwoFAEnabled(!twoFAEnabled)}
                    className={`text-sm font-medium transition ${
                      twoFAEnabled
                        ? "text-red-500 hover:underline"
                        : "text-[#4A69E2] hover:underline"
                    }`}
                  >
                    {twoFAEnabled ? "Disable" : "Enable"}
                  </button>
                </div>
                <p className="text-sm text-gray-600 mt-1">
                  {twoFAEnabled
                    ? "Two-factor authentication is enabled for extra security."
                    : "2FA is currently disabled. Enable for added protection."}
                </p>
              </div>
            </div>
          </>
        )}

        {active === "payments" && (
          <>
            <div className="mb-6 flex justify-between items-center">
              <div>
                <h2 className="text-2xl font-semibold text-[#232321]">
                  Payment Methods
                </h2>
                <p className="text-sm text-gray-500 mt-1">
                  Manage your saved credit or debit cards
                </p>
              </div>
              <button
                onClick={() => setShowAddPaymentForm(!showAddPaymentForm)}
                className="px-5 py-2 bg-[#4A69E2] text-white text-sm rounded-md hover:bg-[#3a56c5] transition"
              >
                {showAddPaymentForm ? "Cancel" : "+ Add Payment Method"}
              </button>
            </div>

            {/* Add Card Form */}
            {showAddPaymentForm && (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  if (!newPayment.number || !newPayment.expiry) return;
                  const last4 = newPayment.number.slice(-4);
                  setPayments((prev) => [
                    ...prev,
                    {
                      id: Date.now(),
                      type: newPayment.type,
                      number: `**** **** **** ${last4}`,
                      expiry: newPayment.expiry,
                    },
                  ]);
                  setNewPayment({ type: "Visa", number: "", expiry: "" });
                  setShowAddPaymentForm(false);
                }}
                className="bg-white border border-gray-200 p-6 rounded-xl mb-8 shadow-sm space-y-4"
              >
                <div className="grid sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Type
                    </label>
                    <select
                      value={newPayment.type}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, type: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                    >
                      <option>Visa</option>
                      <option>MasterCard</option>
                      <option>American Express</option>
                      <option>Discover</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Card Number
                    </label>
                    <input
                      type="text"
                      value={newPayment.number}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, number: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="1234 5678 9012 3456"
                      maxLength={19}
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">
                      Expiry (MM/YY)
                    </label>
                    <input
                      type="text"
                      value={newPayment.expiry}
                      onChange={(e) =>
                        setNewPayment({ ...newPayment, expiry: e.target.value })
                      }
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      placeholder="06/26"
                      required
                    />
                  </div>
                </div>
                <div className="text-right">
                  <button
                    type="submit"
                    className="px-6 py-2 bg-[#4A69E2] text-white rounded-md text-sm hover:bg-[#3a56c5] transition"
                  >
                    Save Payment Method
                  </button>
                </div>
              </form>
            )}

            {/* List of Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {payments.map((p) => (
                <div
                  key={p.id}
                  className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm hover:shadow-md transition flex justify-between items-center"
                >
                  <div>
                    <p className="font-medium text-[#232321]">{p.type}</p>
                    <p className="text-sm text-gray-600">
                      {p.number} <span className="ml-1">(exp. {p.expiry})</span>
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      const confirm = window.confirm(
                        "Remove this payment method?"
                      );
                      if (confirm) deletePayment(p.id);
                    }}
                    className="text-sm px-4 py-1.5 text-red-600 bg-red-50 rounded-md hover:bg-red-100 transition"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}

        {active === "saved" && (
          <>
            {renderHeader(
              "Saved Items",
              "Your wishlist items are saved here for later purchase."
            )}

            {savedItems.length === 0 ? (
              <div className="text-center text-gray-500 mt-12">
                <p className="text-lg">You haven’t saved anything yet.</p>
                <p className="text-sm">
                  Start exploring and add items to your wishlist.
                </p>
              </div>
            ) : (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {savedItems.map((item) => (
                  <div
                    key={item.id}
                    className="bg-white rounded-xl shadow-sm hover:shadow-md transition overflow-hidden"
                  >
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-full h-48 object-cover"
                    />
                    <div className="p-4">
                      <h3 className="text-md font-semibold text-[#232321] mb-1 line-clamp-1">
                        {item.name}
                      </h3>
                      <p className="text-sm text-gray-600 mb-4">{item.price}</p>
                      <button
                        onClick={() => deleteSaved(item.id)}
                        className="px-4 py-2 w-full text-sm bg-red-50 text-red-600 rounded-md hover:bg-red-100 transition"
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {active === "support" && (
          <>
            {renderHeader(
              "Customer Support",
              "Need help? Reach out to our team below."
            )}

            <div className="bg-white rounded-xl shadow-sm p-6 max-w-3xl space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Your Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Alex Johnson"
                  value={contact.name}
                  onChange={(e) =>
                    setContact({ ...contact, name: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4A69E2] focus:border-[#4A69E2] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="e.g. Order #1234 not received"
                  value={contact.subject}
                  onChange={(e) =>
                    setContact({ ...contact, subject: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4A69E2] focus:border-[#4A69E2] text-sm"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Please describe your issue or question in detail..."
                  value={contact.message}
                  onChange={(e) =>
                    setContact({ ...contact, message: e.target.value })
                  }
                  className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-[#4A69E2] focus:border-[#4A69E2] text-sm"
                />
              </div>

              <div className="pt-2 text-right">
                <button
                  onClick={() => {
                    if (!contact.name || !contact.subject || !contact.message) {
                      alert("Please fill in all fields before submitting.");
                      return;
                    }
                    alert("Support request submitted successfully!");
                    setContact({ name: "", subject: "", message: "" });
                  }}
                  className="inline-block px-6 py-2 bg-[#4A69E2] text-white rounded-md hover:bg-[#3a56c5] transition"
                >
                  Send Request
                </button>
              </div>
            </div>
          </>
        )}

        {active === "logout" && (
          <div className="text-center py-20">
            <p className="text-lg">You have been logged out.</p>
            <button
              onClick={() => setActive("orders")}
              className="mt-4 px-6 py-2 bg-[#4A69E2] text-white rounded-md"
            >
              Re-login
            </button>
          </div>
        )}
      </main>
      <Modal
        open={Boolean(trackingOrder)}
        onClose={() => setTrackingOrder(null)}
        aria-labelledby="tracking-order-modal"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 2,
          backdropFilter: "blur(4px)",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 740,
            bgcolor: "background.paper",
            borderRadius: 4,
            boxShadow: 24,
            p: { xs: 3, sm: 5 },
            position: "relative",
            maxHeight: "90vh",
            overflowY: "auto",
          }}
        >
          {/* Close Button */}
          <IconButton
            onClick={() => setTrackingOrder(null)}
            sx={{
              position: "absolute",
              top: 16,
              right: 16,
              color: "grey.600",
              bgcolor: "grey.100",
              "&:hover": { bgcolor: "grey.200" },
            }}
          >
            <CloseIcon />
          </IconButton>

          {/* Modal Header */}
          <Typography variant="h5" fontWeight="bold" mb={1}>
            Order <span style={{ color: "#4A69E2" }}>#{trackingOrder?.id}</span>
          </Typography>
          <Typography variant="subtitle2" color="text.secondary" mb={4}>
            Estimated Delivery: <strong>June 28, 2025</strong>
          </Typography>

          {/* Progress Tracker */}
          <Box display="flex" justifyContent="space-between" mb={5}>
            {["Order Placed", "Processing", "Shipped", "Delivered"].map(
              (step, i) => {
                const statusOrder = [
                  "Placed",
                  "Processing",
                  "Shipped",
                  "Delivered",
                ];
                const current = statusOrder.indexOf(trackingOrder?.status);
                const isCompleted = i <= current;

                return (
                  <Box
                    key={step}
                    flex="1"
                    textAlign="center"
                    position="relative"
                  >
                    <Box
                      sx={{
                        width: 18,
                        height: 18,
                        borderRadius: "50%",
                        backgroundColor: isCompleted ? "#4A69E2" : "#cfd8dc",
                        mx: "auto",
                        mb: 1,
                      }}
                    />
                    <Typography
                      variant="caption"
                      fontWeight={isCompleted ? 600 : 400}
                      color={isCompleted ? "#4A69E2" : "text.disabled"}
                    >
                      {step}
                    </Typography>
                    {i < statusOrder.length - 1 && (
                      <Box
                        sx={{
                          position: "absolute",
                          top: "9px",
                          left: "50%",
                          transform: "translateX(0%)",
                          width: "100%",
                          height: "2px",
                          zIndex: -1,
                          backgroundColor: i < current ? "#4A69E2" : "#e0e0e0",
                        }}
                      />
                    )}
                  </Box>
                );
              }
            )}
          </Box>

          {/* Items List */}
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            Items in this Order
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {trackingOrder?.items.map((item, idx) => (
              <Box key={idx} display="flex" alignItems="center" gap={2}>
                <Box
                  component="img"
                  src={item.image}
                  alt={item.name}
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: 2,
                    objectFit: "cover",
                    border: "1px solid #e0e0e0",
                  }}
                />
                <Box flexGrow={1}>
                  <Typography fontWeight={600}>{item.name}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    Qty: {item.qty}
                  </Typography>
                </Box>
                <Typography fontWeight={600} color="text.primary">
                  {item.price}
                </Typography>
              </Box>
            ))}
          </Box>

          {/* Divider */}
          <Divider sx={{ my: 4 }} />

          {/* Summary Section */}
          <Typography variant="subtitle1" fontWeight="bold" mb={2}>
            Order Summary
          </Typography>
          <Box
            sx={{
              backgroundColor: "#f6f8fa",
              p: 3,
              borderRadius: 2,
              display: "grid",
              gap: 1.5,
            }}
          >
            <Typography variant="body2" color="text.primary">
              <strong>Shipping Address:</strong> 123 Main Street, New York, NY
              10001
            </Typography>
            <Typography variant="body2" color="text.primary">
              <strong>Payment Method:</strong> Credit Card
            </Typography>
            <Typography variant="body2" color="text.primary">
              <strong>Total:</strong> {trackingOrder?.total}
            </Typography>
          </Box>
        </Box>
      </Modal>
    </div>
  );
};

export default UserAccountPage;
