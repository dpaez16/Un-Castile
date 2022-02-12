import { UnoGame } from "./UnoGame";
import { CastleGame } from './CastleGame';

class UnCastileGame {
    private unoGame: UnoGame;
    private castleGame: CastleGame;
    private seed: string;
    private playerNum: number;

    constructor(numPlayers: number, seed: string) {
        this.seed = seed;
        this.unoGame = new UnoGame(numPlayers, seed);
        this.castleGame = new CastleGame(numPlayers, seed);
        this.playerNum = 0;
    }

    getPlayerCards(playerNum: number) {
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

    isLegalUnoMove(playerNum: number, cardIdx: number) {
        return this.unoGame.isLegalMove(number, idx);
    }

    placeUnoCard(playerNum: number, cardIdx: number) {
        this.unoGame.placeCard(playerNum, cardIdx);
    }

    drawUnoCards(playerNum: number, n: number) {
        this.unoGame.drawCards(playerNum, n);
    }

    getPlayedUnoCards() {
        return this.unoGame.getPlayedCards();
    }

    hasUnoCards(playerNum: number) {
        return this.unoGame.hasCards(playerNum);
    }

    isLegalCastleDownMove(playerNum: number, cardIdx: number) {
        return this.castleGame.isLegalCastleDownMove(playerNum, cardIdx);
    }

    isLegalCastleUpMove(playerNum: number, cardIdx: number) {
        return this.castleGame.isLegalCastleUpMove(playerNum, cardIdx);
    }

    isLegalCastleHandMove(playerNum: number, cardIdx: number) {
        return this.castleGame.isLegalCastleHandMove(playerNum, cardIdx);
    }

    placeCastleDownCard(playerNum: number, cardIdx: number) {
        return this.castleGame.placeCardCastleDown(this.playerNum, cardIdx);
    }

    placeCastleUpCard(playerNum: number, cardIdx: number) {
        this.castleGame.placeCardCastleUp(this.playerNum, cardIdx);
    }

    placeCastleHandCard(playerNum: number, cardIdx: number) {
        this.castleGame.placeCardCastleHand(this.playerNum, cardIdx);
    }

    drawCastleCards(playerNum: number) {
        return this.castleGame.drawExtraCards(playerNum);
    }

    swapCastleCards(playerNum: number, i: number, j: number) {
        this.castleGame.swapCards(playerNum, i, j);
    }

    pickUpCastlePile(playerNum: number) {
        this.castleGame.pickUpPile(playerNum);
    }

    hasCastleCards(playerNum: number) {
        return this.castleGame.hasCards(playerNum);
    }

    closeCastlePrepPhase() {
        this.castleGame.closeCastlePrepPhase();
    }

    isCastlePrepPhaseOpen() {
        return this.castleGame.isCastlePrepPhaseOpen();
    }

    removePlayer(playerNum: number) {
        this.castleGame.removePlayer(playerNum);
        this.unoGame.removePlayer(playerNum);
    }

    setCastleValueDirection(newValueDirection: number) {
        this.castleGame.setValueDirection(newValueDirection);
    }

    getPlayedCastleCards() {
        return this.castleGame.getPlayedCards();
    }
};

export { UnCastileGame };