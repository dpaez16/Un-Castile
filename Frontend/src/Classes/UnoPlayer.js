const { UnoCard } = require('./UnoCard');

class UnoPlayer {
    constructor(hand) {
        this.hand = hand;
        this.drawEvent = 0;

        for (let card of this.hand) {
            card.faceUp = true;
        }
    }

    /**
     * Returns the player's hand.
     * @returns {Array<UnoCard>} The player's hand
     */
    getCards() {
        return this.hand;
    }

    /**
     * Gets a card from the player's hand.
     * @param {number} idx - Index of player's hand
     * @returns {UnoCard} The selected card from the player's hand
     */
    getCard(idx) {
        return this.hand[idx];
    }

    /**
     * Removes a card from the player's hand.
     * @param {number} idx - Index of player's hand
     */
    removeCard(idx) {
        this.hand.splice(idx, 1);
    }

    /**
     * Returns the number of cards in the player's hand.
     * @returns {number} The number of cards in the player's hand
     */
    handSize() {
        return this.hand.length;
    }

    /**
     * Adds a card to the player's hand.
     * @param {UnoCard} unoCard - The card to be added to the player's hand
     */
    addCard(unoCard) {
        this.hand.push(unoCard);
    }

    /**
     * Returns true if the player has cards in their hand.
     * @returns {boolean} True if the player has cards in their hand
     */
    hasCards() {
        return this.hand.length > 0;
    }

    /**
     * Returns true if the player has a draw event.
     * @returns {boolean} True if the player's draw event > 0.
     */
    hasDrawEvent() {
        return this.drawEvent > 0;
    }

    /**
     * Returns the player's draw event (+2, +4, or +n).
     * @returns {number} The player's draw event
     */
    getDrawEvent() {
        return this.drawEvent;
    }

    /**
     * Set the player's draw event.
     * @param {number} drawEvent - The draw event to be set for the player
     */
    setDrawEvent(drawEvent) {
        this.drawEvent = drawEvent;
    }

    /**
     * Clears out the draw event for the player.
     */
    clearDrawEvent() {
        this.setDrawEvent(0);
    }

    toJSON() {
        return {
            "hand": this.getCards(),
            "drawEvent": this.getDrawEvent()
        };
    }

    /**
     * Decodes a JSON object into a `UnoPlayer` object.
     * @param {object} jsonObj - JSON object to be decoded into the `UnoPlayer` object
     * @returns {UnoPlayer} The created `UnoPlayer` objected
     */
    static decode(jsonObj) {
        let { hand, drawEvent } = jsonObj;
        hand = hand.map(e => UnoCard.decode(e));

        let card = new UnoPlayer([]);
        card.hand = hand;
        card.drawEvent = drawEvent;

        return card;
    }
};

module.exports = { UnoPlayer };