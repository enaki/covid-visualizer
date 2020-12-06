let Rainbow = require('rainbowvis.js');
const { min } = require('react-native-reanimated');
let myRainbow = new Rainbow();
myRainbow.setNumberRange(0, 100);
myRainbow.setSpectrum("#6aff14", "#ffdc14", "#ff8e14", "#ff1414");

const ConnectorService = require('./ConnectorService');

let active_per_million = undefined;

const getMoviesFromApiAsync = async () => {
    try {
        active_per_million = await ConnectorService.getCountriesActivePerMillion();
        console.log("[INFO-ColorService]: active_per_million=" + active_per_million);
        return active_per_million;
    } catch (error) {
        console.error("[ERROR-ColorService]: " + error);
    }
};
getMoviesFromApiAsync().then(r => {});
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

const ColorService = {
    "randomColor": randomColor,
    "colorSpectrum": colorSpectrum
}


module.exports = {
    "randomColor": randomColor,
    "colorSpectrum": colorSpectrum
}
