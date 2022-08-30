const { Activities } = require("../db");

module.exports = async (req, res, next) => {
  try {
    const dbActiv = await Activities.findAll();

    return res.json(dbActiv);
  } catch (error) {
    next(error);
  }
};
