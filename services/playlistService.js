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
	const id_user = req.userId;
	const { id, name, description } = req.body;

	try {
		if (!id_user) {
			return res
				.status(400)
				.json({ message: "ID do user é obrigatório." });
		}
		const playlist = await playlistRepository.createPlaylist({
			id,
			name,
			description,
		});
		res.status(201).json(playlist);
	} catch (error) {
		console.log("Erro ao criar playlist:", error);
		res.sendStatus(500);
	}
};

// Função para atualizar uma playlist
// const updatePlaylist = async (req, res) => {
// 	const id_playlist = parseInt(req.params.id_playlist);

// 	try {
// 		const updatedPlaylist =
// 			await playlistRepository.updatePlaylist(
// 			id_playlist,
// 			{ name, description },
// 			musicIds
// 		);

// 		if (updatedPlaylist) {
// 			res.status(200).json(updatedPlaylist);
// 		} else {
// 			res.status(404).json({ message: "playlist não encontrada" });
// 		}
// 	} catch (error) {
// 		console.log("Erro ao atualizar playlist:", error);
// 		res.sendStatus(500);
// 	}
// };
const updatePlaylist = async (req, res) => {
  const playlistId = Number(req.params.id_playlist);
  console.log(playlistId)
  const { name, description, musicIds } = req.body;

  if (!Number.isInteger(playlistId)) {
    return res.status(400).json({ message: "ID inválido" });
  }

  try {
    const playlist = await playlistRepository.updatePlaylist(
      playlistId,
      { name, description },
      musicIds
    );

    res.json(playlist);
  } catch (error) {
    console.error("Erro ao atualizar playlist:", error);
    res.sendStatus(500);
  }
};


// Função para deletar uma playlist
const deletePlaylist = async (req, res) => {
	try {
		const id_playlist = parseInt(req.params.id_playlist);
		const removedPlaylist = await playlistRepository.deletePlaylist(id_playlist);

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
