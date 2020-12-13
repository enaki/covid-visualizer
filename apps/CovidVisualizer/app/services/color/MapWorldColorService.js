let Rainbow = require('../../../node_modules/rainbowvis.js/rainbowvis');
let myCountryRainbow = new Rainbow();
myCountryRainbow.setNumberRange(0, 10);
//myCountryRainbow.setSpectrum("#6aff14", "#ffdc14", "#ff8e14", "#ff1414");
//myCountryRainbow.setSpectrum("#ffeda0", "#feb24c", "#f03b20");
//myCountryRainbow.setSpectrum("#2b83ba", "#abdda4", "#ffffbf", "#fdae61", "#d7191c");
myCountryRainbow.setSpectrum("#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15");

const scaleValue = Math.pow(2, 10);

const ConnectorService = require('../ConnectorService');

let world_active_per_million = undefined;


const getWorldDataFromApiAsync = async () => {
    try {
        world_active_per_million = await ConnectorService.getCountriesActivePerMillion();
    } catch (error) {
        console.error("[ERROR-ColorService]: " + error);
    }
};
getWorldDataFromApiAsync();
console.log("[INFO-ColorService]: world_active_per_million=" + world_active_per_million);

const colorSpectrum = (value) => {
    return "#" + myCountryRainbow.colorAt(value);
}

const colorSpectrumByCountryKey = (key) => {
    try {
        let value = world_active_per_million.countries[key] / world_active_per_million["max"];
        console.log(Math.log2(1 + scaleValue * value));
        return colorSpectrum(Math.log2(1 + scaleValue * value));
    }
    catch (TypeError) {
        return "#ffffff"
    }
}

module.exports = {
    "colorSpectrumByCountryKey": colorSpectrumByCountryKey,
}
