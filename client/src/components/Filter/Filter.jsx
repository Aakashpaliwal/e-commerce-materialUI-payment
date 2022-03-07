import {
  Box,
  Checkbox,
  Divider,
  FormControlLabel,
  Radio,
  RadioGroup,
  Typography,
} from "@material-ui/core";
import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./filter.scss";

const Filter = (props) => {
  const [category, setCategory] = useState(null);

  const getCategories = async () => {
    const result = await axios.get(
      "https://fakestoreapi.com/products/categories"
    );
    console.log("result", result);
    setCategory(result.data);
  };

  const handleChange = (event) => {
    props.filterNameHandler(event.target.value);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <Fragment>
      {" "}
      <Typography variant="h5" component="h3" style={{ textAlign: "left" }}>
        category
      </Typography>{" "}
      <Divider style={{ marginTop: 10, marginBottom: 10 }} />
      <RadioGroup
        aria-label="category"
        name="category"
        value={props.filterName}
        onChange={handleChange}
      >
        <FormControlLabel
          value="all"
          control={<Radio color="primary" />}
          label="All Cateogries"
        />
        {category &&
          category.length > 0 &&
          category.map((item) => {
            return (
              <FormControlLabel
                key={item}
                value={item}
                control={<Radio color="primary" />}
                label={item}
                style={{ width: "100%" }}
              />
            );
          })}
      </RadioGroup>
    </Fragment>
  );
};

export default Filter;
