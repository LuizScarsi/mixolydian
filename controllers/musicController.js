// controllers/musicController.js
const express = require("express");
const musicService = require("../services/musicService");
const authorize = require("../middleware/authMiddleware"); // Para proteger as rotas

const musicRouter = express.Router();

// ------------------------------------------------------------------
// 🔐 Rotas Protegidas (Apenas Admin pode criar, atualizar ou deletar músicas globais)
// Usamos o middleware authorize(['admin'])
// ------------------------------------------------------------------

// POST /music - Criar nova música
musicRouter.post("/", authorize(['admin']), musicService.createMusic);

// PUT /music/:id - Atualizar música
musicRouter.put("/:id", authorize(['admin']), musicService.updateMusic);

// DELETE /music/:id - Deletar música
musicRouter.delete("/:id", authorize(['admin']), musicService.deleteMusic);

// ------------------------------------------------------------------
// 🔓 Rotas Públicas/Autenticadas (Qualquer um pode ver o catálogo)
// ------------------------------------------------------------------

// GET /music/all - Retornar todas as músicas (Não precisa de autenticação para catálogo)
musicRouter.get("/all", musicService.returnAllMusics);

// GET /music/:id - Retornar música por ID
musicRouter.get("/:id", musicService.returnMusicById);


module.exports = musicRouter;