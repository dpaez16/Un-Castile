const { UnoCardType, UnoCardColor, UnoCardNumber, UnoCardAction, UnoCard, createUnoDeck } = require('../src/Classes/UnoCard');

test('Deck creation works', () => {
    const deck = createUnoDeck();
    expect(deck.length).toEqual(108);

    const blackNumberCards = deck.filter((card) => card.color.numVal === UnoCardColor.Black.numVal && card.type.numVal === UnoCardType.Number.numVal);
    expect(blackNumberCards.length).toEqual(0);

    for (let card of deck) {
        expect(card.isProper()).toEqual(true);
        expect(card.faceUp).toEqual(false);
    }

    const blackCards = deck.filter((card) => card.color.numVal == UnoCardColor.Black.numVal && card.type.numVal == UnoCardType.Action.numVal);
    const draw4Cards = blackCards.filter((card) => card.value.numVal == UnoCardAction.DrawFour.numVal);
    const changeColorCards = blackCards.filter((card) => card.value.numVal == UnoCardAction.ChangeColor.numVal);
    expect(draw4Cards.length).toEqual(4);
    expect(changeColorCards.length).toEqual(4);

    const zeroCards = deck.filter((card) => card.value.numVal == UnoCardNumber.Zero.numVal && card.type.numVal == UnoCardType.Number.numVal);
    expect(zeroCards.length).toEqual(4);

    for (let cardNumber of UnoCardNumber.AllCases()) {
        if (cardNumber.numVal === UnoCardNumber.Zero.numVal) continue;

        const cards = deck.filter((card) => card.type.numVal == UnoCardType.Number.numVal && card.value.numVal == cardNumber.numVal)
                        .filter((card) => card.color.numVal !== UnoCardColor.Black.numVal);

        // cards 1-9 appear 8 times
        expect(cards.length).toEqual(8);

        for (let cardColor of UnoCardColor.AllCases()) {
            if (cardColor.numVal == UnoCardColor.Black.numVal) continue;
            
            // cards 1-9 for each non-black color appears 2 times
            const filteredCards = cards.filter((card) => card.color.numVal == cardColor.numVal);
            expect(filteredCards.length).toEqual(2);
        }
    }

    for (let cardAction of UnoCardAction.AllCases()) {
        if (cardAction.numVal == UnoCardAction.DrawFour.numVal || cardAction.numVal == UnoCardAction.ChangeColor.numVal) continue;

        const cards = deck.filter((card) => card.type.numVal == UnoCardType.Action.numVal && card.value.numVal == cardAction.numVal)
                        .filter((card) => card.color.numVal !== UnoCardColor.Black.numVal);

        // each non-black action card appears 8 times
        expect(cards.length).toEqual(8);
        for (let cardColor of UnoCardColor.AllCases()) {
            if (cardColor.numVal == UnoCardColor.Black.numVal) continue;
            
            // each action card for each non-black color appears 2 times
            const filteredCards = cards.filter((card) => card.color.numVal == cardColor.numVal);
            expect(filteredCards.length).toEqual(2);
        }
    }
});

test("AllCases().length matching Length()", () => {
    expect(UnoCardType.AllCases().length).toEqual(UnoCardType.Length());
    expect(UnoCardColor.AllCases().length).toEqual(UnoCardColor.Length());
    expect(UnoCardAction.AllCases().length).toEqual(UnoCardAction.Length());
    expect(UnoCardNumber.AllCases().length).toEqual(UnoCardNumber.Length());
});

test("flipCard() test", () => {
    const unoCard = new UnoCard(UnoCardColor.Red, UnoCardType.Number, UnoCardNumber.Zero);
    expect(unoCard.faceUp).toEqual(false);

    unoCard.flipCard();
    expect(unoCard.faceUp).toEqual(true);
});