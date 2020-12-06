const getActivePerMillion = () => {
    const requestOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': "application/json; charset=utf-8",
        }
    };
    return fetch("https://127.0.0.1:2020/api/countries/active-per-million", requestOptions)
        .then((response) => response.json())
        .then((json) => {
            return json;
        })
        .catch((error) => {
            console.error(error);
        });
}


module.exports = {
    "getCountriesActivePerMillion": getActivePerMillion
}
