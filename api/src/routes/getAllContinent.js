const { Countries } = require("../db");

module.exports = async (req, res) => {
  const dbCountries = await Countries.findAll();

  for (let i = 0; i < dbCountries.length; i++) {
    dbCountries[i] = dbCountries[i].dataValues;
  }

  const continentDupli = dbCountries.map((el) => el.continent);
  // var continentDupli

  // for(let i=0; i<dbCountries.length; i++){
  //     continentDupli = dbCountries[i].continent
  // }

  const allContinents = continentDupli.filter((item, index) => {
    return continentDupli.indexOf(item) === index;
  });

  res.json(allContinents);
};
