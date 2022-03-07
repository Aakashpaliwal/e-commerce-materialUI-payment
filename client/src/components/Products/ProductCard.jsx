import { Box, Container, Grid, Typography } from "@material-ui/core";
import React, { Fragment, useContext, useEffect, useState } from "react";
import ViewProduct from "./ViewProduct";
import axios from "axios";
import { MainContext } from "../MainContext";
import { useLocation } from "react-router-dom";
import Filter from "../Filter/Filter";

const ProductCard = () => {
  const { setCartCount, setCarts } = useContext(MainContext);
  console.log(useContext(MainContext));
  const [products, setProducts] = React.useState(null);
  const [cartProducts, setCartProducts] = React.useState([]);
  const [filterName, setFilterName] = useState("");

  const addToCartHandler = (item) => {
    console.log("item", item);
    let cart = [...cartProducts];
    let product = cart.find((product) => product.productId === item.productId);
    if (product) {
      product.quantity += 1;
    } else {
      cart.push(item);
    }
    setCartProducts(cart);
    setCarts(cart);
  };

  const filterNameHandler = (name) => {
    setFilterName(name);
  };

  useEffect(async () => {
    if (cartProducts.length > 0) {
      console.log("cartProducts", cartProducts);
      let value = {
        userId: sessionStorage.getItem("userId"),
        date: new Date().toISOString().split("T")[0],
        products: cartProducts,
      };
      await axios
        .post("https://fakestoreapi.com/carts", {
          body: JSON.stringify(value),
        })
        .then((res) => {
          console.log("res", res);
          setCartCount(cartProducts.length);
          sessionStorage.setItem("cartCount", cartProducts.length);
          sessionStorage.setItem("carts", JSON.stringify(cartProducts));
        })
        .catch((err) => console.log("err", err));
    }
  }, [cartProducts]);

  const getProducts = async () => {
    const result = await axios.get("https://fakestoreapi.com/products");
    console.log("result", result);
    setProducts(result.data);
  };

  const getFilterProducts = async (filterName) => {
    if (filterName === "all") {
      getProducts();
    } else {
      const result = await axios.get(
        `https://fakestoreapi.com/products/category/${filterName}`
      );
      console.log("result", result);
      setProducts(result.data);
    }
  };

  useEffect(() => {
    sessionStorage.removeItem("carts");
    sessionStorage.removeItem("cartCount");
    getProducts();
  }, []);

  useEffect(() => {
    getFilterProducts(filterName);
  }, [filterName]);

  return (
    <div>
      <Container>
        <Grid container>
          <Grid item xs={12} md={3} lg={3}>
            <Box mt={3}>
              <Filter
                filterNameHandler={filterNameHandler}
                filterName={filterName}
              />
            </Box>
          </Grid>
          <Grid item xs={12} md={9} lg={9}>
            <div className="product_container">
              {products &&
                products.map((product) => (
                  <ViewProduct
                    image={product.image}
                    title={product.title}
                    id={product.id}
                    key={product.id}
                    description={product.description}
                    price={product.price}
                    category={product.category}
                    addToCartHandler={addToCartHandler}
                  />
                ))}
            </div>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default ProductCard;
