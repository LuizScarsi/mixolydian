"use strict";

module.exports = (sequelize, DataTypes) => {
  const Music = sequelize.define(
    "Music",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "musics",
      schema: "public",
      freezeTableName: true,
      timestamps: false,
    }
  );

  Music.associate = (models) => {
    Music.belongsToMany(models.Playlist, {
      through: models.PlaylistMusic,
      foreignKey: "id_music",
      otherKey: "id_playlist",
      as: "playlists",
    });
  };

  return Music;
};

