import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./Pages/Homepage";
import Product_Details from "./Pages/Product_Details";
import Cart from "./Pages/Cart";
import ListingPage from "./Pages/ListingPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/products/:id" element={<Product_Details />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/listing" element={<ListingPage />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
