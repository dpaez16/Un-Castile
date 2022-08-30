import React, {Component} from 'react';
import { CastleCardSuit, CastleCardValue } from '../../Classes/CastleCard';
import { UnoCardColor, UnoCardType, UnoCardNumber, UnoCardAction } from '../../Classes/UnoCard';
import { CastleCardComponent } from '../CastleCard/CastleCardComponent';
import { UnoCardComponent } from '../UnoCard/UnoCardComponent';
import "./Game.css";

export class Game extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="un-castile-game">
                <CastleCardComponent suit={CastleCardSuit.Hearts} value={CastleCardValue.King} height={200} />
                <UnoCardComponent color={UnoCardColor.Blue} cardType={UnoCardType.Number} cardValue={UnoCardNumber.Zero} height={210} />
            </div>
        );
    };
};