const express = require("express");
const dotenv = require("dotenv");
const app = express();

dotenv.config();

const port = process.env.PORT;

app.get("/api", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
