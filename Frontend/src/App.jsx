import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Homepage from "./pages/Homepage";
import Product_Details from "./pages/Product_Details";
import Cart from "./pages/Cart";
import ListingPage from "./pages/ListingPage";
import UserProfile from "./pages/UserProfile";
import Login from "./Pages/Login";
import Register from "./Pages/Register";

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
            <Route path="/products" element={<Product_Details />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/listing" element={<ListingPage />} />
            <Route path="/user" element={<UserProfile />} />
          </Routes>
        </Layout>
      ) : (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* You can add other non-layout routes like register */}
        </Routes>
      )}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}
