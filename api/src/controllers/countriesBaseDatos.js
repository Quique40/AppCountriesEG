const {Countries} = require("../db")
const axios = require("axios")

async function getAllCountriesBaseDatos(){
    try{
       var countries = (await axios("https://restcountries.com/v3/all")).data
            .map(e =>({
            id: e.cca3,
            name: e.name.common, 
            flag: e.flags[1],
            continent: e.region,
            capital: e.capital? e.capital[0] : "Don't have capital",            
            subregion: e.subregion,
            area: e.area, 
            population: e.population
            }))
            
        const dbCountries = await Countries.findAll();
        if(dbCountries.length) return null
        

        await Countries.bulkCreate(countries) 

        
       
        console.log("Countries loaded correctly")
    }catch(error){
        console.log(error)
    }
}


module.exports = {
    getAllCountriesBaseDatos
}





