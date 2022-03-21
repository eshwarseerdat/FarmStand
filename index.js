const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose
  .connect("mongodb://localhost:27017/farmStand")
  .then(() => {
    console.log(`mongo connnection working`);
  })
  .catch((e) => {
    console.log(`Error: ${e}`);
  });

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.get("/", (req, res) => {
  res.send("Hello");
});

app.listen("8080", () => {
  console.log(`listening on port 8080`);
});
