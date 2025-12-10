"use strict";

module.exports = (sequelize, DataTypes) => {
	const Rating = sequelize.define(
		"Rating",
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true, // Geralmente avaliações têm ID próprio
			},
			stars: DataTypes.INTEGER,
			review: DataTypes.TEXT,
			id_user: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			id_playlist: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
		},
		{
			sequelize,
			tableName: "ratings",
			schema: "public",
			freezeTableName: true,
			timestamps: false,
		},
	);

	Rating.associate = function (models) {
		Rating.belongsTo(models.User, {
			foreignKey: "id_user",
			sourceKey: "id",
		});
		Rating.belongsTo(models.Playlist, {
			foreignKey: "id_playlist",
			sourceKey: "id",
		});
	};

	return Rating;
};