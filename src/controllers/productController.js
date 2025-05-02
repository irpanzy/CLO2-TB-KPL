const ProductService = require("../services/productService");

const getAllProducts = async (req, res) => {
  try {
    const { page, limit, category } = req.query;

    const products = await ProductService.getAll({
      page: parseInt(page) || 1,
      limit: parseInt(limit) || 10,
      category,
    });

    if (products.length > 0) {
      return res.status(200).json({
        message: "Products fetched successfully",
        data: products,
      });
    } else {
      return res.status(404).json({
        message: "No products found",
      });
    }
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch products",
      details: err.message,
    });
  }
};

const createProduct = async (req, res) => {
  try {
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        error: "All fields (name, price, and category) are required",
      });
    }

    const newProduct = await ProductService.create({
      name,
      price,
      category,
    });

    return res.status(201).json({
      message: "Product created successfully",
      data: newProduct,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to create product", details: err.message });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getById(parseInt(id));

    if (product) {
      return res.status(200).json({
        message: "Product fetched successfully",
        data: product,
      });
    } else {
      return res.status(404).json({
        error: "Product not found",
      });
    }
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to fetch product", details: err.message });
  }
};

const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, price, category } = req.body;

    if (!name || !price || !category) {
      return res.status(400).json({
        error: "All fields (name, price, and category) are required",
      });
    }

    const updatedProduct = await ProductService.update(parseInt(id), {
      name,
      price,
      category,
    });

    return res.status(200).json({
      message: "Product updated successfully",
      data: updatedProduct,
    });
  } catch (err) {
    return res
      .status(500)
      .json({ error: "Failed to update product", details: err.message });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await ProductService.getById(parseInt(id));
    if (!product) {
      return res.status(404).json({
        error: "Product not found",
      });
    }

    await ProductService.delete(parseInt(id));

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to delete product", details: err.message });
  }
};

module.exports = {
  getAllProducts,
  createProduct,
  getProductById,
  updateProduct,
  deleteProduct,
};
