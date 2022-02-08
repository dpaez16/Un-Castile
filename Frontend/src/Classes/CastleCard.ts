enum CastleCardSuit {
    Heart,
    Diamonds,
    Clubs,
    Spades,
    __LENGTH
};

enum CastleCardValue {
    Two,
    Three,
    Four,
    Five,
    Six,
    Seven,
    Eight,
    Nine,
    Ten,
    Jack,
    Queen,
    King,
    Ace,
    __LENGTH
};

class CastleCard {
    suit: CastleCardSuit;
    value: CastleCardValue;

    constructor(cardSuit: CastleCardSuit, cardValue: CastleCardValue) {
        this.suit = cardSuit;
        this.value = cardValue;
    }

    equals(rhs: CastleCard) {
        return this.suit === rhs.suit && this.value === rhs.value;
    }

    lt(rhs: CastleCard) {
        if (this.suit < rhs.suit) return true;
        if (this.suit > rhs.suit) return false;

        return this.value < rhs.value;
    }

    comp(rhs: CastleCard) {
        if (this.equals(rhs)) return 0;

        return this.lt(rhs) ? -1 : 1;
    }

    toString() {
        return `[${CastleCardValue[this.value]} - ${CastleCardSuit[this.suit]}]`
    }

    isWildCard() {
        if (this.value == CastleCardValue.Two) return true;
        if (this.value == CastleCardValue.Seven) return true;
        if (this.value == CastleCardValue.Ten) return true;

        return false;
    }
};

function createCastleDeck() {
    var deck: Array<CastleCard> = [];

    for (let i = 0; i < CastleCardSuit.__LENGTH; i++) {
        for (let j = 0; j < CastleCardValue.__LENGTH; j++) {
            const castleCard = new CastleCard(i, j);
            deck.push(castleCard);
        }
    }

    return deck;
};

export { CastleCard, createCastleDeck };