import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./Pages/Homepage";
import Product_Details from "./Pages/Product_Details";
import Cart from "./Pages/Cart";
import ListingPage from "./Pages/ListingPage";
import UserProfile from "./Pages/UserProfile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { AuthProvider } from "./contexts/AuthContext";
import { CartProvider } from "./contexts/CartContext";

function AppRoutes() {
  const location = useLocation();

  // Define routes that should NOT have the Layout
  const noLayoutRoutes = ["/login", "/register"];

  const isLayoutNeeded = !noLayoutRoutes.includes(location.pathname);

  return (
    <>
      {isLayoutNeeded ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/products/:id" element={<Product_Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route path="/user" element={<UserProfile />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <AppRoutes />
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}
