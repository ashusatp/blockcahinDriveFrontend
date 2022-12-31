import "./App.css";
import { Web3DriveContext } from "./context/Web3Drivecontext";
import React, { useState, useEffect, useContext } from "react";
function App() {
  const { account, checkIfWalletConnected, connectwallet } = useContext(Web3DriveContext);

  return (
    <div className="App">
      App
      <h1>{account}</h1>
      {!account && <button onClick={connectwallet}>Connect</button>}
    </div>
  );
}

export default App;
