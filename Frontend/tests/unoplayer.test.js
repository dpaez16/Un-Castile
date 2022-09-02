const { UnoPlayer } = require('../src/Classes/UnoPlayer');
const { UnoGame } = require('../src/Classes/UnoGame');

test("UnoPlayer JSON serialization + deserialization", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new UnoGame(numPlayers, seed);

    const player = game.getPlayer(0);
    const playerJSONStr = JSON.stringify(player);
    const deserializedPlayer = UnoPlayer.decode(JSON.parse(playerJSONStr));

    expect(deserializedPlayer.getCards()).toEqual(player.getCards());
    expect(deserializedPlayer.getDrawEvent()).toEqual(player.getDrawEvent());
});