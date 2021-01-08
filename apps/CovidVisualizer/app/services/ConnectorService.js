import WebInfo from "./WebInfo";
import LoggerService from "./LoggerService";

class ConnectorService {
    constructor() {
    }

    getRomaniaCountyLatest(){
        LoggerService.formatLog("ConnectorService", `getRomaniaCountryLatest fetch data.`);
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/ro/counties`);
    }
    getCountriesActivePerMillion() {
        LoggerService.formatLog("ConnectorService", `getCountriesActivePerMillion fetch data.`);
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/maps/countries`);
    }
    getRoCountiesActivePerOneHundred() {
        LoggerService.formatLog("ConnectorService", `getRoCountiesActivePerOneHundred fetch data.`);
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/maps/regions/ro`);
    }
    getRomaniaLatestData() {
        LoggerService.formatLog("ConnectorService", `getRomaniaLatestData fetch data.`);
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/countries?name=romania`);
    }
    getWorldLatestData() {
        LoggerService.formatLog("ConnectorService", `getWorldLatestData fetch data.`);
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/world`);
    }
    getCountryLatestDataByLatAndLong(latitude, longitude) {
        LoggerService.formatLog("ConnectorService", `getCountryLatestDataByLatAndLong fetch data.`);
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/countries/coordinates?latitude=${latitude}&longitude=${longitude}`);
    }
    getWorldCovidNews() {
        LoggerService.formatLog("ConnectorService", `getWorldCovidNews fetch data.`);
        return WebInfo.fetchMethod(`${WebInfo.NEWS}`);
    }
    getRomaniaCovidNews() {
        LoggerService.formatLog("ConnectorService", `getRomaniaCovidNews fetch data.`);
        return WebInfo.fetchMethod(`${WebInfo.RO_NEWS}`);
    }
    getWorldTopCountryList(){
        LoggerService.formatLog("ConnectorService", `getWorldTopCountryList fetch data.`);
        return WebInfo.fetchMethod(`http://${WebInfo.IP}:${WebInfo.HOST}/api/latest/countries/top?number=15&sortBy=active`);
    }
}

const connectorService = new ConnectorService();
export default connectorService;
