import React from "react";
import "./App.css";
import Header from "./components/Products/Header/Header";
import ProductCard from "./components/Products/ProductCard";
import axios from "axios";
import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ViewCart from "./components/Cart/ViewCart";

function App() {
  const [userData, setUserData] = React.useState(null);

  const getUserDetail = async () => {
    const result = await axios.get("https://fakestoreapi.com/users");
    console.log("result", result);
    setUserData(result.data[0]);
    sessionStorage.setItem("userId", result.data[0].id);
  };

  useEffect(() => {
    getUserDetail();
  }, []);

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<ProductCard />} />
        <Route path="/cart" element={<ViewCart />} />
      </Routes>
    </div>
  );
}

export default App;
