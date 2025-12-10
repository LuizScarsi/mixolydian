const express = require("express");
const playlistService = require("../services/playlistService");

const playlistRouter = express.Router();

// POST /playlist - Criar nova playlist
playlistRouter.post("/", playlistService.createPlaylist);

// GET /playlists - Retornar todas as playlists
playlistRouter.get("/", playlistService.returnAllPlaylists);

// GET /playlist/:id_user - Retornar todas as playlists do user
playlistRouter.get("/user/:id_user", playlistService.returnAllUserPlaylists);

// PUT /playlist/:id_aluno - Atualizar playlist
playlistRouter.put("/:id_user", playlistService.updatePlaylist);

// DELETE /playlist/:id_aluno - Deletar playlist
playlistRouter.delete("/:id_user", playlistService.deletePlaylist);

module.exports = playlistRouter;