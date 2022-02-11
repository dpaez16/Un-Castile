import { UnoCardType, UnoCardColor, UnoCardNumber, UnoCardAction, createUnoDeck } from '../src/Classes/UnoCard';

test('Deck creation works', () => {
    const deck = createUnoDeck();
    expect(deck.length).toEqual(108);

    for (let card of deck) {
        expect(card.isProper()).toEqual(true);
        expect(card.faceUp).toEqual(true);
    }

    const blackCards = deck.filter((card) => card.color == UnoCardColor.Black && card.type == UnoCardType.Action);
    const draw4Cards = blackCards.filter((card) => card.value == UnoCardAction.DrawFour);
    const changeColorCards = blackCards.filter((card) => card.value == UnoCardAction.ChangeColor);
    expect(draw4Cards.length).toEqual(4);
    expect(changeColorCards.length).toEqual(4);

    const zeroCards = deck.filter((card) => card.value == UnoCardNumber.Zero && card.type == UnoCardType.Number);
    expect(zeroCards.length).toEqual(4);

    for (let i = UnoCardNumber.One; i < UnoCardNumber.__LENGTH; i++) {
        const cards = deck.filter((card) => card.type == UnoCardType.Number && card.value == i)
                        .filter((card) => card.color >= 0 && card.color < UnoCardColor.__LENGTH && card.color !== UnoCardColor.Black);

        expect(cards.length).toEqual(8);
        for (let i = 0; i < UnoCardColor.__LENGTH; i++) {
            if (i == UnoCardColor.Black) continue;
            
            const filteredCards = cards.filter((card) => card.color == i);
            expect(filteredCards.length).toEqual(2);
        }
    }

    for (let i = 0; i < UnoCardAction.__LENGTH; i++) {
        if (i == UnoCardAction.DrawFour || i == UnoCardAction.ChangeColor) continue;

        const cards = deck.filter((card) => card.type == UnoCardType.Action && card.value == i)
                        .filter((card) => card.color >= 0 && card.color < UnoCardColor.__LENGTH && card.color !== UnoCardColor.Black);

        expect(cards.length).toEqual(8);
        for (let i = 0; i < UnoCardColor.__LENGTH; i++) {
            if (i == UnoCardColor.Black) continue;
            
            const filteredCards = cards.filter((card) => card.color == i);
            expect(filteredCards.length).toEqual(2);
        }
    }
});