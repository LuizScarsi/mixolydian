"use strict";

module.exports = (sequelize, DataTypes) => {
	const UserPlaylist = sequelize.define(
		"UserPlaylist",
		{
			id_user: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			id_playlist: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
		},
		{
			sequelize,
			tableName: "user_playlist",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	UserPlaylist.associate = function (models) {
		UserPlaylist.belongsTo(models.User, {
			foreignKey: "id_user",
			sourceKey: "id",
		});
		UserPlaylist.belongsTo(models.Playlist, {
			foreignKey: "id_playlist",
			sourceKey: "id",
		});
	};

	return UserPlaylist;
};
