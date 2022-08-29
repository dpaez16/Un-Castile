class CastleCardSuit {
    static Hearts = new CastleCardSuit('Hearts', 0);
    static Diamonds = new CastleCardSuit('Diamonds', 1);
    static Clubs = new CastleCardSuit('Clubs', 2);
    static Spades = new CastleCardSuit('Spades', 3);

    constructor(name, numVal) {
        this.name = name;
        this.numVal = numVal;
    }

    /**
     * Returns all possible `CastleCardSuit` values.
     * @returns {array} Array of `CastleCardSuit` values
     */
    static AllCases() {
        return Object.keys(CastleCardSuit).map((suit) => CastleCardSuit[suit]);
    }

    /**
     * Returns number of `CastleCardSuit` values.
     * @returns {number} Number of `CastleCardSuit` values
     */
    static Length() {
        return CastleCardSuit.AllCases().length;
    }

    toString() {
        return `[${this.name}]`;
    }
};

class CastleCardValue {
    static Two = new CastleCardValue('Two', 2);
    static Three = new CastleCardValue('Three', 3);
    static Four = new CastleCardValue('Four', 4);
    static Five = new CastleCardValue('Five', 5);
    static Six = new CastleCardValue('Six', 6);
    static Seven = new CastleCardValue('Seven', 7);
    static Eight = new CastleCardValue('Eight', 8);
    static Nine = new CastleCardValue('Nine', 9);
    static Ten = new CastleCardValue('Ten', 10);
    static Jack = new CastleCardValue('Jack', 11);
    static Queen = new CastleCardValue('Queen', 12);
    static King = new CastleCardValue('King', 13);
    static Ace = new CastleCardValue('Ace', 14);

    constructor(name, numVal) {
        this.name = name;
        this.numVal = numVal;
    }

    /**
     * Returns all possible `CastleCardValue` values.
     * @returns {array} Array of `CastleCardValue` values
     */
    static AllCases() {
        return Object.keys(CastleCardValue).map((cardValue) => CastleCardValue[cardValue]);
    }
    
    /**
     * Returns number of `CastleCardValue` values.
     * @returns {number} Number of `CastleCardValue` values
     */
    static Length() {
        return CastleCardValue.AllCases().length;
    }

    toString() {
        return `${this.name}`;
    }
};

class CastleCard {
    constructor(cardSuit, cardValue) {
        this.suit = cardSuit;
        this.value = cardValue;
        this.faceUp = false;
    }

    /**
     * Flips card over.
     */
    flipCard() {
        this.faceUp = !this.faceUp;
    }

    /**
     * Performs a deep equality check with another card.
     * @param {CastleCard} rhs - Other card to be compared with
     * @returns {boolean} True if the current card is equal to the other card
     */
    equals(rhs) {
        return this.suit.numVal === rhs.suit.numVal && this.value.numVal === rhs.value.numVal;
    }

    /**
     * Performs a "less than" comparasion check with another card.
     * @param {CastleCard} rhs - Other card to be compared with
     * @returns {boolean} True if the current card is "less than" the other card
     */
    lt(rhs) {
        if (this.suit.numVal === rhs.suit.numVal) return this.value.numVal < rhs.value.numVal;

        return this.suit.numVal < rhs.suit.numVal;
    }

    /**
     * Performs a comparasion check with another card.
     * 
     * Returns 0 if the current card is equal to the other card.
     * 
     * Returns -1 if the current card is "less than" the other card.

     * Returns 1 if the current card is "greater than" the other card.
     * @param {CastleCard} rhs - Other card to be compared with
     * @returns {number} 0 if thisCard.equals(rhs), -1 if thisCard.lt(rhs), otherwise 1
     */
    comp(rhs) {
        if (this.equals(rhs)) return 0;

        return this.lt(rhs) ? -1 : 1;
    }

    toString() {
        return `[${this.value.toString()} - ${this.suit.toString()}]`;
    }
};

function createCastleDeck() {
    var deck = [];

    for (let suit of CastleCardSuit.AllCases()) {
        for (let cardValue of CastleCardValue.AllCases()) {
            const castleCard = new CastleCard(suit, cardValue);
            deck.push(castleCard);
        }
    }

    return deck;
};

module.exports = { CastleCard, CastleCardSuit, CastleCardValue, createCastleDeck };