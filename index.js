const express = require("express");
const app = express();
const path = require("path");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

const categories = ["fruit", "vegetable", "dairy"];

app.get("/", (req, res) => {
  res.send("Hello");
});

app.get("/products", async (req, res) => {
  const allProducts = await Product.find({});
  res.render("product/index", { allProducts });
});

app.get("/products/new", (req, res) => {
  res.render("product/new", { categories });
});

app.post("/products", async (req, res) => {
  const { name, price, category } = req.body;
  const newProduct = new Product({ name, price, category });
  await newProduct.save();
  res.redirect(`/products/${newProduct._id}`);
});

app.get("/products/:id", async (req, res) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);
  res.render("product/show", { foundProduct });
});

app.get("/products/:id/edit", async (req, res) => {
  const { id } = req.params;
  const foundProduct = await Product.findById(id);
  res.render("product/edit", { foundProduct, categories });
});

app.put("/products/:id", async (req, res) => {
  const { id } = req.params;
  const { name, price, category } = req.body;
  const product = await Product.findByIdAndUpdate(
    id,
    {
      name,
      price,
      category,
    },
    { runValidators: true, new: true }
  );
  res.redirect(`/products/${id}`);
});

app.delete("/products/:id", async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndDelete(id);
  res.redirect("/products");
});

app.listen("8080", () => {
  console.log(`listening on port 8080`);
});
