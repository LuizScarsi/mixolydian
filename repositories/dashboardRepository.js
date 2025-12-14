const model = require("../models");

const getStats = async () => {
  const [
    users,
    musics,
    playlists,
    ratings,
    avgRating,
  ] = await Promise.all([
    model.User.count(),
    model.Music.count(),
    model.Playlist.count(),
    model.Rating.count(),
    model.Rating.findOne({
      attributes: [
        [model.sequelize.fn("AVG", model.sequelize.col("stars")), "avg"],
      ],
      raw: true,
    }),
  ]);

  return {
    users,
    musics,
    playlists,
    ratings,
    averageRating: Number(avgRating?.avg || 0),
  };
};

module.exports = {
  getStats,
};
