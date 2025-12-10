"use strict";

module.exports = (sequelize, DataTypes) => {
	const Music = sequelize.define(
		"Music",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
			},
			name: DataTypes.TEXT,
		},
		{
			sequelize,
			tableName: "musics",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Music.associate = function (models) {
		Music.hasMany(models.PlaylistMusic, {
			foreignKey: "id_music",
			sourceKey: "id",
		});
	};

	return Music;
};