import seedrandom from 'seedrandom';

class RNG {
    generator: any;
    seed: string;

    constructor(seed: string) {
        this.seed = seed;
        this.generator = seedrandom(seed);
    }

    random() {
        return this.generator();
    }
};

function shuffleArray(array: Array<any>, rng: RNG): void {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(rng.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
};

export { RNG, shuffleArray };