let Rainbow = require('../../../node_modules/rainbowvis.js/rainbowvis');


class WorldColorService {
    constructor(props) {
        this.scaleValue = Math.pow(2, 10);
        this.myCountryRainbow = new Rainbow();
        this.myCountryRainbow.setNumberRange(0, 10);
        this.myCountryRainbow.setSpectrum("#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15");

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
            let value = this.world_active_per_million["countries"][key] / this.world_active_per_million["max"];
            //console.log(Math.log2(1 + scaleValue * value));
            return this.colorSpectrum(Math.log2(1 + this.scaleValue * value));
        }
        catch (TypeError) {
            return "#ffffff"
        }
    }
}


const worldColorService = new WorldColorService();
export default worldColorService;
