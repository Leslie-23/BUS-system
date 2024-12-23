const express = require("express");
const {
  adminLogin,
  adminLogout,
} = require("../controllers/admin-login-controller");
const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", adminLogout);

module.exports = router;
