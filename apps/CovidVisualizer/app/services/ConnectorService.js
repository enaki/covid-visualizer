import WebInfo from "./WebInfo";

class ConnectorService {
    constructor() {
    }

    getRomaniaCountyLatest(){
        console.log("[ConnectorService] - getRomaniaCountryLatest fetch data");
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/ro/counties`);
    }
    getCountriesActivePerMillion() {
        console.log("[ConnectorService] - getCountriesActivePerMillion fetch data");
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/maps/countries`);
    }
    getRoCountiesActivePerOneHundred() {
        console.log("[ConnectorService] - getRoCountiesActivePerOneHundred fetch data");
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/maps/regions/ro`);
    }
    getRomaniaLatestData() {
        console.log("[ConnectorService] - getRomaniaCountryLatest fetch data");
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/countries?name=romania`);
    }
    getWorldLatestData() {
        console.log("[ConnectorService] - getWorldLatestData fetch data");
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/world`);
    }
    getCountryLatestDataByLatAndLong(latitude, longitude) {
        console.log("[ConnectorService] - getCountryLatestDataByLatAndLong fetch data");
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/countries/coordinates?latitude=${latitude}&longitude=${longitude}`);
    }
    getWorldCovidNews() {
        console.log("[ConnectorService] - getWorldCovidNews fetch data");
        return WebInfo.fetchMethod(`${WebInfo.NEWS}`);
    }
    getRomaniaCovidNews() {
        console.log("[ConnectorService] - getRomaniaCovidNews fetch data");
        return WebInfo.fetchMethod(`${WebInfo.RO_NEWS}`);
    }
}

const connectorService = new ConnectorService();
export default connectorService;
