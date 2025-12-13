const express = require("express");
const playlistService = require("../services/playlistService");
const authorize = require("../middleware/authMiddleware");

const playlistRouter = express.Router();

// POST /playlist - Criar nova playlist
playlistRouter.post("/", authorize(['user', 'admin']), playlistService.createPlaylist);

// GET /playlists - Retornar todas as playlists
playlistRouter.get("/all", playlistService.returnAllPlaylists);

// GET /playlist/:id_user - Retornar todas as playlists do user
playlistRouter.get("/user/:id_user", playlistService.returnAllUserPlaylists);

// PUT /playlist/:id_playlist - Atualizar playlist
playlistRouter.put("/:id_playlist", authorize(['user', 'admin']), playlistService.updatePlaylist);

// DELETE /playlist/:id_playlist - Deletar playlist
playlistRouter.delete("/:id_playlist", authorize(['user', 'admin']), playlistService.deletePlaylist);

module.exports = playlistRouter;