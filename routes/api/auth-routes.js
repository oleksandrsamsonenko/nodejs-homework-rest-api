const express = require("express");
const authControllers = require("../../controllers/auth-controllers");
const userValidateBody = require("../../utils/user-validation");
const authenticate = require("../../middlewares/authenticate");
const router = express.Router();

router.post("/register", userValidateBody(), authControllers.register);
router.post("/login", userValidateBody(), authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);
module.exports = router;
