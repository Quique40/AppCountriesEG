const { Countries, Activities, tourist_activity } = require("../db");
const { dbParser } = require("../controllers/dbParser");

module.exports = async (req, res, next) => {
  const id = dbParser(req.params.id, true);

  try {
    let actId = [];
    let actDetail = [];
    let shippingFull = {};

    let dbCountry = await Countries.findByPk(id); //en dbCountry queda guardado el country cuyo id coincide con
    //el id pasado por param.

    if (!dbCountry) return res.status(404).json("No country found");

    let dbActiv = await tourist_activity.findAll({
      //en dbActiv guardamos todas las filas de la tabla:
      where: {
        //"tourist_activity", que tengan el valor countryId
        countryId: id, //igual al id pasado por param.
      },
    });

    for (let i = 0; i < dbActiv.length; i++) {
      //en actId cargamos todos los activityId de las
      actId.push(dbActiv[i].dataValues.activityId); //actividades realizadas en el país cuyo id es igual
    } //al id pasado por param.

    for (let i = 0; i < actId.length; i++) {
      const rows = await Activities.findOne({
        //en rows se guardará la fila de la tabla: Activities
        where: {
          //cuyo id sea igual al actiId corresp a la iteracion
          id: actId[i],
        },
      });
      actDetail.push(rows.dataValues); //luego de actDetail se guardan los "valores" de las
    } //filas guardas anteriormente.

    shippingFull = await { ...dbCountry.dataValues, activities: actDetail };

    return res.json(shippingFull);
  } catch (error) {
    next(error);
  }
};
