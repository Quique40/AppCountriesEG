const server = require("./src/app.js");
const {
  getAllCountriesBaseDatos,
} = require("./src/controllers/countriesBaseDatos.js");
const { conn } = require("./src/db.js");

// Syncing all the models at once.
conn.sync({ force: false }).then(() => {
  server.listen(3001, async () => {
    console.log("%s listening at 3001"); // eslint-disable-line no-console
    await getAllCountriesBaseDatos();
  });
});
