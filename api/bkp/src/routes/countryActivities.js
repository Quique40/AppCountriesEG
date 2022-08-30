const { Countries, Activities, tourist_activity } = require("../db");

module.exports = async (req, res) => {
  let dBaseCountries = await Countries.findAll();
  const common = await tourist_activity.findAll();

  for (let i = 0; i < dBaseCountries.length; i++) {
    dBaseCountries[i] = {
      ...dBaseCountries[i].dataValues,
      activities: [],
    };
  }

  for (let i = 0; i < common.length; i++) {
    const activityId = common[i].activityId;
    const countryId = common[i].countryId;

    const activity = await Activities.findOne({
      where: {
        id: activityId,
      },
    });

    for (let j = 0; j < dBaseCountries.length; j++) {
      if (dBaseCountries[j].id === countryId) {
        dBaseCountries[j].activities.push(activity);
      }
    }
  }
  res.json(dBaseCountries);
};
