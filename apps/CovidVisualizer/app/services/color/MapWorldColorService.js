let Rainbow = require('../../../node_modules/rainbowvis.js/rainbowvis');

const scaleValue = Math.pow(2, 10);


class WorldColorService {
    constructor(props) {
        let myCountryRainbow = new Rainbow();
        myCountryRainbow.setNumberRange(0, 10);
        myCountryRainbow.setSpectrum("#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15");

        this.world_active_per_million = {};
    }

    setData(data) {
        this.world_active_per_million = data;
    }

    getData() {
        return this.world_active_per_million;
    }

    colorSpectrum(value) {
        return "#" + this.myCountryRainbow.colorAt(value);
    }

    colorSpectrumByCountryKey(key) {
        try {
            let value = world_active_per_million.countries[key] / world_active_per_million["max"];
            //console.log(Math.log2(1 + scaleValue * value));
            return colorSpectrum(Math.log2(1 + scaleValue * value));
        }
        catch (TypeError) {
            return "#ffffff"
        }
    }
}


const worldColorService = new WorldColorService();
export default worldColorService;