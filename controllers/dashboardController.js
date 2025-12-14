const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authMiddleware");
const dashboardService = require("../services/dashboardService");

// 🔒 apenas admin
router.get("/", authorize(["admin"]), dashboardService.getDashboard);

module.exports = router;
