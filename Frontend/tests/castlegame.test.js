const { CastleGame } = require('../src/Classes/CastleGame');
const { CastleCardSuit, CastleCardValue } = require('../src/Classes/CastleCard');

test('Castle game init', () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const totalNumCards = CastleCardSuit.Length() * CastleCardValue.Length();

    expect(game.castlePrepDone).toEqual(false);
    expect(game.getPlayedCards().length).toEqual(0);
    expect(game.players.length).toEqual(numPlayers);
    expect(game.isCastlePrepPhaseOpen()).toEqual(true);
    expect(game.getDiscardPile().length).toEqual(0);
    expect(game.deckSize()).toEqual(totalNumCards - numPlayers * (CastleGame.CASTLE_DOWN_SIZE + CastleGame.CASTLE_UP_SIZE + CastleGame.CASTLE_HAND_SIZE));
    expect(game.valueDirection > 0);

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        expect(player.emptiedHandBefore()).toEqual(false);
        expect(player.getCastleDownCards().length).toEqual(CastleGame.CASTLE_DOWN_SIZE);
        expect(player.getCastleUpCards().length).toEqual(0);
        expect(player.castleHandSize()).toEqual(CastleGame.CASTLE_UP_SIZE + CastleGame.CASTLE_HAND_SIZE);
        expect(game.hasCards(i)).toEqual(true);
    }
});

test("CastleGame assigning cards", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        const originalHand = player.getCastleHandCards();
        const assignedCards = idxs.map(idx => originalHand[idx]);

        game.assignCastleUpCards(i, idxs);
        expect(player.getCastleUpCards().length).toEqual(CastleGame.CASTLE_UP_SIZE);
        expect(player.castleHandSize()).toEqual(CastleGame.CASTLE_HAND_SIZE);
        expect(player.getCastleUpCards()).toEqual(assignedCards);
        expect(player.hasCards()).toEqual(true);
    }
});

test("CastleGame prep phase", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);

    expect(game.isCastlePrepPhaseOpen()).toEqual(true);
    
    game.closeCastlePrepPhase();
    
    expect(game.isCastlePrepPhaseOpen()).toEqual(false);
});

test("CastleGame remove player", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        player.assignCastleUpCards(idxs);
    }

    const player = game.getPlayer(0);
    const cards = player.getCastleDownCards().concat(player.getCastleUpCards()).concat(player.getCastleHandCards());

    game.removePlayer(0);
    expect(game.getDiscardPile()).toEqual(cards);
});

test("CastleGame value direction", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const newValueDirection = -1;

    expect(game.valueDirection > 0);
    game.setValueDirection(newValueDirection);
    expect(game.valueDirection).toEqual(newValueDirection);
});

test("CastleGame isWildCard", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);

    for (let i = 0; i < 5; i++) game.drawCard();

    const card = game.drawCard();
    expect(game.isWildCard(card)).toEqual(true);
});

test("CastleGame empty hand", () => {
    const numPlayers = 2;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        const originalHand = player.getCastleHandCards();
        const assignedCards = idxs.map(idx => originalHand[idx]);

        player.assignCastleUpCards(idxs);
    }

    for (let i = 0; i < CastleGame.CASTLE_HAND_SIZE - 1; i++) {
        game.playedCards = [];
        expect(game.isLegalCastleHandMove(0, 0)).toEqual(true);

        let card = game.players[0].getCastleHandCard(0);
        game.placeCardCastleHand(0, 0);
    
        expect(game.getPlayedCards().length).toEqual(1);
        expect(game.getPlayedCards()[0]).toEqual(card);
        expect(game.players[0].getCastleHandCards().length).toEqual(CastleGame.CASTLE_HAND_SIZE - i - 1);
    }

    game.playedCards = [];
    game.deck = [];
    game.placeCardCastleHand(0, 0);

    expect(game.players[0].emptiedHandBefore()).toEqual(true);
});

