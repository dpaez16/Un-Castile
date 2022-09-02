import React, {Component} from 'react';
import { CastleCard, createCastleDeck } from '../../Classes/CastleCard';
import { UnoCard, createUnoDeck } from '../../Classes/UnoCard';
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

    clickCard = (event) => {
        const jsonObj = JSON.parse(event.target.id);

        switch (this.state.currentGame) {
            case GameInterface.UNO:
                console.log(UnoCard.decode(jsonObj));
                break;
            case GameInterface.CASTLE:
                console.log(CastleCard.decode(jsonObj));
                break;
        }
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
                                <UnoCardComponent 
                                    card={e}
                                    height={210} 
                                    onClick={this.clickCard}
                                />
                            </React.Fragment>
                        );
                    })
                }
                {
                    this.state.currentGame === GameInterface.CASTLE &&
                    this.state.castleCards.map((e, idx) => {
                        return (
                            <React.Fragment key={idx}>
                                <CastleCardComponent 
                                    card={e}
                                    height={210}
                                    onClick={this.clickCard}
                                />
                            </React.Fragment>
                        );
                    })
                }
            </div>
        );
    };
};