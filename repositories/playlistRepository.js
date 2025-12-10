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
const updatePlaylist = async (playlist) => {
	try {
		// // Atualizar o user
		// await model.Playlist.update(playlist, {
		// 	where: { id_user: playlist.id_user},
		// });

		// Atualizar as musicas
		await model.Playlist.update(playlist, {
			where: { musics: playlist.musics},
		});

		// Retornar a playlist atualizada
		return await model.Playlist.findByPk(playlist.id_user);
	} catch (error) {
		throw error;
	}
};

// Função para deletar uma playlist
const deletePlaylist = async (id_user) => {
	try {
		const playlist = await getPlaylistByUserId(id_user);
		// Deletar o aluno
		await model.Playlist.destroy({ where: { id_user: id_user} });

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
