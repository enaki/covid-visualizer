import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";
import LoggerService from "./LoggerService";

class LoadDataService {
    async getData(storageKey, fetchMethod){
        LoggerService.formatLog(this.constructor.name, `getData method. Look for key: ${storageKey}.`);
        try {
            let localData = JSON.parse(await AsyncStorage.getItem(storageKey));
            let needUpdate = false;
            if (localData == null) {
                needUpdate = true;
            } else {
                if (localData["updated"] == null || localData["data"] == null) {
                    needUpdate = true;
                } else {
                    let seconds = moment().diff(moment(localData["updated"]), 'seconds');
                    LoggerService.formatLog(this.constructor.name, `Seconds passed since the last update: ${seconds}`);
                    if (seconds > 3600) { // one hour
                        needUpdate = true;
                    }
                }
            }
            LoggerService.formatLog(this.constructor.name, `Checked ${storageKey} data in AsyncStorage. NeedUpdate?\t${needUpdate}`);
            if (needUpdate) {

                let data = await fetchMethod();
                if(data !== null)
                {
                    AsyncStorage.setItem(storageKey, JSON.stringify({"data": data, "updated": moment().valueOf()}));
                    LoggerService.formatLog(this.constructor.name, `Setting data ${storageKey} on ${moment().format('MMMM Do YYYY, HH:mm:ss')}`);
                }
                return data;
            } else {
                return localData["data"];
            }
        } catch (err) {
            LoggerService.formatLog(this.constructor.name, `Error ${err}`);
        }
    }
}

const loadData = new LoadDataService();
export default loadData;
