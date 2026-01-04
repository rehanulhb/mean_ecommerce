const Product = require("../../backend/db/product");

async function addProduct(model) {
  let product = new Product({
    ...model,
  });
  await product.save();
  return product.toObject();
}

async function updateProduct(id, model) {
  await Product.findByIdAndUpdate(id, model);
}

async function deleteProduct(id) {
  await Product.findByIdAndDelete(id);
}

async function getAllProducts() {
  let products = Product.find();
  return (await products).map((x) => x.toObject());
}

async function getProduct(id) {
  let product = await Product.findById(id);
  return product.toObject();
}

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  getAllProducts,
  getProduct,
};
