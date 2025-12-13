const model = require("../models");

// Função para obter todos as matriculas
const getAllPlaylists = async () => {
	return await model.Playlist.findAll();
};

// Função para obter playlist por ID do user
const getPlaylistByUserId = async (id_user) => {
	return await model.UserPlaylist.findAll({
		where: {
			id_user: id_user,
		},
		include: [
			{
				model: model.Playlist,
			},
		],
	});
};

// Função para obter playlist por nome da playlist
const getPlaylistByName = async (name) => {
	return await model.Playlist.findAll({
		where: {
			name: name,
		},
	});
};

// Função para criar uma nova matricula
const createPlaylist = async (playlist) => {
	await model.Playlist.create(playlist);
	return playlist;
};

// Função para atualizar uma playlist
const updatePlaylist = async (playlistId, data, musicIds) => {
  // 1️⃣ Buscar playlist
  const playlist = await model.Playlist.findByPk(playlistId);

  if (!playlist) {
    throw new Error("Playlist não encontrada");
  }

  // 2️⃣ Atualizar campos simples
  await playlist.update({
    name: data.name,
    description: data.description,
  });

  // 3️⃣ Atualizar músicas (tabela pivot)
  if (Array.isArray(musicIds)) {
    await playlist.setMusics(musicIds);
  }

  return playlist;
};


// Função para deletar uma playlist
const deletePlaylist = async (id_playlist) => {
	try {
		const playlist = await getPlaylistByUserId(id_playlist);
		await model.PlaylistMusic.destroy({ where: { id_playlist: id_playlist} });
		await model.Playlist.destroy({ where: { id: id_playlist} });

		return playlist;
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllPlaylists,
	getPlaylistByName,
	getPlaylistByUserId,
	createPlaylist,
	updatePlaylist,
	deletePlaylist,
};
