const { UnoCardColor, UnoGame } = require('./UnoGame');
const { CastleGame } = require('./CastleGame');
const { CastleCard } = require('./CastleCard');
const { UnCastilePlayer } = require('./UnCastilePlayer');

class UnCastileGame {
    constructor(numPlayers, playerMetadata, seed) {
        this.seed = seed;
        this.unoGame = new UnoGame(numPlayers, seed);
        this.castleGame = new CastleGame(numPlayers, seed);
        this.playerNum = 0; // who's turn is it
        this.players = [];
        this.playerDirection = 1; // 1 or -1

        for (let i = 0; i < numPlayers; i++) {
            this.players.push(new UnCastilePlayer(playerMetadata[i]));
        }
    }

    /**
     * Returns all of the player's cards (Uno + Castle) as a JS Object:
     * 
     * {
     *      unoCards: ...,
     *      castleCards: {
     *          down: ...,
     *          up: ...,
     *          hand: ...
     *      }
     * }
     * @param {number} playerNum - Index of player
     * @returns {Object}
     */
    getPlayerCards(playerNum) {
        const castlePlayer = this.castleGame.getPlayer(playerNum);
        return {
            unoCards: this.unoGame.getPlayerHand(playerNum),
            castleCards: {
                down: castlePlayer.getCastleDownCards(),
                up: castlePlayer.getCastleUpCards(),
                hand: castlePlayer.getCastleHandCards()
            }
        };
    }

    /**
     * Checks to see if a player has won the game.
     * @param {number} playerNumber - Index of player
     * @returns {boolean} True if the player has no Uno cards and no Castle cards remaining
     */
    isWinner(playerNumber) {
        return !this.unoGame.hasCards(playerNumber) && !this.castleGame.hasCards(playerNumber);
    }

    /**
     * Removes a player from the game.
     * @param {number} playerNum - Index of player
     */
    deletePlayer(playerNum) {
        this.unoGame.removePlayer(playerNum);
        this.castleGame.removePlayer(playerNum);
        this.players.splice(playerNum, 1);

        for (let idx = playerNum; idx < this.players.length; idx++) {
            const newPlayerNum = this.players[idx].getPlayerNum() - 1;
        }

        this.playerNum %= this.players.length;
    }

    /**
     * Goes to the next player.
     * @param {boolean} skipNextPlayer - Flag indicating to skip the next player.
     * @returns {number} The next player number
     */
    goToNextPlayer(skipNextPlayer = false) {
        this.playerNum = (this.playerNum + this.playerDirection) % this.players.length;
        if (skipNextPlayer) {
            this.playerNum = (this.playerNum + this.playerDirection) % this.players.length;
        }

        return this.playerNum;
    }

    /**
     * Flips the direction of the player flow.
     */
    flipDirection() {
        this.playerDirection *= -1;
    }
    
    // Uno API

    /**
     * Gets the current Uno color in play.
     * @returns {UnoColor} The current Uno color in play
     */
    getColor() {
        return this.unoGame.getColor();
    }

    /**
     * Sets the current Uno color in play to a new color.
     * @param {UnoColor} newColor - New color to be in play.
     */
    setColor(newColor) {
        this.unoGame.setColor(newColor);
    }

    /**
     * Checks to see if a selected Uno card from a player's hand can be played.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's hand
     * @returns {boolean} True if the selected card can be played
     */
    isLegalUnoMove(playerNum, cardIdx) {
        return this.unoGame.isLegalMove(playerNum, cardIdx);
    }

    /**
     * Plays an Uno card from a player's hand.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's hand
     */
    placeUnoCard(playerNum, cardIdx) {
        this.unoGame.placeCard(playerNum, cardIdx);
    }

    /**
     * Makes a player draw an Uno card from the deck..
     * @param {number} playerNum - Index of player
     */
    drawUnoCard(playerNum) {
        this.unoGame.drawCard(playerNum);
    }

