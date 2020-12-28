class ConnectorService{
    constructor(props) {
        this.requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json; charset=utf-8"
            }
        }
    }
    getCountriesActivePerMillion(){
        return fetch('http://10.0.2.2:2020/api/maps/countries', this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getRoCountiesActivePerOneHundred(){
        return fetch("http://10.0.2.2:2020/api/maps/regions/ro", this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getRomaniaLatestData() {
        return fetch("http://10.0.2.2:2020/api/latest/countries?name=romania", this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
}

const connectorService = new ConnectorService();
export default connectorService;
