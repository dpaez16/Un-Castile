const { UnoCardType, UnoCardColor, UnoCardNumber, UnoCardAction } = require('../src/Classes/UnoCard');
const { UnoGame } = require('../src/Classes/UnoGame');

test('Uno game deck creation', () => {
    const numPlayers = 4;
    const seed = '12345';
    let unoGame = new UnoGame(numPlayers, seed);
    const deck = unoGame.getDeck();
    
    // cards are dealt to players and initial starting card is dealt
    expect(deck.length).toEqual(108 - UnoGame.HAND_SIZE * numPlayers - 1);
    
    // all cards in deck are always face down
    const filteredDeck = deck.filter((card) => !card.faceUp);
    expect(filteredDeck.length).toEqual(deck.length);
});

test('Uno game delete player', () => {
    const numPlayers = 4;
    const seed = '12345';
    let unoGame = new UnoGame(numPlayers, seed);
    
    expect(unoGame.getPlayedCards().length).toEqual(1);
    expect(unoGame.getPlayedCards().filter((card) => card.faceUp).length).toEqual(unoGame.getPlayedCards().length);
    unoGame.removePlayer(0);

    expect(unoGame.getPlayedCards().length).toEqual(1 + UnoGame.HAND_SIZE);
    expect(unoGame.getPlayedCards().filter((card) => card.faceUp).length).toEqual(unoGame.getPlayedCards().length);
});

test('Uno game test', () => {
    const numPlayers = 4;
    const seed = '12345';
    let unoGame = new UnoGame(numPlayers, seed);

    for (let i = 0; i < numPlayers; i++) {
        const cards = unoGame.getPlayerHand(i);
        
        expect(unoGame.hasCards(i)).toEqual(true);

        expect(cards.length).toEqual(UnoGame.HAND_SIZE);
        expect(unoGame.players[i].handSize()).toEqual(UnoGame.HAND_SIZE);
        
        expect(cards.filter((card) => card.faceUp).length).toEqual(cards.length);

        expect(unoGame.players[i].hasDrawEvent()).toEqual(false);
        expect(unoGame.players[i].getDrawEvent()).toEqual(0);
    }

    expect(unoGame.getPlayedCards().length).toEqual(1);
    expect(unoGame.getPlayedCards()[0].type.numVal).toEqual(UnoCardType.Number.numVal);
    expect(unoGame.isLegalMove(0, 0)).toEqual(true);
    
    unoGame.placeCard(0, 0);
    expect(unoGame.hasCards(0)).toEqual(true);
    expect(unoGame.getPlayerHand(0).length).toEqual(UnoGame.HAND_SIZE - 1);
    expect(unoGame.getPlayedCards().length).toEqual(2);
    expect(unoGame.getPlayedCards().filter((card) => card.faceUp).length).toEqual(2);

    for (let i = 1; i < numPlayers; i++) {
        expect(unoGame.hasCards(i)).toEqual(true);
        expect(unoGame.getPlayerHand(i).length).toEqual(UnoGame.HAND_SIZE);
    }

    unoGame.drawCard(1);
    expect(unoGame.hasCards(1)).toEqual(true);
    expect(unoGame.getPlayerHand(1).length).toEqual(UnoGame.HAND_SIZE + 1);
});

test("Uno draw events test", () => {
    const numPlayers = 4;
    const seed = '12345';
    let unoGame = new UnoGame(numPlayers, seed);

    expect(unoGame.players[0].hasDrawEvent()).toEqual(false);
    expect(unoGame.players[0].getDrawEvent()).toEqual(0);

    unoGame.players[0].setDrawEvent(UnoCardAction.DrawFour);
    expect(unoGame.players[0].hasDrawEvent()).toEqual(true);
    expect(unoGame.players[0].getDrawEvent()).toEqual(4);

    unoGame.players[0].clearDrawEvent();
    expect(unoGame.players[0].hasDrawEvent()).toEqual(false);
    expect(unoGame.players[0].getDrawEvent()).toEqual(0);
});
