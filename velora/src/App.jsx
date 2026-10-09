import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import Cart from "./pages/Cart";
import Wishlist from "./pages/Wishlist";
import ProductDetails from "./pages/ProductDetails";
import Checkout from "./pages/Checkout";
import { ShopProvider, useShop } from "./context/ShopContext";

function NotificationBanner() {
  const { notification } = useShop();
  if (!notification) return null;
  return <div className="toast-notification">{notification}</div>;
}

export default function App() {
  return (
    <ShopProvider>
      <Navbar />
      <NotificationBanner />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<Wishlist />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/checkout" element={<Checkout />} />
      </Routes>

      <Footer />
    </ShopProvider>
  );
}