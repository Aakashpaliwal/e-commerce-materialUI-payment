import {
  Box,
  Button,
  ButtonGroup,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Icon,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useContext, useEffect, useState } from "react";
import axios from "axios";
import { MainContext } from "../MainContext";
import CloseIcon from "@material-ui/icons/Close";
import SendIcon from "@material-ui/icons/Send";
import StripeCheckout from "react-stripe-checkout";
import "./cart.scss";

const ViewCart = () => {
  const { carts } = useContext(MainContext);
  const [cartsData, setCartsData] = React.useState(carts);
  const [total, setTotal] = useState(0);
  console.log("carts", carts);

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  const getCarts = async () => {
    const result = await axios.get(
      `https://fakestoreapi.com/carts/user/${sessionStorage.getItem("userId")}`
    );
    console.log("result", result);
  };

  const quantityIncreaseHandler = (item) => {
    let cart = [...cartsData];
    let product = cart.find((product) => product.productId === item.productId);
    if (product) {
      product.quantity += 1;
    }
    setCartsData(cart);
  };

  const quantityDecreaseHandler = (item) => {
    let cart = [...cartsData];
    let product = cart.find((product) => product.productId === item.productId);
    if (product) {
      product.quantity -= 1;
    }
    setCartsData(cart);
  };

  const removeHandler = (item) => {
    let cart = [...cartsData];
    let product = cart.find((product) => product.productId === item.productId);
    if (product) {
      cart.splice(cart.indexOf(product), 1);
    }
    setCartsData(cart);
  };

  const onToken = (token) => {
    console.log("token==", token);
    alert("payment successfull");
  };

  useEffect(() => {
    getCarts();
  }, []);

  useEffect(() => {
    let total = cartsData.reduce((acc, item) => {
      return acc + item.quantity * item.price;
    }, 0);
    console.log("total", total);
    setTotal(total);
  }, [cartsData]);

  return (
    <Fragment>
      <Container>
        <Box m={2}>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">Image</TableCell>
                  <TableCell align="center">Product Name</TableCell>
                  <TableCell align="center">Unit Price</TableCell>
                  <TableCell align="center">QTY</TableCell>
                  <TableCell align="center">Subtotal</TableCell>
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {cartsData &&
                  cartsData.length > 0 &&
                  cartsData.map((row) => (
                    <TableRow key={row.name}>
                      <TableCell component="th" scope="row" align="center">
                        <img
                          src={row.image}
                          alt="product"
                          width="100"
                          height="100"
                        />
                      </TableCell>
                      <TableCell align="center">{row.title}</TableCell>
                      <TableCell align="center">{row.price}</TableCell>
                      <TableCell align="center">
                        {" "}
                        <ButtonGroup
                          color="primary"
                          aria-label="outlined primary button group"
                        >
                          <Button onClick={() => quantityIncreaseHandler(row)}>
                            +
                          </Button>
                          <Button>{row.quantity}</Button>
                          <Button
                            onClick={() => quantityDecreaseHandler(row)}
                            disabled={row.quantity === 1 ? true : false}
                          >
                            -
                          </Button>
                        </ButtonGroup>
                      </TableCell>
                      <TableCell align="center">
                        {row.quantity * row.price}
                      </TableCell>
                      <TableCell align="center">
                        <CloseIcon
                          onClick={() => removeHandler(row)}
                          style={{ cursor: "pointer" }}
                        />
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Divider />
        </Box>

        <Grid container spacing={3} justify="flex-end">
          <Grid item xs={12} sm={6} lg={6} md={6}>
            <Box m={2}>
              <Card>
                <CardContent>
                  <Typography
                    gutterBottom
                    variant="h6"
                    component="h6"
                    style={{ float: "left" }}
                  >
                    Total Products
                  </Typography>{" "}
                  <Typography
                    variant="h6"
                    style={{
                      float: "right",
                      marginLeft: 10,
                      top: 1,
                      position: "relative",
                    }}
                  >
                    {total.toFixed(2)}
                  </Typography>
                </CardContent>
                <Box mt={3}>
                  <CardContent>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="h6"
                      style={{ float: "left" }}
                    >
                      Grand Total
                    </Typography>{" "}
                    <Typography
                      variant="h6"
                      style={{
                        float: "right",
                        marginLeft: 10,
                        top: 1,
                        position: "relative",
                      }}
                    >
                      {total.toFixed(2)}
                    </Typography>
                  </CardContent>

                  <CardContent>
                    <Box mt={3}>
                      <Divider />
                    </Box>
                    <Box mt={3}>
                      <StripeCheckout
                        token={onToken}
                        stripeKey="pk_test_51KKj1USBYQWkn281Fj6uM70enwD19LAiWKNRm6qkXm93PbWn4QGyJWjJATsRHo5XSDJUX9ge0NEpFahuQdwYuOfj00x510qi1D"
                        amount={total * 100}
                        bitcoin
                        name="E-Commerce"
                        description="Buy Products"
                        shippingAddress
                        billingAddress
                        zipCode
                        currency="INR"
                      />
                      {/* <Button
                        variant="contained"
                        color="primary"
                        className={"proceed-to-checkout"}
                        endIcon={<SendIcon />}
                      >
                        Proceed to Checkout
                      </Button> */}
                    </Box>
                  </CardContent>
                </Box>
              </Card>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default ViewCart;
