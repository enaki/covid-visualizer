import AsyncStorage from "@react-native-community/async-storage";
import moment from "moment";

class LoadDataService {
    async getData(storageKey, fetchMethod){
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
                    console.log("[AsyncStorage] - Seconds passed since the last update: " + seconds);
                    if (seconds > 3600) { // one hour
                        needUpdate = true;
                    }
                }
            }
            console.log(`[AsyncStorage] - Checked ${storageKey} data in AsyncStorage. NeedUpdate?` + needUpdate);
            if (needUpdate) {

                let data = await fetchMethod();
                if(data !== null)
                {
                    AsyncStorage.setItem(storageKey, JSON.stringify({"data": data, "updated": moment().valueOf()}));
                    console.log(`[AsyncStorage] - Setting data ${storageKey} on ${moment().format('MMMM Do YYYY, HH:mm:ss')}`);
                }
                return data;
            } else {
                return localData["data"];
            }
        } catch (err) {
            console.log(`[AsyncStorage] - Error ${err}`);
        }
    }
}

const loadData = new LoadDataService();
export default loadData;
