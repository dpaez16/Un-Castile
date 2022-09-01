const { CastleCard, CastleCardSuit, CastleCardValue, createCastleDeck } = require('./CastleCard');
const { CastlePlayer } = require('./CastlePlayer');
const { RNG, shuffleArray } = require('../Utils');

class CastleGame {
    static CASTLE_DOWN_SIZE = 3;
    static CASTLE_UP_SIZE = 3;
    static CASTLE_HAND_SIZE = 3;

    constructor(numPlayers, seed) {
        this.rng = new RNG(seed);
        this.deck = createCastleDeck();
        shuffleArray(this.deck, this.rng);
        
        this.playedCards = [];
        this.discardPile = [];
        this.valueDirection = 1; // 1 := increasing value, -1 := decreasing value
        this.castlePrepDone = false;

        this.players = [];
        for (let i = 0; i < numPlayers; i++) {
            const castleDown = this.deck.splice(this.deck.length - CastleGame.CASTLE_DOWN_SIZE);
            const castleUp = this.deck.splice(this.deck.length - CastleGame.CASTLE_UP_SIZE);
            const castleHand = this.deck.splice(this.deck.length - CastleGame.CASTLE_HAND_SIZE);

            const player = new CastlePlayer(castleDown, castleUp, castleHand);
            this.players.push(player);
        }
    }

    /**
     * Ends the phase of players selecting their "castle up" cards.
     */
    closeCastlePrepPhase() {
        this.castlePrepDone = true;
    }

    /**
     * Checks to see if the phase of players selecting their "castle up" cards is still ongoing.
     * @returns {boolean} True if the phase is still ongoing
     */
    isCastlePrepPhaseOpen() {
        return !this.castlePrepDone;
    }

    /**
     * Removes a player from the game.
     * Their cards are sent back to the discard pile.
     * @param {number} i - Index of player to remove
     */
    removePlayer(i) {
        const player = this.players.splice(i, 1)[0];

        var cards = player.getCastleDownCards();
        for (let card of cards) {
            if (card === undefined) continue;

            card.faceUp = true;
            this.discardPile.push(card);
        }

        cards = player.getCastleUpCards();
        for (let card of cards) {
            if (card === undefined) continue;

            card.faceUp = true;
            this.discardPile.push(card);
        }

        cards = player.getCastleHandCards();
        for (let card of cards) {
            if (card === undefined) continue;

            card.faceUp = true;
            this.discardPile.push(card);
        }
    }

    /**
     * Set the value direction to a new value direction.
     * Value direction shold be -1 or 1.
     * @param {number} newValueDirection - The new value direction to be set
     */
    setValueDirection(newValueDirection) {
        this.valueDirection = newValueDirection;
    }

    /**
     * Checks to see if a card is a wild card.
     * @param {CastleCard} card - Card to be checked
     * @returns {boolean} True if the card is a wild card
     */
    isWildCard(card) {
        let cardValue = card.value.numVal;
        return  cardValue === CastleCardValue.Two.numVal || 
                cardValue === CastleCardValue.Seven.numVal ||
                cardValue === CastleCardValue.Ten.numVal;
    }

    /**
     * Tries to play a player's "castle down" card.
     * 
     * If successful, the card gets played.
     * 
     * Otherwise, the player picks up the pile and the "castle down" card.
     * @param {number} playerNum - Index of player
     * @param {*} cardIdx - Index of player's "castle down"
     * @returns {boolean} True if the selected "castle down" card is played successfully.
     */
    placeCardCastleDown(playerNum, cardIdx) {
        const player = this.players[playerNum];
        if (this.isLegalCastleDownMove(playerNum, cardIdx)) {
            const card = player.getCastleDownCard(cardIdx);
            this.playedCards.push(card);
            player.removeCastleDownCard(cardIdx);

            return true;
        } else {
            this.pickUpPile(playerNum);
            
            const card = player.getCastleDownCard(cardIdx);
            player.addCard(card);
            player.removeCastleDownCard(cardIdx);
            return false;
        }
    }

    /**
     * Places a player's "castle up" card.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's "castle up"
     */
    placeCardCastleUp(playerNum, cardIdx) {
        // assuming card being played is legal

        const player = this.players[playerNum];
        const card = player.getCastleUpCard(cardIdx);
        this.playedCards.push(card);
        player.removeCastleUpCard(cardIdx);
    }

    /**
     * Places a card from a player's hand.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's hand
     */
    placeCardCastleHand(playerNum, cardIdx) {
        // assuming card being played is legal

        const player = this.players[playerNum];
        const card = player.getCastleHandCard(cardIdx);
        this.playedCards.push(card);
        player.removeCastleHandCard(cardIdx);

        if (!player.emptiedHandBefore()) {
            if (this.deckLength() === 0 && player.castleHandSize() === 0) {
                player.touchCastle();
            }
        }
    }

    /**
     * Returns the size of the deck.
     * @returns {number} Number of cards in the deck.
     */
    deckSize() {
        return this.deck.length;
    }

    /**
     * Draws a card from the deck.
     * @returns {CastleCard} Card drawn from the deck
     */
    drawCard() {
        return this.deck.pop()
    }

    /**
     * Gets the draw pile ("deck").
     * @returns {Array<CastleCard>} The draw pile
     */
     getDeck() {
        return this.deck;
    }

