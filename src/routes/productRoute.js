const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");
const upload = require("../middlewares/upload");
const productValidation = require("../middlewares/productValidation");

router.get("/", productController.getAllProducts);

router.get("/:id", productController.getProductById);

router.post("/", upload.single("image"), productValidation, productController.createProduct);

router.put("/:id", upload.single("image"), productController.updateProduct);

router.delete("/:id", productController.deleteProduct);

module.exports = router;
