//Here are all routes.

const express = require("express");
const router = express.Router();
const controllers = require("../controllers");
const authMiddleware = require("../middleware/auth")();

//EXAMPLE
router.get(
  "/example",
  authMiddleware.authenticate(),
  controllers.exampleController.listAllbooks
);
router.post(
  "/example",
  authMiddleware.authenticate(),
  controllers.exampleController.saveBook
);

// USER
router.post("/login", controllers.userController.login);
router.post("/register", controllers.userController.register);

// Image
router.get("/classifyImage", controllers.classifyController.classifyImage);

module.exports = router;
