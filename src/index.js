require("dotenv").config();
const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;
const productRoute = require("./routes/productRoute");
const userRoute = require("./routes/userRoute");

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/v1/products", productRoute);
app.use("/api/v1/users", userRoute);

// Health check
app.get("/", (req, res) => {
  res.status(200).json({ message: "E-Commerce API is running ✅" });
});

app.use((req, res) => {
  res.status(404).json({ error: "Endpoint not found" });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
