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

const seedProducts = [
  {
    name: "fairy eggplant",
    price: 1.0,
    category: "vegetable",
  },
  {
    name: "organic goddess melon",
    price: 4.99,
    category: "fruit",
  },
  {
    name: "Organic Mini Seedless Watermelon",
    price: 3.99,
    category: "fruit",
  },
  {
    name: "organic celery",
    price: 1.5,
    category: "vegetable",
  },
  {
    name: "chocolate whole milk",
    price: 3.69,
    category: "dairy",
  },
];

// Product.insertMany(seedProducts)
//   .then((res) => console.log(res))
//   .catch((e) => console.log(e));
