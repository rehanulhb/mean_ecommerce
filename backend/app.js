const express = require("express");
require("dotenv").config();
const mongoose = require("mongoose");
const app = express();
const port = 3000;
const categoryRoutes = require("./routes/category");

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Server Running");
});

app.use("/category", categoryRoutes);

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
