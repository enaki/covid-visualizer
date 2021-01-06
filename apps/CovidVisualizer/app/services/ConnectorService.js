class ConnectorService {
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
        this.NEWS_API_KEY = "ceb5a8887632471d959280cb3f31fd55"
        this.RO_NEWS = `https://newsapi.org/v2/everything?q=covid&sortBy=publishedAt&apiKey=${this.NEWS_API_KEY}&pageSize=100&page=1&language=ro`;
        this.NEWS = `https://newsapi.org/v2/everything?q=covid&sortBy=publishedAt&apiKey=${this.NEWS_API_KEY}&pageSize=100&page=1&language=en&sources=bbc-news,nbc-news,new-scientist`;

    }
    getCountriesActivePerMillion() {
        return fetch(`http://${this.IP}:${this.HOST}/api/maps/countries`, this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getRoCountiesActivePerOneHundred() {
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
    getCountryLatestDataByLatAndLong(latitude, longitude) {
        return fetch(`http://${this.IP}:${this.HOST}/api/latest/countries/coordinates?latitude=${latitude}&longitude=${longitude}`, this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getWorldCovidNews() {
        return fetch(`${this.NEWS}`, this.requestOptions)
            .then((response) => response.json())
            .then((json) => {
                return json;
            })
            .catch((error) => {
                console.error(error);
            });
    }
    getRomaniaCovidNews() {
        return fetch(`${this.RO_NEWS}`, this.requestOptions)
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
