import React, {Component} from 'react';
import { GameInterface } from './GameInterface';
import "./Game.css";

export class Game extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <GameInterface />
            </div>
        );
    };
};