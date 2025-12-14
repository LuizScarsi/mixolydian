const model = require("../models");

const getAllPlaylists = async () => {
  const playlists = await model.Playlist.findAll({
    include: [
      {
        model: model.Music,
        as: "musics",
        attributes: ["id", "name"],
        through: { attributes: [] },
      },
      {
        model: model.UserPlaylist,
        include: [
          {
            model: model.User,
            attributes: ["id", "name"],
          },
        ],
      },
    ],
  });

  // 🔥 NORMALIZAÇÃO (O PONTO QUE FALTAVA)
  return playlists.map((p) => {
    const ownerRelation = p.UserPlaylists?.[0];
    const ownerUser = ownerRelation?.User;
	console.log("OWNER USER:", ownerUser);
	console.log("owner relation:", ownerRelation);

    return {
      id: Number(p.id),
      name: p.name,
      description: p.description,

      // 👤 DONO DA PLAYLIST
      owner: ownerUser ? ownerUser.name : "Sem dono",
      owner_id: ownerUser ? ownerUser.id : null,

      // 🎵 MÚSICAS DA PLAYLIST
      musics: p.musics.map((m) => ({
        id: Number(m.id),
        name: m.name,
      })),
    };
  });
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
