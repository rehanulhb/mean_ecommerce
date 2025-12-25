const express = require("express");
const router = express.Router();
const Category = require("./../db/category");

router.post("", async (req, res) => {
  console.log("Here");
  let model = req.body;
  let category = new Category({
    name: model.name,
  });
  category.save();
  res.send(category.toObject());
});

router.put("/:id", async (req, res) => {
  console.log("Update");
  let model = req.body;
  let id = req.params["id"];

  await Category.findOneAndUpdate({ _id: id }, model);
  res.send({ message: "Updated" });
});

module.exports = router;
