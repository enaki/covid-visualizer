class ConnectorService{
    constructor(props) {
        this.requestOptions = {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': "application/json; charset=utf-8"
            }
        }
        this.IP = "10.0.2.2";
        this.HOST = "2020";
    }
    getCountriesActivePerMillion(){
        return fetch(`http://${this.IP}:${this.HOST}/api/maps/countries`, this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getRoCountiesActivePerOneHundred(){
        return fetch(`http://${this.IP}:${this.HOST}/api/maps/regions/ro`, this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getRomaniaLatestData() {
        return fetch(`http://${this.IP}:${this.HOST}/api/latest/countries?name=romania`, this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getWorldLatestData() {
        return fetch(`http://${this.IP}:${this.HOST}/api/latest/world`, this.requestOptions)
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
