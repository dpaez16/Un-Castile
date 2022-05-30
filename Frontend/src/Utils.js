const seedrandom = require('seedrandom');

class RNG {
    constructor(seed) {
        this.seed = seed;
        this.generator = seed !== undefined ? seedrandom(seed) : Math.random;
    }

    random() {
        return this.generator();
    }
};

function shuffleArray(array, rng) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

function getStyleDict(style, filePath) {
    let backgroundImageStyle = {
        "backgroundImage": `url(${filePath})`
    };

    return {...style, ...backgroundImageStyle};
};

module.exports = { RNG, shuffleArray, getStyleDict };