test("CastleGame placeCardCastleUp", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        player.assignCastleUpCards(idxs);
    }

    game.deck = [];

    expect(game.isLegalCastleUpMove(0, 0)).toEqual(true);
    let card = game.players[0].getCastleUpCard(0);
    game.placeCardCastleUp(0, 0);

    expect(game.playedCards[0]).toEqual(card);
    expect(game.players[0].getCastleUpCard(0)).toEqual(undefined);
});

test("CastleGame placeCastleCardDown", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        player.assignCastleUpCards(idxs);
    }

    game.deck = [];

    expect(game.isLegalCastleDownMove(0, 0)).toEqual(true);
    let card = game.players[0].getCastleDownCard(0);
    game.placeCardCastleDown(0, 0);

    expect(game.playedCards[0]).toEqual(card);
    expect(game.players[0].getCastleDownCard(0)).toEqual(undefined);

    expect(game.isLegalCastleDownMove(0, 2)).toEqual(true);
    
    card = game.players[0].getCastleDownCard(2);
    game.placeCardCastleDown(0, 2);

    expect(game.playedCards[1]).toEqual(card);
    expect(game.players[0].getCastleDownCard(2)).toEqual(undefined);

    expect(game.isLegalCastleDownMove(0, 1)).toEqual(false);
    card = game.players[0].getCastleDownCard(1);
    const expectedHand = [card].concat(game.playedCards).concat(game.players[0].getCastleHandCards()).sort((a, b) => a.comp(b));
    game.placeCardCastleDown(0, 1);

    expect(game.playedCards.length).toEqual(0);
    expect(game.players[0].getCastleDownCard(1)).toEqual(undefined);
    
    const actualHand = game.players[0].getCastleHandCards().sort((a, b) => a.comp(b));
    expect(game.players[0].getCastleHandCards()).toEqual(expectedHand);
    expect(game.players[0].getCastleHandCards().every(e => e.faceUp)).toEqual(true);
});

test("CastleGame blowUpPile", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        player.assignCastleUpCards(idxs);
    }

    game.placeCardCastleHand(0, 0);
    game.blowUpPile();
    
    expect(game.playedCards.length).toEqual(0);
    expect(game.discardPile.length).toEqual(1);
});

test("CastleGame drawExtraCards", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        player.assignCastleUpCards(idxs);
    }

    game.placeCardCastleHand(0, 0);
    game.placeCardCastleHand(0, 1);

    expect(game.players[0].getCastleHandCards().length).toEqual(CastleGame.CASTLE_HAND_SIZE - 2);
    
    game.drawExtraCards(0);

    expect(game.players[0].getCastleHandCards().length).toEqual(CastleGame.CASTLE_HAND_SIZE);
});

test("CastleGame backward value direction", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        player.assignCastleUpCards(idxs);
    }

    game.setValueDirection(-1);

    expect(game.isLegalCastleHandMove(0, 0)).toEqual(true);
    game.placeCardCastleHand(0, 0);
    expect(game.isLegalCastleHandMove(0, 0)).toEqual(true);
});

test("CastleGame serialization + deserialization", () => {
    const numPlayers = 4;
    const seed = 12345678590;
    const game = new CastleGame(numPlayers, seed);
    const idxs = [0, 2, 4];

    for (let i = 0; i < numPlayers; i++) {
        const player = game.getPlayer(i);
        player.assignCastleUpCards(idxs);
    }

    const gameJSONStr = JSON.stringify(game);
    const deserializedGame = CastleGame.decode(JSON.parse(gameJSONStr));

    expect(deserializedGame.deck).toEqual(game.deck);
    expect(deserializedGame.discardPile).toEqual(game.discardPile);
    expect(deserializedGame.playedCards).toEqual(game.playedCards);
    expect(deserializedGame.valueDirection).toEqual(game.valueDirection);
    expect(deserializedGame.castlePrepDone).toEqual(game.castlePrepDone);
    expect(deserializedGame.players).toEqual(game.players);
    expect(deserializedGame.seed).toEqual(game.seed);
});