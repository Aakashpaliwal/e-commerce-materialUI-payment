const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
require("dotenv").config();
// const postCharge = require("./stripe");

const app = express();
const router = express.Router();
const port = process.env.PORT || 5000;

// router.post("/stripe/charge", postCharge);

router.all("*", (_, res) => {
  res.json({ message: "pleaes make a post request to /stripe/charge" });
});

app.use((_, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

app.use(bodyParser.json());
app.use("/api", router);
app.use(express.static(path.join(__dirname, "../build")));
app.get("*", (_, res) => {
  res.sendfile(path.join(__dirname, "../build/index.html"));
});

app.listen(port, () => console.log(`Listening on port ${port}`));