    /**
     * Gets the played cards pile.
     * @returns {Array<CastleCard>} The played cards
     */
    getPlayedCards() {
        return this.playedCards;
    }

    /**
     * Gets the discard pile.
     * @returns {Array<CastleCard>} The discard pile
     */
    getDiscardPile() {
        return this.discardPile;
    }

    /**
     * A player draws cards from the pile until they have the 
     * maximum amount of castle cards allowed.
     * 
     * If the player has already properly emptied their hand, then they
     * do not pick up any cards.
     * @param {number} playerNum - Index of player
     */
    drawExtraCards(playerNum) {
        // if player emptied their hand before, no need to draw extra cards
        const player = this.players[playerNum];
        if (player.emptiedHandBefore()) return;

        while (this.deckSize() > 0 && player.castleHandSize() < CastleGame.CASTLE_HAND_SIZE) {
            const card = this.drawCard();
            player.addCard(card);
        }
    }

    /**
     * Checks to see if a card can be played.
     * @param {CastleCard} chosenCard - Card to be checked
     * @returns {boolean} True if the card can be played.
     */
    isLegalMoveHelper(chosenCard) {
        if (this.isWildCard(chosenCard)) return true;

        const topCard = this.playedCards[this.playedCards.length - 1];
        if (this.valueDirection > 0) return chosenCard.value.numVal >= topCard.value.numVal;
        else return chosenCard.value.numVal <= topCard.value.numVal;
    }

    /**
     * Checks to see if a player's "castle down" card can be played
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's "castle down"
     * @returns {boolean} True if the chosen "castle down" card can be played
     */
    isLegalCastleDownMove(playerNum, cardIdx) {
        const chosenCard = this.players[playerNum].getCastleDownCard(cardIdx);
        return chosenCard !== undefined && this.isLegalMoveHelper(chosenCard);
    }

    /**
     * Checks to see if a player's "castle up" card can be played.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's "castle up"
     * @returns {boolean} True if the selected "castle up" card can be played
     */
    isLegalCastleUpMove(playerNum, cardIdx) {
        const chosenCard = this.players[playerNum].getCastleUpCard(cardIdx);
        return chosenCard !== undefined && this.isLegalMoveHelper(chosenCard);
    }

    /**
     * Checks to see if a player's card from their hand can be played.
     * @param {number} playerNum - Index of player
     * @param {number} cardIdx - Index of player's hand
     * @returns {boolean} True if the selected card can be played
     */
    isLegalCastleHandMove(playerNum, cardIdx) {
        const chosenCard = this.players[playerNum].getCastleHandCard(cardIdx);
        return this.isLegalMoveHelper(chosenCard);
    }

    /**
     * Makes a player pick up the played cards pile.
     * @param {number} playerNum - Index of player
     */
    pickUpPile(playerNum) {
        const cards = this.playedCards.splice(0);
        const player = this.players[playerNum];
        for (let card of cards) {
            player.addCard(card);
        }
    }

    /**
     * Discards all cards in the played cards pile into the discard pile.
     */
    blowUpPile() {
        const cards = this.playedCards.splice(0);
        for (let card of cards) {
            this.discardPile.addCard(card);
        }
    }

    /**
     * Checks to see if a player has cards.
     * @param {number} playerNum - Index of player
     * @returns {boolean} True if the player has cards
     */
    hasCards(playerNum) {
        return this.players[playerNum].hasCards();
    }

    /**
     * Assigns a player's selected cards to be their "castle up".
     * @param {number} playerNum - Index of player
     * @param {number} cardIdxs - Indexes of player's "castle up"
     */
    assignCastleUpCards(playerNum, cardIdxs) {
        this.players[playerNum].assignCastleUpCards(cardIdxs);
    }

    /**
     * Gets a player.
     * @param {number} playerNum - Index of player
     * @returns {CastlePlayer} Selected player
     */
    getPlayer(playerNum) {
        return this.players[playerNum];
    }

    toJSON() {
        return {
            "deck": this.getDeck(),
            "discardPile": this.getDiscardPile(),
            "playedCards": this.getPlayedCards(),
            "valueDirection": this.valueDirection,
            "castlePrepDone": this.castlePrepDone,
            "players": this.players,
            "seed": this.rng.seed
        };
    }

    /**
     * Decodes a JSON object into a `CastleGame` object.
     * @param {object} jsonObj - JSON object to be decoded into the `CastleGame` object
     * @returns {CastleGame} The created `CastleGame` objected
     */
    static decode(jsonObj) {
        let { deck, discardPile, playedCards, valueDirection, castlePrepDone, players, seed } = jsonObj;
        deck = deck.map(e => CastleCard.decode(e));
        discardPile = discardPile.map(e => CastleCard.decode(e));
        playedCards = playedCards.map(e => CastleCard.decode(e));
        players = players.map(e => CastlePlayer.decode(e));

        let game = new CastleGame(players.length, seed);
        game.deck = deck;
        game.discardPile = discardPile;
        game.playedCards = playedCards;
        game.valueDirection = valueDirection;
        game.castlePrepDone = castlePrepDone;
        game.players = players;

        return game;
    }
};

module.exports = { CastleGame };