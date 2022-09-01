const { UnCastileGame } = require('../src/Classes/UnCastileGame');

test("UnCastileGame serialization + deserialization", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const metadata = [{name: "a"}, {name: "b"}, {name: "c"}, {name: "d"}];
    const game = new UnCastileGame(numPlayers, metadata, seed);
    
    const gameJSONStr = JSON.stringify(game);
    const deserializedGame = UnCastileGame.decode(JSON.parse(gameJSONStr));

    expect(deserializedGame.seed).toEqual(game.seed);
    expect(deserializedGame.unoGame.toJSON()).toEqual(game.unoGame.toJSON());
    expect(deserializedGame.castleGame.toJSON()).toEqual(game.castleGame.toJSON());
    expect(deserializedGame.playerNum).toEqual(game.playerNum);
    expect(deserializedGame.players).toEqual(game.players);
    expect(deserializedGame.playerDirection).toEqual(game.playerDirection);
});