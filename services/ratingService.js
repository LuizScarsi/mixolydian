const ratingRepository = require("../repositories/ratingRepository");

const createOrUpdate = async (req, res) => {
  const { stars, review, id_playlist } = req.body;
  const id_user = req.userId; // 👈 vem do JWT

  if (!stars || !id_playlist) {
    return res.status(400).json({ message: "Stars e playlist são obrigatórios." });
  }

  try {
    const existing = await ratingRepository.findByUserAndPlaylist(
      id_user,
      id_playlist
    );

    if (existing) {
      const updated = await ratingRepository.update(existing.id, {
        stars,
        review,
      });
      return res.json(updated);
    }

    const rating = await ratingRepository.create({
      stars,
      review,
      id_user,
      id_playlist,
    });

    res.status(201).json(rating);
  } catch (err) {
    console.error("Erro rating:", err);
    res.sendStatus(500);
  }
};

const getMyRating = async (req, res) => {
  const { id } = req.params;
  const id_user = req.userId;
  console.log("User ID:", id_user, "Playlist ID:", id);

  try {
    const rating = await ratingRepository.findByUserAndPlaylist(
      id_user,
      id
    );

    res.json(rating); // pode ser null
  } catch (err) {
    res.sendStatus(500);
  }
};


const getByPlaylist = async (req, res) => {
  const { id } = req.params;
  console.log("Fetching ratings for playlist ID:", id);

  try {
    const ratings = await ratingRepository.findByPlaylist(id);
    const avg = await ratingRepository.getAverageByPlaylist(id);

    res.json({ ratings, average: avg });
  } catch (err) {
    res.sendStatus(500);
  }
};

module.exports = {
  createOrUpdate,
  getByPlaylist,
  getMyRating,
};
