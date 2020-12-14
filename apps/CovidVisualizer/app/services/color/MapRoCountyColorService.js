let Rainbow = require('../../../node_modules/rainbowvis.js/rainbowvis');

let myROCountyRainbow = new Rainbow();
myROCountyRainbow.setNumberRange(0, 100);
//myROCountyRainbow.setSpectrum("#ffeda0", "#feb24c", "#f03b20");
myROCountyRainbow.setSpectrum("#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15");

const ConnectorService = require('../ConnectorService');

let romania_actives_per_one_hundred = undefined;

const colorSpectrum = (value) => {
    return "#" + myROCountyRainbow.colorAt(value);
}

const getRomaniaDataFromApiAsync = async () => {
    try {
        romania_actives_per_one_hundred = await ConnectorService.getRoCountiesActivePerOneHundred();
    } catch (error) {
        console.error("[ERROR-ColorService]: " + error);
    }
};
getRomaniaDataFromApiAsync();
console.log("[INFO-ColorService]: romania_total_per_one_hundred=" + romania_actives_per_one_hundred);

const colorSpectrumByROCountyKey = (key) => {
    try {
        let value = romania_actives_per_one_hundred.counties[key] / romania_actives_per_one_hundred["max"];
        console.log(100*value);
        return colorSpectrum(100*value);
    }
    catch (TypeError) {
        return "#ffffff"
    }
}

module.exports = {
    "colorSpectrumByROCountyKey": colorSpectrumByROCountyKey,
}
