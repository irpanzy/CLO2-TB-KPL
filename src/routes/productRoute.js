const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const productValidation = require("../middlewares/productValidation");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/", productValidation, productController.createProduct);

router.put("/:id", productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
