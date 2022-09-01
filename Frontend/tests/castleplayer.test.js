const { CastleGame } = require('../src/Classes/CastleGame');
const { CastlePlayer } = require('../src/Classes/CastlePlayer');

test("CastlePlayer JSON serialization + deserialization", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);

    const player = game.getPlayer(0);
    const playerJSONStr = JSON.stringify(player);
    const deserializedPlayer = CastlePlayer.decode(JSON.parse(playerJSONStr));

    expect(deserializedPlayer.castleDown).toEqual(player.castleDown);
    expect(deserializedPlayer.castleUp).toEqual(player.castleUp);
    expect(deserializedPlayer.castleHand).toEqual(player.castleHand);
    expect(deserializedPlayer.touchedCastle).toEqual(player.touchedCastle);
});