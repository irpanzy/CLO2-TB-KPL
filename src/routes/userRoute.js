const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidation = require("../middlewares/userValidation");

router.get("/", userController.getAllUsers);

router.get("/:id", userController.getUserById);

router.get("/users", userController.getUserByEmail);

router.post("/", userValidation, userController.createUser);

router.put("/:id", userController.updateUser);

router.delete("/:id", userController.deleteUser);

module.exports = router;
