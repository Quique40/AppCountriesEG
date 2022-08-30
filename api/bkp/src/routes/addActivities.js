const { Activities, Countries } = require("../db");
const { activityCheck } = require("../controllers/activitiesCheck");
const { dbParser } = require("../controllers/dbParser");

module.exports = async (req, res, next) => {
  const name = await dbParser(req.body.name);
  const difficulty = await dbParser(req.body.difficulty);
  const duration = await req.body.duration;
  const season = await dbParser(req.body.season);
  const description = req.body.description;
  let countries = req.body.countries;

  if (
    !name ||
    !difficulty ||
    !duration ||
    !season ||
    !description ||
    !countries
  ) {
    return res.status(404).json("Data missing");
  }

  if (difficulty < 1 || difficulty > 5) {
    return res.status(404).json("Wrong difficulty value");
  }

  //summer, winter, fall, spring,
  console.log(difficulty);

  if (
    season === "Summer" ||
    season === "Winter" ||
    season === "Fall" ||
    season === "Spring"
  ) {
    try {
      if (await activityCheck(name)) {
        return res
          .status(404)
          .json("The activity you are trying to load already exists");
      }

      const newActivity = await Activities.findOrCreate({
        where: {
          name: name,
          difficulty: difficulty,
          duration: duration,
          season: season,
          description: description,
        },
      });

      for (let i = 0; i < countries.length; i++) {
        const match = await Countries.findOne({
          where: {
            name: countries[i],
          },
        });
        await newActivity[0].addCountries(match);
      }
      return res.status(200).json("Activity created successfully!");
    } catch (error) {
      next(error);
    }
  }
  return res.status(404).json("Incorrect data in property: season");
};
