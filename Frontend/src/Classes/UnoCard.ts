enum UnoCardType {
    Number,
    Action,
    __LENGTH
};

enum UnoCardColor {
    Red,
    Blue,
    Green,
    Yellow,
    Black,
    __LENGTH
};

enum UnoCardNumber {
    Zero,
    One,
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    __LENGTH
};

enum UnoCardAction {
    DrawTwo,
    Skip,
    Reverse,
    ChangeColor,
    DrawFour,
    __LENGTH
};

class UnoCard {
    color: UnoCardColor;
    type: UnoCardType;
    value: any;
    faceUp: boolean;

    constructor(cardColor: UnoCardColor, cardType: UnoCardType, cardValue: any) {
        this.color = cardColor;
        this.type = cardType;
        this.value = cardValue;
        this.faceUp = false;
    }

    flipCard() {
        this.faceUp = !this.faceUp;
    }

    equals(rhs: UnoCard) {
        return this.color === rhs.color && this.type === rhs.type && this.value === rhs.value;
    }

    lt(rhs: UnoCard) {
        if (this.type < rhs.type) return true;
        if (this.type > rhs.type) return false;

        if (this.color == rhs.color) return this.value < rhs.value;
        return this.color < rhs.color;
    }

    comp(rhs: UnoCard) {
        if (this.equals(rhs)) return 0;

        return this.lt(rhs) ? -1 : 1;
    }

    isProper() {
        if (this.type == UnoCardType.Number) {
            return this.color !== UnoCardColor.Black;
        }

        if (this.color === UnoCardColor.Black) {
            return this.value === UnoCardAction.DrawFour || this.value === UnoCardAction.ChangeColor;
        }

        return this.value !== UnoCardAction.DrawFour && this.value !== UnoCardAction.ChangeColor;
    }

    toString() {
        let cardValue = this.type == UnoCardType.Number ? UnoCardNumber[this.value] : UnoCardAction[this.value];
        return `[${UnoCardColor[this.color]} - ${cardValue}]`
    }
};

function createUnoDeck() {
    var deck: Array<UnoCard> = [];

    for (let it = 0; it < 2; it++) {
        for (let i = 0; i < UnoCardColor.__LENGTH; i++) {
            for (let j = 0; j < UnoCardNumber.__LENGTH; j++) {
                const unoCard = new UnoCard(i, UnoCardType.Number, j);
                deck.push(unoCard);
            }
        }

        for (let i = 0; i < UnoCardColor.__LENGTH; i++) {
            for (let j = 0; j < UnoCardAction.__LENGTH; j++) {
                const unoCard = new UnoCard(i, UnoCardType.Action, j);
                deck.push(unoCard);
            }
        }

        deck.push(new UnoCard(UnoCardColor.Black, UnoCardType.Action, UnoCardAction.ChangeColor));
        deck.push(new UnoCard(UnoCardColor.Black, UnoCardType.Action, UnoCardAction.DrawFour));
    }

    deck = deck.filter(card => card.type !== UnoCardType.Number || card.value !== UnoCardNumber.Zero);

    for (let i = 0; i < UnoCardColor.__LENGTH; i++) {
        deck.push(new UnoCard(i, UnoCardType.Number, UnoCardNumber.Zero));
    }

    deck = deck.sort((lhs, rhs) => lhs.comp(rhs));
    deck = deck.filter(card => card.isProper());
    return deck;
};

export { UnoCardType, UnoCardColor, UnoCardNumber, UnoCardAction, UnoCard, createUnoDeck };