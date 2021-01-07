let Rainbow = require('../../../node_modules/rainbowvis.js/rainbowvis');

class GenericColorService {
    constructor() {
        this.myRainbow = new Rainbow();
        this.myRainbow.setSpectrum("#8b0000", "#ff0000", "#d95f02", "#008000", "#0000ff", "#4b0082");

    }

    randomRainbowColor = () => {
        let value = Math.floor(Math.random() * 100);
        return "#" + this.myRainbow.colorAt(value);
    }

    randomColor = () => {
        let letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }


}

const genericColorService = new GenericColorService();
export default genericColorService;