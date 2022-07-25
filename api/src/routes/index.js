const { Router } = require("express");
// const countryRoutes = require("./countryRoutes");
const addActivities = require("./addActivities");
const countryActivities = require("./countryActivities");
const countryDetails = require("./countryDetails");
// const getAllCountries = require('./countryRoutes');
const countryName = require("./countryName");
const getActivities = require("./getActivities");
const getAllContinent = require("./getAllContinent");

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/countries", countryName);
router.post("/activities", addActivities);
router.get("/countries/:id", countryDetails);
router.get("/complete", countryActivities);
router.get("/readActivities", getActivities);
router.get("/continent", getAllContinent);

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

module.exports = router;
