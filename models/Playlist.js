"use strict";

module.exports = (sequelize, DataTypes) => {
	const Playlist = sequelize.define(
		"Playlist",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			description: DataTypes.TEXT,
		},
		{
			sequelize,
			tableName: "playlists",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Playlist.associate = function (models) {
		Playlist.hasMany(models.PlaylistMusic, {
			foreignKey: "id_playlist",
			sourceKey: "id",
		});
	Playlist.hasMany(models.UserPlaylist, {
			foreignKey: "id_playlist",
			sourceKey: "id",
		});
	};

	return Playlist;
};


// class Playlist {
//     static id = 0;
//     constructor(name) {
//         this.id = id++;
//         this.name = name;
//         this.musics = [];
//         this.ratings = [];
//     }
// };

// module.exports =  { Playlist };