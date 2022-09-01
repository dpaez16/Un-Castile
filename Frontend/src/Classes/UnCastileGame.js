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

    /**
     * Checks to see if a player's "castle down" card can be played.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's "castle down"
     * @returns {boolean} True if the player's selected "castle down" can be legally played
     */
    isLegalCastleDownMove(playerNum, cardIdx) {
        return this.castleGame.isLegalCastleDownMove(playerNum, cardIdx);
    }

    /**
     * Checks to see if a player's "castle up" card can be played.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's "castle up"
     * @returns {boolean} True if the selected "castle up" card can be played
     */
    isLegalCastleUpMove(playerNum, cardIdx) {
        return this.castleGame.isLegalCastleUpMove(playerNum, cardIdx);
    }

    /**
     * Checks to see if a player's card from their hand can be played.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's hand
     * @returns {boolean} True if the selected card can be played
     */
    isLegalCastleHandMove(playerNum, cardIdx) {
        return this.castleGame.isLegalCastleHandMove(playerNum, cardIdx);
    }

    /**
     * Tries to play a player's "castle down" card.
     * 
     * If successful, the card gets played.
     * 
     * Otherwise, the player picks up the pile and the "castle down" card.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's "castle down"
     * @returns {boolean} True if the selected "castle down" card is played successfully.
     */
    placeCastleDownCard(playerNum, cardIdx) {
        return this.castleGame.placeCardCastleDown(playerNum, cardIdx);
    }

    /**
     * Places a player's "castle up" card.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's "castle up"
     */
    placeCastleUpCard(playerNum, cardIdx) {
        this.castleGame.placeCardCastleUp(playerNum, cardIdx);
    }

    /**
     * Places a card from a player's hand.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's hand
     */
    placeCastleHandCard(playerNum, cardIdx) {
        this.castleGame.placeCardCastleHand(playerNum, cardIdx);
    }

    /**
     * A player draws cards from the pile until they have the maximum amount of castle cards allowed.
     * 
     * If the player has already properly emptied their hand, then they do not pick up any cards
     * @param {number} playerNum - Index of player
     */
    drawCastleCards(playerNum) {
        this.castleGame.drawExtraCards(playerNum);
    }

    /**
     * Assigns a player's selected cards to be their "castle up".
     * @param {number} playerNum - Index of player
     * @param {number} cardIdxs - Indexes of player's "castle up"
     */
    assignCastleUpCards(playerNum, cardIdxs) {
        this.castleGame.assignCastleUpCards(playerNum, cardIdxs);
    }

    /**
     * Makes a player pick up the played cards pile.
     * @param {number} playerNum - Index of player
     */
    pickUpCastlePile(playerNum) {
        this.castleGame.pickUpPile(playerNum);
    }

    /**
     * Gets the Castle discard pile.
     * @returns {Array<CastleCard>} The Castle discard pile
     */
    getCastleDiscardPile() {
        return this.castleGame.getDiscardPile();
    }

    /**
     * Discards all cards in the played cards pile into the discard pile.
     */
    blowUpCastlePile() {
        this.castleGame.blowUpPile();
    }

    /**
     * Checks to see if a player has Castle cards.
     * @param {number} playerNum - Index of player
     * @returns {boolean} True if the player has Castle cards
     */
    hasCastleCards(playerNum) {
        return this.castleGame.hasCards(playerNum);
    }

    /**
     * Ends the phase of players selecting their "castle up" cards.
     */
    closeCastlePrepPhase() {
        this.castleGame.closeCastlePrepPhase();
    }

    /**
     * Checks to see if the phase of players selecting their "castle up" cards is still ongoing.
     * @returns {boolean} True if the phase is still ongoing
     */
    isCastlePrepPhaseOpen() {
        return this.castleGame.isCastlePrepPhaseOpen();
    }

    /**
     * Set the Castle value direction to a new value direction. 
     * Castle Value direction shold be -1 or 1.
     * @param {number} newValueDirection - The new Castle value direction
     */
    setCastleValueDirection(newValueDirection) {
        this.castleGame.setValueDirection(newValueDirection);
    }

    /**
     * Gets the Castle played cards pile.
     * @returns {Array<CastleCard>} The Castle played cards pile
     */
    getPlayedCastleCards() {
        return this.castleGame.getPlayedCards();
    }

    toJSON() {
        return {
            "seed": this.seed,
            "unoGame": this.unoGame,
            "castleGame": this.castleGame,
            "playerNum": this.playerNum,
            "players": this.players,
            "playerDirection": this.playerDirection,
        };
    }

    /**
     * Decodes a JSON object into a `UnCastileGame` object.
     * @param {object} jsonObj - JSON object to be decoded into the `UnCastileGame` object
     * @returns {UnCastileGame} The created `UnCastileGame` objected
     */
    static decode(jsonObj) {
        let { seed, unoGame, castleGame, playerNum, players, playerDirection } = jsonObj;
        unoGame = UnoGame.decode(unoGame);
        castleGame = CastleGame.decode(castleGame);
        players = players.map(e => UnCastilePlayer.decode(e));

        let game = new UnCastileGame(players.length, [], seed);
        game.unoGame = unoGame;
        game.castleGame = castleGame;
        game.playerNum = playerNum;
        game.players = players;
        game.playerDirection = playerDirection;

        return game;
    }
};

module.exports = { UnCastileGame };