const {Activities} = require("../db")

const activityCheck = async(name) => {
    const existence = await Activities.findAll({
        where:{
                name: name
                
        }
    })

    if(existence.length){
        return true;
    }
    return false;
}
module.exports = {
    activityCheck
}

