const express = require("express");
const router = express.Router();
const authorize = require("../middleware/authMiddleware");
const ratingService = require("../services/ratingService");

// Criar ou atualizar rating
router.post("/", authorize(["user", "admin"]), ratingService.createOrUpdate);

// Listar ratings da playlist + média
router.get("/playlist/:id", ratingService.getByPlaylist);
router.get("/my/playlist/:id", authorize(["user", "admin"]), ratingService.getMyRating);

module.exports = router;
