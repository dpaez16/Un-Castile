const { CastleCard, CastleCardSuit, CastleCardValue, createCastleDeck } = require('../src/Classes/CastleCard');


test('Deck creation works', () => {
    const deck = createCastleDeck();
    expect(deck.length).toEqual(CastleCardValue.Length() * CastleCardSuit.Length());

    for (let suit of CastleCardSuit.AllCases()) {
        const cards = deck.filter((card) => card.suit.numVal === suit.numVal).map((card) => card.toJSON());
        const cardsSet = new Set(cards);

        expect(cardsSet.size).toEqual(CastleCardValue.Length());
    }

    for (let cardValue of CastleCardValue.AllCases()) {
        const cards = deck.filter((card) => card.value.numVal === cardValue.numVal).map((card) => card.toJSON());
        const cardsSet = new Set(cards);

        expect(cardsSet.size).toEqual(CastleCardSuit.Length());
    }

    for (let card of deck) {
        expect(card.faceUp).toEqual(false);
    }

    expect(deck.sort((a, b) => a.comp(b)).length).toEqual(deck.length);
});

test("flipCard() test", () => {
    const castleCard = new CastleCard(CastleCardSuit.Hearts, CastleCardValue.Ace);
    expect(castleCard.faceUp).toEqual(false);

    castleCard.flipCard();
    expect(castleCard.faceUp).toEqual(true);
});

test("comp() test", () => {
    const cardA = new CastleCard(CastleCardSuit.Hearts, CastleCardValue.Ace);
    const cardB = new CastleCard(CastleCardSuit.Hearts, CastleCardValue.Two);
    const cardC = new CastleCard(CastleCardSuit.Diamonds, CastleCardValue.Two);

    expect(cardA.comp(cardB)).toEqual(1);
    expect(cardB.comp(cardA)).toEqual(-1);
    expect(cardA.comp(cardA)).toEqual(0);

    expect(cardA.comp(cardC)).toEqual(-1);
});

test("CastleCard JSON serialization + deserialization", () => {
    const deck = createCastleDeck();
    const deckJSONStr = JSON.stringify(deck);
    const deserializedDeck = JSON.parse(deckJSONStr).map(e => CastleCard.decode(e));

    expect(deserializedDeck).toEqual(deck);
});
