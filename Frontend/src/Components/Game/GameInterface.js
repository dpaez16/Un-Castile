import React, {Component} from 'react';
import { createCastleDeck } from '../../Classes/CastleCard';
import { createUnoDeck } from '../../Classes/UnoCard';
import { CastleCardComponent } from '../CastleCard/CastleCardComponent';
import { UnoCardComponent } from '../UnoCard/UnoCardComponent';
import "./GameInterface.css";

export class GameInterface extends Component {
    static UNO = "Uno";
    static CASTLE = "Castle";

    constructor(props) {
        super(props);

        // just for testing purposes (need to invoke UnCastileGame class for maintaining game state)
        const castleCards = createCastleDeck();
        const unoCards = createUnoDeck();

        this.state = {
            currentGame: undefined,
            castleCards: castleCards.splice(0, 3),
            unoCards: unoCards.splice(0, 7)
        };
    }

    updateInterface = (event) => {
        const selectedGame = event.target.value;
        this.setState({
            currentGame: selectedGame
        });
    }

    render() {
        return (
            <div className="un-castile-game-interface">
                <div>
                    <select defaultValue="" onChange={this.updateInterface}>
                        <option value="" disabled>Select Game</option>
                        <option>{GameInterface.UNO}</option>
                        <option>{GameInterface.CASTLE}</option>
                    </select>
                </div>
                {
                    this.state.currentGame === GameInterface.UNO && 
                    this.state.unoCards.map((e, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <UnoCardComponent color={e.color} cardType={e.type} cardValue={e.value} faceUp={e.faceUp} height={210} />
                            </React.Fragment>
                        );
                    })
                }
                {
                    this.state.currentGame === GameInterface.CASTLE &&
                    this.state.castleCards.map((e, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <CastleCardComponent suit={e.suit} value={e.value} faceUp={e.faceUp} height={210} />
                            </React.Fragment>
                        );
                    })
                }
            </div>
        );
    };
};