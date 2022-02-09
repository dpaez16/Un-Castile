import { CastleCardValue, CastleCard, createCastleDeck } from './CastleCard';
import { CastlePlayer } from './CastlePlayer';
import { RNG, shuffleArray } from '../Utils';

class CastleGame {
    static readonly CASTLE_DOWN_SIZE = 3;
    static readonly CASTLE_UP_SIZE = 3;
    static readonly CASTLE_HAND_SIZE = 3;

    private deck: Array<CastleCard>;
    private players: Array<CastlePlayer>;
    private playedCards: Array<any>;
    private valueDirection: number; // -1 (decreasing) or 1 (increasing)
    private castlePrepDone: boolean;
    private rng: RNG;

    constructor(numPlayers: number, seed: string) {
        this.rng = new RNG(seed);
        this.deck = createCastleDeck();
        shuffleArray(this.deck, this.rng);
        
        this.playedCards = [];
        this.valueDirection = 1;
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

    closeCastlePrepPhase() {
        this.castlePrepDone = true;
    }

    isCastlePrepPhaseOpen() {
        return !this.castlePrepDone;
    }

    removePlayer(i: number) {
        const player = this.players.splice(i, 1)[0];

        var cards = player.getCastleDownCards();
        for (let card of cards) {
            if (card === undefined) continue;

            card.faceUp = true;
            this.playedCards.unshift(card);
        }

        cards = player.getCastleUpCards();
        for (let card of cards) {
            if (card === undefined) continue;

            card.faceUp = true;
            this.playedCards.unshift(card);
        }

        cards = player.getCastleHandCards();
        for (let card of cards) {
            if (card === undefined) continue;

            card.faceUp = true;
            this.playedCards.unshift(card);
        }
    }

    setValueDirection(newValueDirection: number) {
        this.valueDirection = newValueDirection;
    }

    isWildCard(card: CastleCard) {
        return  card.value === CastleCardValue.Two || 
                card.value === CastleCardValue.Seven ||
                card.value === CastleCardValue.Ten;
    }

    placeCardCastleDown(playerNum: number, cardIdx: number) {
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

    placeCardCastleUp(playerNum: number, cardIdx: number) {
        // assuming card being played is legal

        const player = this.players[playerNum];
        const card = player.getCastleUpCard(cardIdx);
        this.playedCards.push(card);
        player.removeCastleUpCard(cardIdx);
    }

    placeCardCastleHand(playerNum: number, cardIdx: number) {
        // assuming card being played is legal

        const player = this.players[playerNum];
        const card = player.getCastleHandCard(cardIdx);
        this.playedCards.push(card);
        player.removeCastleHandCard(cardIdx);
    }

    deckSize() {
        return this.deck.length;
    }

    drawCard() {
        return this.deck.pop()
    }

    drawExtraCards(playerNum: number) {
        // if player emptied their hand before, no need to draw extra cards
        const player = this.players[playerNum];
        if (player.emptiedHandBefore()) return;

        while (this.deckSize() > 0 && player.castleHandSize() < CastleGame.CASTLE_HAND_SIZE) {
            const card = this.drawCard();
            player.addCard(card);
        }
    }

    isLegalMoveHelper(chosenCard: CastleCard) {
        if (this.isWildCard(chosenCard)) return true;

        const topCard = this.playedCards[this.playedCards.length - 1];
        if (this.valueDirection > 0) return chosenCard.value >= topCard.value;
        else return chosenCard.value <= topCard.value;
    }

    isLegalCastleDownMove(playerNum: number, cardIdx: number) {
        const chosenCard = this.players[playerNum].getCastleDownCard(cardIdx);
        if (chosenCard === undefined) return false;

        return this.isLegalMoveHelper(chosenCard);
    }

    isLegalCastleUpMove(playerNum: number, cardIdx: number) {
        const chosenCard = this.players[playerNum].getCastleUpCard(cardIdx);
        if (chosenCard === undefined) return false;

        return this.isLegalMoveHelper(chosenCard);
    }

    isLegalCastleHandMove(playerNum: number, cardIdx: number) {
        const chosenCard = this.players[playerNum].getCastleHandCard(cardIdx);
        return this.isLegalMoveHelper(chosenCard);
    }

    pickUpPile(playerNum: number) {
        const cards = this.playedCards.splice(0);
        const player = this.players[playerNum];
        for (let card of cards) {
            player.addCard(card);
        }
    }

    hasCards(playerNum: number) {
        return this.players[playerNum].hasCards();
    }

    swapCards(playerNum: number, i: number, j: number) {
        this.players[playerNum].swapCards(i, j);
    }
};

export { CastleGame };