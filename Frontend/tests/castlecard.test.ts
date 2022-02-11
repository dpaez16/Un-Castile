import { CastleCardSuit, CastleCardValue, createCastleDeck } from '../src/Classes/CastleCard';

test('Deck creation works', () => {
    const deck = createCastleDeck();
    expect(deck.length).toEqual(CastleCardValue.__LENGTH * CastleCardSuit.__LENGTH);

    for (let i = 0; i < CastleCardSuit.__LENGTH; i++) {
        const cards = deck.filter((card) => card.suit === i && card.value >= 0 && card.value < CastleCardValue.__LENGTH).map((card) => card.toString());
        const cardsSet = new Set(cards);

        expect(cardsSet.size).toEqual(CastleCardValue.__LENGTH);
    }

    for (let i = 0; i < CastleCardValue.__LENGTH; i++) {
        const cards = deck.filter((card) => card.value === i && card.suit >= 0 && card.suit < CastleCardSuit.__LENGTH).map((card) => card.toString());
        const cardsSet = new Set(cards);

        expect(cardsSet.size).toEqual(CastleCardSuit.__LENGTH);
    }

    for (let card of deck) {
        expect(card.faceUp).toEqual(false);
    }

    expect(deck.sort((a, b) => a.comp(b)).length).toEqual(deck.length);
});