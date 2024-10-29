import Product from "../models/product.model.js";
import mongoose from "mongoose";

const getProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      data: products,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error`,
    });
  }
};

const addProduct = async (req, res) => {
  const product = req.body; // payload from user
  if (!product.name || !product.price || !product.image) {
    return res.status(400).json({
      success: false,
      message: `Please provide all fields`,
    });
  }
  const createProduct = new Product(product);
  try {
    const newProduct = await createProduct.save();
    res.status(201).json({
      success: true,
      message: `New product added`,
      data: newProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `server error`,
    });
    console.log(`Error: ${error.message}`);
  }
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Deleted successfully",
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: `Product not found`,
    });
  }
};
const updateProduct = async (req, res) => {
  const { id } = req.params;
  const user_payload = req.body;
  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: `Invalid product id`,
    });
  }
  try {
    const updatedProduct = await Product.findByIdAndUpdate(id, user_payload, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: `Product updated`,
      data: updatedProduct,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: `error.message`,
    });
  }
};
export { getProducts, addProduct, deleteProduct, updateProduct };
