import { createContext, useState } from "react";

export const MainContext = createContext();

export const MainProvider = ({ children }) => {
  const [name, setName] = useState("USER");
  const [cartCount, setCartCount] = useState(0);
  const [carts, setCarts] = useState([]);
  const [products, setProducts] = useState([]);
  const [userId, setUserId] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <MainContext.Provider
      value={{
        name,
        setName,
        cartCount,
        setCartCount,
        carts,
        setCarts,
        products,
        setProducts,
        userId,
        setUserId,
        isLoggedIn,
        setIsLoggedIn,
      }}
    >
      {children}
    </MainContext.Provider>
  );
};
