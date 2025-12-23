const express = require("express");
const mongoose = require("mongoose");
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Server Running");
});

async function connectDb() {
  mongoose.connect("mongodb://cluster0.lli8l52.mongodb.net", {
    dbName: "mean_ecommerce",
  });
  console.log("MongoDb Connected");
}

connectDb().catch((err) => {
  console.log(err);
});

app.listen(port, () => {
  console.log("Server Running on Port: ", port);
});
