import logo from './logo.svg';
import './App.css';
import { CastleCardSuit, CastleCardValue } from './Classes/CastleCard';
import { CastleCardComponent } from './Components/CastleCard/CastleCardComponent';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <CastleCardComponent suit={CastleCardSuit.Hearts} value={CastleCardValue.King} height="100px" front={true} />
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
