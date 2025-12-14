const dashboardRepository = require("../repositories/dashboardRepository");

const getDashboard = async (req, res) => {
  try {
    const data = await dashboardRepository.getStats();
    res.json(data);
  } catch (err) {
    console.error("Erro dashboard:", err);
    res.sendStatus(500);
  }
};

module.exports = {
  getDashboard,
};
