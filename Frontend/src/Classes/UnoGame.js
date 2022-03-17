const { UnoCardType, UnoCardColor, UnoCard, createUnoDeck } = require('./UnoCard');
const { UnoPlayer } = require('./UnoPlayer');
const { RNG, shuffleArray } = require('../Utils');

class UnoGame {
    static HAND_SIZE = 7;

    constructor(numPlayers, seed) {
        this.rng = new RNG(seed);
        this.deck = createUnoDeck();
        this.playedCards = [];
        shuffleArray(this.playedCards, this.rng);

        this.players = [];
        for (let i = 0; i < numPlayers; i++) {
            const hand = this.deck.splice(this.deck.length - UnoGame.HAND_SIZE)
                .map((card) => {
                    card.flipCard(); // player's hand is face up
                    return card;
                });

            this.players.push(new UnoPlayer(hand));
        }

        // Finds a number card for start of game
        const end = this.deck.length - 1;
        for (let i = 0; i < this.deck.length; i++) {
            const unoCard = this.deck[i];
            if (unoCard.type.numVal == UnoCardType.Number.numVal) {
                [this.deck[end], this.deck[i]] = [this.deck[i], this.deck[end]];
                break;
            }
        }

        this.playedCards.push(this.deck.pop());
        this.playedCards[0].flipCard();
        this.setColor(this.playedCards[0].color);
    }

    /**
     * Reshuffles the cards under the top card placed and sets 
     * them aside to become the new deck.
     */
    resetPlayedCards() {
        // assumes all cards in playedCards is face up
        const topCard = this.playedCards.pop();

        this.deck = this.playedCards.splice(0)
            .map((card) => {
                card.flipCard(); // deck cards are always face down
                return card;
            });

        shuffleArray(this.deck, this.rng);
        this.playedCards.push(topCard);
    }

    /**
     * Removes a player from the game.
     * @param {number} i - Player index in game
     */
    removePlayer(i) {
        const player = this.players.splice(i, 1)[0];
        const cards = player.getCards();

        for (let card of cards) {
            this.playedCards.unshift(card);
        }
    }

    /**
     * Gets the current color in play.
     * @returns {UnoCardColor} The current color in play
     */
    getColor() {
        return this.color;
    }

    /**
     * Sets the current color in play to a new color.
     * @param {UnoCardColor} newColor - New color to be set
     */
    setColor(newColor) {
        this.color = newColor;
    }

    /**
     * Places an uno card on top of the played cards pile.
     * @param {number} playerNum - Player index in game
     * @param {number} cardIdx - Card index in player's hand
     */
    placeCard(playerNum, cardIdx) {
        // assuming play is legal here

        const card = this.players[playerNum].getCard(cardIdx);
        this.playedCards.push(card);
        this.players[playerNum].removeCard(cardIdx);
    }

    /**
     * Makes the player draw a single card from the deck.
     * @param {number} playerNum - Player index in game
     */
    drawCard(playerNum) {
        // assumes all cards in deck is face down
        if (this.deck.length === 0) {
            this.resetPlayedCards();
        }

        const card = this.deck.pop();
        card.flipCard();
        this.players[playerNum].addCard(card);
    }

    /**
     * Makes the player draw a set number of cards from the deck.
     * @param {number} playerNum - Player index in game
     * @param {number} n - Number of cards to draw
     */
    drawCards(playerNum, n) {
        for (let i = 0; i < n; i++) {
            this.drawCard(playerNum);
        }
    }

    /**
     * Returns true if the selected card can be played.
     * @param {number} playerNum - Player index in game
     * @param {number} cardIdx - Card index in player's hand
     * @returns {boolean} True if the selected card can be played
     */
    isLegalMove(playerNum, cardIdx) {
        const chosenCard = this.players[playerNum].getCard(cardIdx);
        const topCard = this.playedCards[0];
        return chosenCard.color == UnoCardColor.Black || chosenCard.color == topCard.color;
    }

    /**
     * Returns true if the player has uno cards in their hand.
     * @param {number} playerNum - Player index in game
     * @returns {boolean} True if the player has uno cards in their hand
     */
    hasCards(playerNum) {
        return this.players[playerNum].hasCards();
    }

    /**
     * Returns the draw pile.
     * @returns {Array<UnoCard>} The draw pile
     */
    getDeck() {
        return this.deck;
    }

    /**
     * Returns the pile of placed cards.
     * @returns {Array<UnoCard>} The pile of placed cards
     */
    getPlayedCards() {
        return this.playedCards;
    }

    /**
     * Returns the hand of a player.
     * @param {number} playerNum - Player index in game
     * @returns {Array<UnoCard>} The player's hand
     */
    getPlayerHand(playerNum) {
        return this.players[playerNum].getCards();
    }

    /**
     * Returns true if the player has a draw event (+2, +4, or +n)
     * @param {number} playerNum - Player index in game
     * @returns {boolean} True if the player's draw event > 0
     */
    hasDrawEvent(playerNum) {
        return this.players[playerNum].hasDrawEvent();
    }

    /**
     * Returns the draw event (+2, +4, or +n). 
     * Draw event is a non-negative integer.
     * @param {number} playerNum - Player index in game
     * @returns {number} The draw event
     */
    getDrawEvent(playerNum) {
        return this.players[playerNum].getDrawEvent();
    }

    /**
     * Sets the player's draw event.
     * @param {number} playerNum - Player index in game
     * @param {number} drawEvent - Draw event number
     */
    setDrawEvent(playerNum, drawEvent) {
        this.players[playerNum].setDrawEvent(drawEvent);
    }

    /**
     * Clears off the draw event from a player.
     * @param {number} playerNum - Player index in game
     */
    clearDrawEvent(playerNum) {
        this.players[playerNum].clearDrawEvent();
    }
};

module.exports = { UnoGame };