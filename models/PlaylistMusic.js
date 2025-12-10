"use strict";

module.exports = (sequelize, DataTypes) => {
	const PlaylistMusic = sequelize.define(
		"PlaylistMusic",
		{
			id_playlist: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			id_music: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
		},
		{
			sequelize,
			tableName: "playlist_music",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	PlaylistMusic.associate = function (models) {
		PlaylistMusic.belongsTo(models.Playlist, {
			foreignKey: "id_playlist",
			sourceKey: "id",
		});
		PlaylistMusic.belongsTo(models.Music, {
			foreignKey: "id_music",
			sourceKey: "id",
		});
	};

	return PlaylistMusic;
};