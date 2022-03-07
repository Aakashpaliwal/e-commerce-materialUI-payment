import {
  Card,
  CardActionArea,
  CardActions,
  CardMedia,
  CardContent,
  Typography,
  Button,
  IconButton,
} from "@material-ui/core";
import React, { Component } from "react";
import "./product.scss";
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";

export class ViewProduct extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cartProducts: [],
    };
  }

  // let yourDate = new Date().toISOString().split("T")[0]
  // console.log("yourDate", yourDate);
  // let value = {
  //   userId : sessionStorage.getItem('userId'),
  //   date : yourDate,
  //   products
  // }

  render() {
    const { title, image, description, price, id, category, addToCartHandler } =
      this.props;
    return (
      <div className="product_card">
        <div className="product_image">
          <img src={image} alt="product" />
        </div>
        <div className="product_details">
          <div className="category">
            <span>{category}</span>
          </div>
          <div className="product_title">
            <h3>{title}</h3>
          </div>
        </div>
        <div className="card_footer">
          <span style={{ float: "left" }}>{price}</span>
          <IconButton
            color="primary"
            aria-label="add to shopping cart"
            style={{ float: "right", position: "relative", bottom: 15 }}
            onClick={() => {
              addToCartHandler({
                productId: id,
                quantity: 1,
                title: title,
                price: price,
                image: image,
              });
            }}
          >
            <AddShoppingCartIcon />
          </IconButton>
          {/* <button style={{ float: "right" }}>
            <AddShoppingCartIcon />
          </button> */}
        </div>
        {/* <div className="product_price">
          <h3>$100</h3>
        </div>
        <div className="product_action">
          <button>Add to Cart</button>
        </div> */}
      </div>
    );
  }
}

export default ViewProduct;
