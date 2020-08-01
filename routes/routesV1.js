//Here are all routes.

const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const authMiddleware = require("../middleware/auth")();

// Image
router.post("/classifyImage", controllers.classifyController.classifyImage);

module.exports = router;
