const { UnCastileGame } = require('../src/Classes/UnCastileGame');
const { UnCastilePlayer } = require('../src/Classes/UnCastilePlayer');

test("UnCastilePlayer getMetadata + setMetadata", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const metadata = [{name: "a"}, {name: "b"}, {name: "c"}, {name: "d"}];
    const game = new UnCastileGame(numPlayers, metadata, seed);

    for (let i = 0; i < numPlayers; i++) {
        const player = game.players[i];
        expect(player.getMetadata()).toEqual(metadata[i]);

        player.setValue("name", 0);
        expect(player.getMetadata().name).toEqual(0);
    }
});

test("UnCastilePlayer JSON serialization + deserialization", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const metadata = [{name: "a"}, {name: "b"}, {name: "c"}, {name: "d"}];
    const game = new UnCastileGame(numPlayers, metadata, seed);

    const player = game.players[0];
    const playerJSONStr = JSON.stringify(player);
    const deseralizedPlayer = UnCastilePlayer.decode(JSON.parse(playerJSONStr));

    expect(deseralizedPlayer.getMetadata()).toEqual(player.getMetadata())
});