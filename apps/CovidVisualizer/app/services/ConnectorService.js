const getActivePerMillion = async () => {
    return await fetch('http://10.0.2.2:2020/api/maps/countries')
        .then(response => response.json())
        .catch((err)=> console.error(err));
}

const getRoCountiesActivePerOneHundred = async () => {
    return await fetch('http://10.0.2.2:2020/api/maps/regions/ro')
        .then(response => response.json())
        .catch((err)=> console.error(err));
}


module.exports = {
    "getCountriesActivePerMillion": getActivePerMillion,
    "getRoCountiesActivePerOneHundred": getRoCountiesActivePerOneHundred
}
