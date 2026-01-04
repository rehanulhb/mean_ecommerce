const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const cors = require("cors");
const categoryRoutes = require("./routes/category");
const brandRoutes = require("./routes/brand");
const productRoutes = require("./routes/product");

app.use(cors());

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/category", categoryRoutes);
app.use("/brand", brandRoutes);
app.use("/product", productRoutes);

async function connectDb() {
  await mongoose.connect(process.env.DATABASE_URL);
  console.log("MongoDb Connected");
}

connectDb().catch((err) => {
  console.log(err);
});

app.listen(port, () => {
  console.log("Server Running on Port: ", port);
});
