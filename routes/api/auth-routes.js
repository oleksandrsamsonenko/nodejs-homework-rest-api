const express = require("express");
const authControllers = require("../../controllers/auth-controllers");
const userValidateBody = require("../../utils/user-validation");
const authenticate = require("../../middlewares/authenticate");
const upload = require("../../middlewares/upload");
const router = express.Router();

router.post("/register", userValidateBody(), authControllers.register);
router.get("/verify/:verificationToken", authControllers.verify);
router.post("/verify", authControllers.resendVerificationEmail);
router.post("/login", userValidateBody(), authControllers.login);
router.get("/current", authenticate, authControllers.getCurrent);
router.post("/logout", authenticate, authControllers.logout);
router.patch(
  "/avatars",
  authenticate,
  upload.single("avatar"),
  authControllers.updateAvatar
);
module.exports = router;
