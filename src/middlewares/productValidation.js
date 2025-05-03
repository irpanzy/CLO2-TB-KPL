const productValidation = (req, res, next) => {
  const { name, price, category } = req.body;
  const errors = [];

  // Validasi nama
  if (!name || typeof name !== "string" || name.trim().length < 3) {
    errors.push("Nama produk harus berupa string dan minimal 3 karakter.");
  }

  // Validasi harga (konversi ke angka karena berasal dari req.body)
  const parsedPrice = parseFloat(price);
  if (isNaN(parsedPrice) || parsedPrice <= 0) {
    errors.push("Harga produk harus berupa angka dan lebih besar dari 0.");
  }

  // Validasi kategori
  if (!category || typeof category !== "string" || category.trim().length < 3) {
    errors.push("Kategori produk harus berupa string dan minimal 3 karakter.");
  }

  // Validasi image dari multer
  if (!req.file) {
    errors.push("Gambar produk wajib diunggah.");
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
