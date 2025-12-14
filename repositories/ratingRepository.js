const { Rating } = require("../models");
const { Op } = require("sequelize");

const create = (data) => Rating.create(data);

const findByUserAndPlaylist = (id_user, id_playlist) =>
  Rating.findOne({
    where: { id_user, id_playlist },
  });

const update = (id, data) =>
  Rating.update(data, { where: { id } });

const findByPlaylist = (id_playlist) =>
  Rating.findAll({
    where: { id_playlist },
    include: ["User"], // opcional
  });

const getAverageByPlaylist = async (id_playlist) => {
  const result = await Rating.findOne({
    where: { id_playlist },
    attributes: [
      [Rating.sequelize.fn("AVG", Rating.sequelize.col("stars")), "avg"],
    ],
    raw: true,
  });

  return Number(result.avg || 0).toFixed(1);
};

module.exports = {
  create,
  update,
  findByUserAndPlaylist,
  findByPlaylist,
  getAverageByPlaylist,
};
