const { Countries } = require("../db");
const { dbParser } = require("../controllers/dbParser");
const { Op } = require("sequelize");
module.exports = async (req, res, next) => {
  const { name } = req.query;

  try {
    if (name) {
      const namePars = dbParser(name);

      let match = await Countries.findAll({
        where: {
          name: {
            [Op.substring]: namePars,
          },
        },
      });

      if (match.length) {
        return res.json(match);
      } else {
        return res.status(404).json("No country found");
      }
    } else {
      let dbCountries = await Countries.findAll();
      res.send(dbCountries);
    }
  } catch (error) {
    next(error);
  }
};
