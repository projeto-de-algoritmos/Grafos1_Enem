import "./App.css";
import Sala from "./Sala/Sala";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <label className="App-label">Enem 2022</label>
        <label className="App-label" style={{ fontSize: "32px" }}>
          Sala I7 - FGA
        </label>
        <button className="App-header-button">Restart</button>
      </header>
      <div className="App-body">
        <Sala />
      </div>
      
    </div>
  );
}

export default App;
