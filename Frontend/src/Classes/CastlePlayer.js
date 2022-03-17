const { CastleCard } = require('./CastleCard');

class CastlePlayer {
    constructor(castleDown, castleUp, castleHand) {
        this.castleDown = castleDown;
        this.castleUp = [];
        this.castleHand = castleUp.concat(castleHand);
        this.touchedCastle = false;
    }

    /**
     * Selects cards from the player's hand and places them 
     * on top of their face down cards ("Castle Down" cards). 
     * They serve as their "Castle Up" cards.
     * @param {Array<number>} cardIdxs - Indexes that represent positions in the player's hand
     */
    assignCastleUpCards(cardIdxs) {
        cardIdxs.sort();

        for (let i = 0; i < cardIdxs.length; i++) {
            const idx = cardIdxs[i] - i;
            this.castleUp.push(this.castleHand[idx]);
            this.castleHand.splice(idx, 1);
        }
    }

    /**
     * Returns the player's castle down cards.
     * @returns {Array<CastleCard>} The player's castle down cards
     */
    getCastleDownCards() {
        return this.castleDown;
    }

    /**
     * Returns a card from the player's "castle down".
     * @param {number} idx - Index in player's "castle down"
     * @returns {CastleCard|undefined} The selected "castle down" card
     */
    getCastleDownCard(idx) {
        return this.castleDown[idx];
    }

    /**
     * Removes a card from the player's "castle down".
     * @param {number} idx - Index in player's "castle down"
     */
    removeCastleDownCard(idx) {
        this.castleDown[idx] = undefined;
    }

    /**
     * Returns a card from the player's "castle up".
     * @returns {Array<CastleCard|undefined>} The player's "castle up" cards
     */
    getCastleUpCards() {
        return this.castleUp;
    }

    /**
     * Returns a card from the player's "castle up".
     * @param {number} idx - Index in player's "castle up"
     * @returns {CastleCard|undefined} The selected "castle up" card
     */
    getCastleUpCard(idx) {
        return this.castleUp[idx];
    }

    /**
     * Removes a card from the player's "castle up".
     * @param {number} idx - Index in player's "castle up"
     */
    removeCastleUpCard(idx) {
        this.castleUp[idx] = undefined;
    }

    /**
     * Returns the player's hand.
     * @returns {Array<CastleCard>}
     */
    getCastleHandCards() {
        return this.castleHand;
    }

    /**
     * Returns a card from the player's hand.
     * @param {number} idx - Index in the player's hand
     * @returns {CastleCard} The selected card from the player's hand
     */
    getCastleHandCard(idx) {
        return this.castleHand[idx];
    }

    removeCastleHandCard(idx) {
        this.castleHand.splice(idx, 1);
    }

    /**
     * Returns the number of cards in the player's hand.
     * @returns {number} The number of cards in the player's hand
     */
    castleHandSize() {
        return this.castleHand.length;
    }

    /**
     * Adds a card to the player's hand.
     * @param {CastleCard} castleCard - Card to be added to player's hand
     */
    addCard(castleCard) {
        this.castleHand.push(castleCard);
    }

    /**
     * Marks the player as having properly emptied their hand.
     */
    touchCastle() {
        this.touchedCastle = true;
    }

    /**
     * Checks to see if the player has properly emptied their hand.
     * @returns {boolean} True if the player has properly emptied their hand
     */
    emptiedHandBefore() {
        return this.touchedCastle;
    }

    /**
     * Checks to see if the player has any cards.
     * @returns {boolean} True if the player has cards either in their "castle down", "castle up", or their hand.
     */
    hasCards() {
        const numCards = this.castleDown.filter((card) => card !== undefined).length + 
                         this.castleUp.filter((card) => card !== undefined).length + 
                         this.castleHand.length;

        return numCards > 0;
    }
};

module.exports = { CastlePlayer };