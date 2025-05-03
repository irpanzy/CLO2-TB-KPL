const imagekit = require("../config/imagekit");
const ProductService = require("../services/productService");

// Upload image to ImageKit and create product
const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;
    if (!name || !price || !category) {
      return res.status(400).json({
        error: "All fields (name, price, and category) are required",
      });
    }
    if (!req.file) {
      return res.status(400).json({ error: "Product image is required" });
    }
    // Upload to ImageKit
    const uploadResult = await imagekit.upload({
      file: req.file.buffer,
      fileName: req.file.originalname,
    });
    // Create product with image URL
    const newProduct = await ProductService.create({
      name,
      price: parseFloat(price),
      category,
      image: uploadResult.url,
    });
    return res.status(201).json({
      message: "Product created successfully with image",
      data: newProduct,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create product", details: err.message });
  }
};

// Get all products with filtering and pagination
const getAllProducts = async (req, res) => {
  try {
    const { page = 1, limit = 10, category } = req.query;
    const products = await ProductService.getAll({
      page: parseInt(page),
      limit: parseInt(limit),
      category,
    });
    if (products.length > 0) {
      return res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    }
    return res.status(404).json({ message: "No products found" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch products", details: err.message });
  }
};

// Get product by ID
const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getById(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    return res
      .status(200)
      .json({ message: "Product fetched successfully", data: product });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch product", details: err.message });
  }
};

// Update product (allows updating image via separate route if needed)
const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res
        .status(400)
        .json({ error: "All fields (name, price, and category) are required" });
    }

    let updatedData = {
      name,
      price: parseFloat(price),
      category,
    };

    // Jika ada file baru, upload ke ImageKit
    if (req.file) {
      const uploadResult = await imagekit.upload({
        file: req.file.buffer,
        fileName: req.file.originalname,
      });
      updatedData.image = uploadResult.url;
    }

    const updatedProduct = await ProductService.update(
      parseInt(id),
      updatedData
    );

    return res
      .status(200)
      .json({ message: "Product updated successfully", data: updatedProduct });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to update product", details: err.message });
  }
};

// Delete product
const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    await ProductService.delete(parseInt(id));
    return res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to delete product", details: err.message });
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
