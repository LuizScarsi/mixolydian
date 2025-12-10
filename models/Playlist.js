"use strict";

module.exports = (sequelize, DataTypes) => {
	const Playlist = sequelize.define(
		"Playlist",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			name: DataTypes.STRING, // Adicionado baseado na sua classe antiga
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
		Playlist.hasMany(models.Rating, {
			foreignKey: "id_playlist",
			sourceKey: "id",
		});
	};

	return Playlist;
};