    /**
     * Makes a player draw a set number of Uno cards from the deck.
     * @param {number} playerNum - Index of player
     * @param {number} n - Number of cards to draw
     */
    drawUnoCards(playerNum, n) {
        this.unoGame.drawCards(playerNum, n);
    }

    /**
     * Gets the played Uno cards pile.
     * @returns {Array<UnoCard>} The played Uno cards pile
     */
    getPlayedUnoCards() {
        return this.unoGame.getPlayedCards();
    }

    /**
     * Checks to see if a player has Uno cards.
     * @param {number} playerNum - Index of player
     * @returns {boolean} True if the player has Uno cards
     */
    hasUnoCards(playerNum) {
        return this.unoGame.hasCards(playerNum);
    }

    /**
     * Checks to see if the player has a draw event.
     * @param {number} playerNum - Index of player
     * @returns {boolean} True if the player has a draw event
     */
    hasUnoDrawEvent(playerNum) {
        return this.unoGame.hasDrawEvent(playerNum);
    }

    /**
     * Gets the player's draw event (+2, +4, or +n).
     * Draw event is a non-negative integer.
     * @param {number} playerNum - Index of player
     * @returns {number} The player's draw event
     */
    getUnoDrawEvent(playerNum) {
        return this.unoGame.getDrawEvent(playerNum);
    }

    /**
     * Sets a player's draw event to a new draw event.
     * @param {number} playerNum - Index of player
     * @param {number} drawEvent - New draw event to set.
     */
    setUnoDrawEvent(playerNum, drawEvent) {
        this.unoGame.setDrawEvent(playerNum, drawEvent);
    }

    /**
     * Clears off the draw event for a player.
     * @param {number} playerNum - Index of player
     */
    clearUnoDrawEvent(playerNum) {
        this.unoGame.clearDrawEvent(playerNum);
    }

    // Castle API

    isLegalCastleDownMove(playerNum, cardIdx) {
        return this.castleGame.isLegalCastleDownMove(playerNum, cardIdx);
    }

    isLegalCastleUpMove(playerNum, cardIdx) {
        return this.castleGame.isLegalCastleUpMove(playerNum, cardIdx);
    }

    isLegalCastleHandMove(playerNum, cardIdx) {
        return this.castleGame.isLegalCastleHandMove(playerNum, cardIdx);
    }

    placeCastleDownCard(playerNum, cardIdx) {
        return this.castleGame.placeCardCastleDown(playerNum, cardIdx);
    }

    placeCastleUpCard(playerNum, cardIdx) {
        this.castleGame.placeCardCastleUp(playerNum, cardIdx);
    }

    placeCastleHandCard(playerNum, cardIdx) {
        this.castleGame.placeCardCastleHand(playerNum, cardIdx);
    }

    drawCastleCards(playerNum) {
        return this.castleGame.drawExtraCards(playerNum);
    }

    assignCastleUpCards(playerNum, cardIdxs) {
        this.castleGame.assignCastleUpCards(playerNum, cardIdxs);
    }

    pickUpCastlePile(playerNum) {
        this.castleGame.pickUpPile(playerNum);
    }

    getCastleDiscardPile() {
        return this.castleGame.getDiscardPile();
    }

    blowUpCastlePile() {
        this.castleGame.blowUpPile();
    }

    hasCastleCards(playerNum) {
        return this.castleGame.hasCards(playerNum);
    }

    closeCastlePrepPhase() {
        this.castleGame.closeCastlePrepPhase();
    }

    isCastlePrepPhaseOpen() {
        return this.castleGame.isCastlePrepPhaseOpen();
    }

    setCastleValueDirection(newValueDirection) {
        this.castleGame.setValueDirection(newValueDirection);
    }

    getPlayedCastleCards() {
        return this.castleGame.getPlayedCards();
    }
};

module.exports = { UnCastileGame };