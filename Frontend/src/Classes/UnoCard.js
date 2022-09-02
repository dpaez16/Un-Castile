class UnoCardType {
    static Number = new UnoCardType('Number', 0);
    static Action = new UnoCardType('Action', 1);

    constructor(name, numVal) {
        this.name = name;
        this.numVal = numVal;
    }

    /**
     * Returns all possible `UnoCardType` values.
     * @returns {array} Array of `UnoCardType` values
     */
    static AllCases() {
        return Object.keys(UnoCardType).map((cardType) => UnoCardType[cardType]);
    }

    /**
     * Returns number of `UnoCardType` values.
     * @returns {number} Number of `UnoCardType` values
     */
    static Length() {
        return UnoCardType.AllCases().length;
    }

    toJSON() {
        return `${this.name}`;
    }
};

class UnoCardColor {
    static Red = new UnoCardColor('Red', 0);
    static Blue = new UnoCardColor('Blue', 1);
    static Green = new UnoCardColor('Green', 2);
    static Yellow = new UnoCardColor('Yellow', 3);
    static Black = new UnoCardColor('Black', 4);

    constructor(name, numVal) {
        this.name = name;
        this.numVal = numVal;
    }

    /**
     * Returns all possible `UnoCardColor` values.
     * @returns {array} Array of `UnoCardColor` values
     */
    static AllCases() {
        return Object.keys(UnoCardColor).map((color) => UnoCardColor[color]);
    }

    /**
     * Returns number of `UnoCardColor` values.
     * @returns {number} Number of `UnoCardColor` values
     */
    static Length() {
        return UnoCardColor.AllCases().length;
    }

    toJSON() {
        return `${this.name}`;
    }
};

class UnoCardNumber {
    static Zero = new UnoCardNumber('Zero', 0);
    static One = new UnoCardNumber('One', 1);
    static Two = new UnoCardNumber('Two', 2);
    static Three = new UnoCardNumber('Three', 3);
    static Four = new UnoCardNumber('Four', 4);
    static Five = new UnoCardNumber('Five', 5);
    static Six = new UnoCardNumber('Six', 6);
    static Seven = new UnoCardNumber('Seven', 7);
    static Eight = new UnoCardNumber('Eight', 8);
    static Nine = new UnoCardNumber('Nine', 9);

    constructor(name, numVal) {
        this.name = name;
        this.numVal = numVal;
    }

    /**
     * Returns all possible `UnoCardNumber` values.
     * @returns {array} Array of `UnoCardNumber` values
     */
    static AllCases() {
        return Object.keys(UnoCardNumber).map((number) => UnoCardNumber[number]);
    }

    /**
     * Returns number of `UnoCardNumber` values.
     * @returns {number} Number of `UnoCardNumber` values
     */
    static Length() {
        return UnoCardNumber.AllCases().length;
    }

    toJSON() {
        return `${this.name}`;
    }
};

class UnoCardAction {
    static DrawTwo = new UnoCardAction('DrawTwo', 0);
    static Skip = new UnoCardAction('Skip', 1);
    static Reverse = new UnoCardAction('Reverse', 2);
    static ChangeColor = new UnoCardAction('ChangeColor', 3);
    static DrawFour = new UnoCardAction('DrawFour', 4);

    constructor(name, numVal) {
        this.name = name;
        this.numVal = numVal;
    }

    /**
     * Returns all possible `UnoCardAction` values.
     * @returns {array} Array of `UnoCardAction` values
     */
    static AllCases() {
        return Object.keys(UnoCardAction).map((action) => UnoCardAction[action]);
    }

    /**
     * Returns number of `UnoCardAction` values.
     * @returns {number} Number of `UnoCardAction` values
     */
    static Length() {
        return UnoCardAction.AllCases().length;
    }

    toJSON() {
        return `${this.name}`;
    }
};

class UnoCard {
    constructor(cardColor, cardType, cardValue, id) {
        this.color = cardColor;
        this.type = cardType;
        this.value = cardValue;
        this.faceUp = false;
        this.id = id;
    }

    /**
     * Flips card over.
     */
    flipCard() {
        this.faceUp = !this.faceUp;
    }

    /**
     * Performs a deep equality check with another card.
     * @param {UnoCard} rhs - Other card to be compared with
     * @returns {boolean} True if the current card is equal to the other card
     */
    equals(rhs) {
        return this.color.numVal === rhs.color.numVal && this.type.numVal === rhs.type.numVal && this.value.numVal === rhs.value.numVal;
    }

