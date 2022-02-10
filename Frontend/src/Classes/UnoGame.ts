import { UnoCardType, UnoCardColor, UnoCard, createUnoDeck } from './UnoCard';
import { RNG, shuffleArray } from '../Utils';

class UnoGame {
    static readonly HAND_SIZE = 7;

    private deck: Array<UnoCard>;
    private playedCards: Array<UnoCard>;
    private playerHands: Array<Array<UnoCard>>;
    private rng: RNG;

    constructor(numPlayers: number, seed: string) {
        this.rng = new RNG(seed);
        this.deck = [];
        this.playedCards = createUnoDeck();
        shuffleArray(this.playedCards, this.rng);

        // Finds a number card for start of game
        const end = this.playedCards.length - 1;
        for (let i = 0; i < this.playedCards.length; i++) {
            const unoCard = this.playedCards[i];
            if (unoCard.type == UnoCardType.Number) {
                [this.playedCards[end], this.playedCards[i]] = [this.playedCards[i], this.playedCards[end]];
                break;
            }
        }

        this.resetPlayedCards();

        this.playerHands = [];
        for (let i = 0; i < numPlayers; i++) {
            const hand = this.deck.splice(this.deck.length - UnoGame.HAND_SIZE);
            this.playerHands.push(hand);
        }
    }

    resetPlayedCards() {
        const topCard = this.playedCards[this.playedCards.length - 1];
        this.playedCards.pop();

        this.deck = this.playedCards.splice(0);
        shuffleArray(this.deck, this.rng);
        this.playedCards = [topCard];
    }

    removePlayer(i: number) {
        const cards = this.playerHands.splice(i, 1)[0];
        for (let card of cards) {
            this.playedCards.unshift(card);
        }
    }

    placeCard(playerNum: number, cardIdx: number) {
        // assuming play is legal here

        const card = this.playerHands[playerNum].splice(cardIdx, 1)[0];
        this.playedCards.push(card);
    }

    drawCard(playerNum: number) {
        if (this.deck.length === 0) {
            this.resetPlayedCards();
        }

        const card = this.deck[this.deck.length - 1];
        this.deck.pop();
        this.playerHands[playerNum].push(card);
    }

    isLegalMove(playerNum: number, cardIdx: number) {
        const chosenCard = this.playerHands[playerNum][cardIdx];
        const topCard = this.playedCards[0];
        return chosenCard.color == UnoCardColor.Black || chosenCard.color == topCard.color;
    }

    hasCards(playerNum: number) {
        return this.playerHands[playerNum].length > 0;
    }

    getDeck() {
        return this.deck;
    }

    getPlayedCards() {
        return this.playedCards;
    }

    getPlayerHand(playerNum: i) {
        return this.playerHands[i];
    }
};

export { UnoGame };