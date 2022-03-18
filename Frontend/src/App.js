import logo from './logo.svg';
import './App.css';
import { CastleCardSuit, CastleCardValue } from './Classes/CastleCard';
import { UnoCardColor, UnoCardType, UnoCardNumber, UnoCardAction } from './Classes/UnoCard';
import { CastleCardComponent } from './Components/CastleCard/CastleCardComponent';
import { UnoCardComponent } from './Components/UnoCard/UnoCardComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CastleCardComponent suit={CastleCardSuit.Hearts} value={CastleCardValue.King} height="200px" front={true} />
        <CastleCardComponent suit={CastleCardSuit.Hearts} value={CastleCardValue.King} height="200px" front={false} />
        <UnoCardComponent color={UnoCardColor.Blue} cardType={UnoCardType.Number} cardValue={UnoCardNumber.Zero} front={true} height="210px" />
        <UnoCardComponent color={UnoCardColor.Blue} cardType={UnoCardType.Number} cardValue={UnoCardNumber.Zero} front={false} height="210px" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
