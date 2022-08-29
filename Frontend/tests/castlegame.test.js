const { CastleGame } = require('../src/Classes/CastleGame');

test('Castle game init', () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);

    expect(game.castlePrepDone).toEqual(false);
    expect(game.getPlayedCards().length).toEqual(0);
    expect(game.players.length).toEqual(4);
    expect(game.isCastlePrepPhaseOpen()).toEqual(true);

    for (let i = 0; i < 4; i++) {
        const player = game.getPlayer(i);
        expect(player.emptiedHandBefore()).toEqual(false);
        expect(player.getCastleDownCards().length).toEqual(3);
        expect(player.getCastleUpCards().length).toEqual(0);
        expect(player.castleHandSize()).toEqual(6);
        expect(player.hasCards()).toEqual(true);
    }
});