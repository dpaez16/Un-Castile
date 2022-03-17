const { RNG } = require('../src/Utils');

test("RNG with undefined seed", () => {
    var rng = new RNG(undefined);
    expect(rng.generator() < 1).toBe(true);

    rng = new RNG("1234567890");
    expect(rng.generator() < 1).toBe(true);
});