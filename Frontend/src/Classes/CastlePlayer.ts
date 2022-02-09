import { CastleCard } from './CastleCard';

class CastlePlayer {
    private castleDown: Array<CastleCard | undefined>;
    private castleUp: Array<CastleCard | undefined>;
    private castleHand: Array<any>;
    private touchedCastle: boolean;

    constructor(castleDown: Array<CastleCard>, castleUp: Array<CastleCard | undefined>, castleHand: Array<CastleCard>) {
        this.castleDown = castleDown;
        this.castleUp = castleUp;
        this.castleHand = castleHand;
        this.touchedCastle = false;
    }

    swapCards(i: number, j: number) {
        [this.castleUp[i], this.castleHand[j]] = [this.castleHand[i], this.castleUp[j]];
    }

    getCastleDownCards() {
        return this.castleDown;
    }

    getCastleDownCard(idx: number) {
        return this.castleDown[idx];
    }

    removeCastleDownCard(idx: number) {
        this.castleDown[idx] = undefined;
    }

    getCastleUpCards() {
        return this.castleUp;
    }

    getCastleUpCard(idx: number) {
        return this.castleUp[idx];
    }

    removeCastleUpCard(idx: number) {
        this.castleUp[idx] = undefined;
    }

    getCastleHandCards() {
        return this.castleHand;
    }

    getCastleHandCard(idx: number) {
        return this.castleHand[idx];
    }

    removeCastleHandCard(idx: number) {
        this.castleHand.splice(idx, 1);
    }

    castleHandSize() {
        return this.castleHand.length;
    }

    addCard(castleCard: any) {
        this.castleHand.push(castleCard);
    }

    touchCastle() {
        this.touchedCastle = true;
    }

    emptiedHandBefore() {
        return this.touchedCastle;
    }

    hasCards() {
        const numCards = this.castleDown.filter((card) => card !== undefined).length + 
                         this.castleUp.filter((card) => card !== undefined).length + 
                         this.castleHand.length;

        return numCards > 0;
    }
};

export { CastlePlayer };