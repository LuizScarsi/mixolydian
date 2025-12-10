const playlistRepository = require("../repositories/playlistRepository");

// Função para retornar todas as playlists
const returnAllPlaylists = async (req, res) => {
	try {
		const playlists = await playlistRepository.getAllPlaylists();
		res.status(200).json({ playlists: playlists });
	} catch (error) {
		console.log("Erro ao buscar playlists:", error);
		res.sendStatus(500);
	}
};

// Função para retornar todas as playlists do user
const returnAllUserPlaylists = async (req, res) => {
	try {
		const playlists = await playlistRepository.getPlaylistByUserId(req.params.id_user);
		res.status(200).json({ playlists: playlists });
	} catch (error) {
		console.log("Erro ao buscar playlists:", error);
		res.sendStatus(500);
	}
};

// Função para criar um nova playlist
const createPlaylist = async (req, res) => {
	const { id_user } = req.body;
	try {
		if (!id_user) {
			return res
				.status(400)
				.json({ message: "ID do user é obrigatório." });
		}

		const playlist = await playlistRepository.createPlaylist({
			id_user,
			playlist_name,
		});
		res.status(201).json(playlist);
	} catch (error) {
		console.log("Erro ao criar playlist:", error);
		res.sendStatus(500);
	}
};

// Função para atualizar uma playlist
const updatePlaylist = async (req, res) => {
	const id_user = parseInt(req.params.id_user);

	try {
		const updatedPlaylist =
			await playlistRepository.updatePlaylist({
				id_user,
			});

		if (updatedPlaylist) {
			res.status(200).json(updatedPlaylist);
		} else {
			res.status(404).json({ message: "playlist não encontrada" });
		}
	} catch (error) {
		console.log("Erro ao atualizar playlist:", error);
		res.sendStatus(500);
	}
};

// Função para deletar uma playlist
const deletePlaylist = async (req, res) => {
	try {
		const id_user = parseInt(req.params.id_user);
		const removedPlaylist = await playlistRepository.deletePlaylist(id_user);

		if (removedPlaylist) {
			res.status(200).json({
				message: "playlist removida com sucesso.",
				playlist: removedPlaylist,
			});
		} else {
			res.status(404).json({ message: "playlist não encontrada" });
		}
	} catch (error) {
		console.error("Erro ao deletar playlist:", error);
		res.status(500).json({ message: "Erro ao deletar playlist" });
	}
};

module.exports = {
	returnAllPlaylists,
	returnAllUserPlaylists,
	createPlaylist,
	updatePlaylist,
	deletePlaylist,
};
