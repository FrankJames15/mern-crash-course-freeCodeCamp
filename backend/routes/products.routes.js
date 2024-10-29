import {
  getProducts,
  addProduct,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller.js";
import express from "express";

const router = express.Router();

router.get("/", getProducts);
router.post("/", addProduct);
router.route("/:id").patch(updateProduct).delete(deleteProduct);

export default router;