    /**
     * Performs a "less than" comparasion check with another card.
     * @param {UnoCard} rhs - Other card to be compared with
     * @returns {boolean} True if the current card is "less than" the other card
     */
    lt(rhs) {
        if (this.type.numVal === rhs.type.numVal) {
            if (this.color.numVal === rhs.color.numVal) return this.value.numVal < rhs.value.numVal;
            
            return this.color.numVal < rhs.color.numVal;
        }

        return this.type.numVal < rhs.type.numVal;
    }

    /**
     * Performs a comparasion check with another card.
     * 
     * Returns 0 if the current card is equal to the other card.
     * 
     * Returns -1 if the current card is "less than" the other card.

     * Returns 1 if the current card is "greater than" the other card.
     * @param {UnoCard} rhs - Other card to be compared with
     * @returns {number} 0 if thisCard.equals(rhs), -1 if thisCard.lt(rhs), otherwise 1
     */
    comp(rhs) {
        if (this.equals(rhs)) return 0;

        return this.lt(rhs) ? -1 : 1;
    }

    /**
     * Checks to see if UnoCard is constructed properly according to the offical Uno packaging.
     * Source: https://www.letsplayuno.com/news/guide/20181213/30092_732567.html
     * 
     * @returns {boolean} True if card is properly constructed
     */
    isProper() {
        if (this.type.numVal === UnoCardType.Number.numVal) {
            return this.color.numVal !== UnoCardColor.Black.numVal;
        }

        if (this.color.numVal === UnoCardColor.Black.numVal) {
            return this.value.numVal === UnoCardAction.DrawFour.numVal || this.value.numVal === UnoCardAction.ChangeColor.numVal;
        }

        return this.value.numVal !== UnoCardAction.DrawFour.numVal && this.value.numVal !== UnoCardAction.ChangeColor.numVal;
    }

    toJSON() {
        return {
            "type": this.type,
            "color": this.color,
            "value": this.value,
            "faceUp": this.faceUp,
            "id": this.id
        };
    }

    /**
     * Decodes a JSON object into a `UnoCard` object.
     * @param {object} jsonObj - JSON object to be decoded into the `UnoCard` object
     * @returns {UnoCard} The created `UnoCard` objected
     */
     static decode(jsonObj) {
        let { type, color, value, faceUp, id } = jsonObj;
        const cardType = UnoCardType[type];
        const cardColor = UnoCardColor[color];
        
        let cardValue;
        switch (cardType) {
            case UnoCardType.Number:
                cardValue = UnoCardNumber[value];
                break;
            case UnoCardType.Action:
                cardValue = UnoCardAction[value];
                break;
        }
        
        let card = new UnoCard(cardColor, cardType, cardValue, id);
        card.faceUp = faceUp;
        return card;
    }
};

function createUnoDeck() {
    var deck = [];

    for (let it = 0; it < 2; it++) {
        for (let cardColor of UnoCardColor.AllCases()) {
            for (let cardNumber of UnoCardNumber.AllCases()) {
                const unoCard = new UnoCard(cardColor, UnoCardType.Number, cardNumber, deck.length);
                deck.push(unoCard);
            }
        }

        for (let cardColor of UnoCardColor.AllCases()) {
            for (let cardAction of UnoCardAction.AllCases()) {
                const unoCard = new UnoCard(cardColor, UnoCardType.Action, cardAction, deck.length);
                deck.push(unoCard);
            }
        }

        deck.push(new UnoCard(UnoCardColor.Black, UnoCardType.Action, UnoCardAction.ChangeColor, deck.length));
        deck.push(new UnoCard(UnoCardColor.Black, UnoCardType.Action, UnoCardAction.DrawFour, deck.length));
    }

    deck = deck.filter(card => card.type.numVal !== UnoCardType.Number.numVal || card.value.numVal !== UnoCardNumber.Zero.numVal);

    for (let cardColor of UnoCardColor.AllCases()) {
        deck.push(new UnoCard(cardColor, UnoCardType.Number, UnoCardNumber.Zero, deck.length));
    }

    deck = deck.sort((lhs, rhs) => lhs.comp(rhs));
    deck = deck.filter(card => card.isProper());
    return deck;
};

module.exports = { UnoCardType, UnoCardColor, UnoCardNumber, UnoCardAction, UnoCard, createUnoDeck };