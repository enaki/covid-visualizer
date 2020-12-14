const getActivePerMillion = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json; charset=utf-8",
        }
    };
    return fetch("http://10.0.2.2:2020/api/maps/countries", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
}

const getRoCountiesActivePerOneHundred = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json; charset=utf-8",
        }
    };
    return fetch("http://10.0.2.2:2020/api/maps/regions/ro", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
}


module.exports = {
    "getCountriesActivePerMillion": getActivePerMillion,
    "getRoCountiesActivePerOneHundred": getRoCountiesActivePerOneHundred
}
