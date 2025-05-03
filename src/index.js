require("dotenv").config();
const express = require("express");
const path = require("path");
const cors = require("cors");
const methodOverride = require("method-override");
const session = require("express-session");
const flash = require("connect-flash");

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");
const UserService = require("./services/userService");
const ProductService = require("./services/productService"); // Import ProductService di sini

app.use(
  session({
    secret: "irpanzy",
    resave: false,
    saveUninitialized: true,
  })
);

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Untuk parsing form dari EJS
app.use(methodOverride("_method"));
app.use(flash());

// Buat flash tersedia untuk semua view
app.use((req, res, next) => {
  res.locals.success_msg = req.flash("success");
  res.locals.error_msg = req.flash("error");
  next();
});

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
    const page = parseInt(req.query.page) || 1;
    const limit = 8;
    const category = req.query.category;

    const { products, totalItems, totalPages } =
      await ProductService.getAllWithPagination({ page, limit, category });

    res.render("products/index", {
      title: "Daftar Produk",
      products,
      totalProducts: totalItems, // ✅ tambahkan ini
      currentPage: page,
      totalPages,
      successMessage: req.flash("success"),
      errorMessage: req.flash("error"),
    });
  } catch (error) {
    console.error("Gagal memuat produk:", error);
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

// Tampilkan form tambah produk
app.get("/view/products/create", (req, res) => {
  res.render("products/create", {
    title: "Tambah Produk Baru",
  });
});

// Tampilkan form edit produk
app.get("/view/products/:id/edit", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await ProductService.getById(parseInt(id));
    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.render("products/edit", {
      title: "Edit Produk",
      product,
    });
  } catch (error) {
    console.error("Error loading product:", error);
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
