const productValidation = (req, res, next) => {
  const { name, price, category } = req.body;

  const errors = [];

  if (!name || typeof name !== "string" || name.trim().length < 2) {
    errors.push("Nama produk harus berupa string dan minimal 3 karakter.");
  }

  if (typeof price !== "number" || price <= 0) {
    errors.push("Harga produk harus berupa angka dan lebih besar dari 0.");
  }

  if (!category || typeof category !== "string" || category.trim().length < 2) {
    errors.push("Kategori produk harus berupa string dan minimal 3 karakter.");
  }

  if (errors.length > 0) {
    return res.status(400).json({
      error: "Validasi gagal",
      details: errors,
    });
  }

  next();
};

module.exports = productValidation;
