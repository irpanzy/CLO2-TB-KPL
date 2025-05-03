require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const UserService = require("./services/userService");
const ProductService = require("./services/productService"); // Import ProductService di sini

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk parsing form dari EJS

// View Engine Setup (EJS)
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Static files (CSS, images, dll)
app.use(express.static("public"));

// API Routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);

// Web Routes (contoh jika ingin render HTML)
app.get("/view/products", async (req, res) => {
  try {
    const products = await ProductService.getAll({});
    res.render("products/index", {
      title: "Daftar Produk",
      products,
    });
  } catch (error) {
    console.error("Error loading products:", error);
    res.status(500).send("Terjadi kesalahan saat memuat produk.");
  }
});

app.get("/view/users", async (req, res) => {
  try {
    const users = await UserService.getAll({});
    res.render("users/index", {
      title: "Daftar User",
      users,
    });
  } catch (error) {
    console.error("Error loading users:", error);
    res.status(500).send("Terjadi kesalahan saat memuat produk.");
  }
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running at http://localhost:${PORT}`);
});
