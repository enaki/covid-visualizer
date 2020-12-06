var Rainbow = require('rainbowvis.js');
const { min } = require('react-native-reanimated');
var myRainbow = new Rainbow();
myRainbow.setNumberRange(0, 100);
myRainbow.setSpectrum("#6aff14", "#ffdc14", "#ff8e14", "#ff1414");

const ConnectorService = require('./ConnectorService')

var active_per_million = undefined

const getMoviesFromApiAsync = async () => {
    try {
        active_per_million = await ConnectorService.getCountriesActivePerMillion();
        console.log(active_per_million);
        return active_per_million;
    } catch (error) {
        console.error(error);
    }
};
getMoviesFromApiAsync();
console.log(active_per_million);

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
