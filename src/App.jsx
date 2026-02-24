import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import ProductDetail from "./pages/ProductDetail";
import Checkout from "./pages/Checkout";
import Thanks from "./pages/Thanks";
import React from "react";
import { useSelector } from "react-redux";

const App = () => {
  const { theme } = useSelector((state) => state);

  return (
    <div>
      <div className={theme ? "bg-slate-800" : "bg-slate-300"}>
        <Navbar />
      </div>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/product/:id" Component={ProductDetail} />
        <Route path="/cart" Component={Cart} />
        <Route path="/checkout" Component={Checkout} />
        <Route path="/feedback" Component={Thanks} />
      </Routes>
    </div>
  );
};

export default App;
