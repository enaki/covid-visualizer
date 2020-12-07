let Rainbow = require('rainbowvis.js');
const { min } = require('react-native-reanimated');
let myRainbow = new Rainbow();
myRainbow.setNumberRange(0, 10);
myRainbow.setSpectrum("#6aff14", "#ffdc14", "#ff8e14", "#ff1414");

const scaleValue = Math.pow(2, 10);

const ConnectorService = require('./ConnectorService');

let active_per_million = undefined;

const getMoviesFromApiAsync = async () => {
    try {
        active_per_million = await ConnectorService.getCountriesActivePerMillion();
    } catch (error) {
        console.error("[ERROR-ColorService]: " + error);
    }
};
getMoviesFromApiAsync();
console.log("[INFO-ColorService]: active_per_million=" + active_per_million);

const randomColor = () => {

    let letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

const colorSpectrum = (value) => {
    return "#" + myRainbow.colorAt(value);
}

const colorSpectrumByCountryKey = (key) => {
    try {
        let value = active_per_million.countries[key] / active_per_million["max"];
        console.log(Math.log2(1 + scaleValue * value));
        return colorSpectrum(Math.log2(1 + scaleValue * value));
    }
    catch (TypeError) {
        return "#ffffff"
    }
}


module.exports = {
    "randomColor": randomColor,
    "colorSpectrum": colorSpectrum,
    "colorSpectrumByCountryKey": colorSpectrumByCountryKey
}
