let Rainbow = require('../../../node_modules/rainbowvis.js/rainbowvis');

class RoCountyColor {

    constructor(props) {
        this.myROCountyRainbow = new Rainbow();
        this.myROCountyRainbow.setNumberRange(0, 100);
        this.myROCountyRainbow.setSpectrum("#fee5d9", "#fcae91", "#fb6a4a", "#de2d26", "#a50f15");

        this.romania_actives_per_one_hundred = {};
    }

    setData(data) {
        this.romania_actives_per_one_hundred = data;
    }

    getData() {
        return this.romania_actives_per_one_hundred;
    }

    colorSpectrum(value) {
        return "#" + this.myROCountyRainbow.colorAt(value);
    }

    colorSpectrumByROCountyKey(key) {
        try {
            let value = this.romania_actives_per_one_hundred["counties"][key] / this.romania_actives_per_one_hundred["max"];
            //console.log(100 * value);
            return this.colorSpectrum(100 * value);
        }
        catch (TypeError) {
            console.log("TypeError");
            return "#ffffff";
        }
    }
}


const roCountyColorService = new RoCountyColor();
export default roCountyColorService;


