const { RNG, getStyleDict } = require('../src/Utils');

test("RNG with undefined seed", () => {
    var rng = new RNG(undefined);
    expect(rng.generator() < 1).toBe(true);

    rng = new RNG("1234567890");
    expect(rng.generator() < 1).toBe(true);
});

test("getStyleDict appends style dict", () => {
    const style = {a: 0};
    const [height, width] = [1, 2];
    const filePath = "/filePath";

    const styleDict = getStyleDict(style, height, width, filePath);
    const expectedStyleDict = {
        "backgroundImage": `url(${filePath})`,
        "height": `${height}px`,
        "width": `${width}px`,
        ...style
    };

    expect(styleDict).toEqual(expectedStyleDict);
});