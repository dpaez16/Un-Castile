const seedrandom = require('seedrandom');

class RNG {
    constructor(seed) {
        this.seed = seed;
        this.generator = seedrandom(seed);
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

module.exports = { RNG, shuffleArray };