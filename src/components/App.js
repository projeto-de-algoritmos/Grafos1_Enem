import "./App.css";
import Sala from "./Sala/Sala";

function App() {

  return (
    <div className="App">
      <header className="App-header">
        <label className="App-label">FGA</label>
        <label className="App-label" style={{ fontSize: "32px" }}>
          Mocap 2022
        </label>
        <button className="App-header-button" >Instruções</button>
      </header>
      <div className="App-body">
        <Sala />
      </div>

    </div>
  );
}

export default App;
