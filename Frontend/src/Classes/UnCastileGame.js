const { UnoCardColor, UnoGame } = require('./UnoGame');
const { CastleGame } = require('./CastleGame');

class UnCastileGame {
    constructor(numPlayers, playerMetadata, seed) {
        this.seed = seed;
        this.unoGame = new UnoGame(numPlayers, seed);
        this.castleGame = new CastleGame(numPlayers, seed);
        this.playerNum = 0; // who's turn is it
        this.players = [];
        this.playerDirection = 1; // 1 or -1

        for (let i = 0; i < numPlayers; i++) {
            this.players.push(new UnCastilePlayer(i, playerMetadata[i]));
        }
    }

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

    isWinner(playerNumber) {
        return !this.unoGame.hasCards(playerNumber) && !this.castleGame.hasCards(playerNumber);
    }

    deletePlayer(playerNum) {
        this.unoGame.removePlayer(playerNum);
        this.castleGame.removePlayer(playerNum);
        this.players.splice(playerNum, 1);

        for (let idx = playerNum; idx < this.players.length; idx++) {
            const newPlayerNum = this.players[idx].getPlayerNum() - 1;
            this.players[idx].setPlayerNum(newPlayerNum);
        }

        this.playerNum %= this.players.length;
    }

    goToNextPlayer(skipNextPlayer = false) {
        this.playerNum = (this.playerNum + this.playerDirection) % this.players.length;
        if (skipNextPlayer) {
            this.playerNum = (this.playerNum + this.playerDirection) % this.players.length;
        }

        return this.playerNum;
    }

    flipDirection() {
        this.playerDirection *= -1;
    }
    
    // Uno API

    getColor() {
        return this.unoGame.getColor();
    }

    setColor(newColor) {
        this.unoGame.setColor(newColor);
    }

    isLegalUnoMove(playerNum, cardIdx) {
        return this.unoGame.isLegalMove(number, idx);
    }

    placeUnoCard(playerNum, cardIdx) {
        this.unoGame.placeCard(playerNum, cardIdx);
    }

    drawUnoCard(playerNum) {
        this.unoGame.drawCard(playerNum);
    }

    drawUnoCards(playerNum, n) {
        this.unoGame.drawCards(playerNum, n);
    }

    getPlayedUnoCards() {
        return this.unoGame.getPlayedCards();
    }

    hasUnoCards(playerNum) {
        return this.unoGame.hasCards(playerNum);
    }

    hasUnoDrawEvent(playerNum) {
        return this.unoGame.hasDrawEvent(playerNum);
    }

    getUnoDrawEvent(playerNum) {
        return this.unoGame.getDrawEvent(playerNum);
    }

    setUnoDrawEvent(playerNum, drawEvent) {
        this.unoGame.setDrawEvent(playerNum, drawEvent);
    }

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