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
};

export { UnCastileGame };