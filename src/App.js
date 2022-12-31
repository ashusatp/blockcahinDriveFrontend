import "./App.css";
import { Web3DriveContext } from "./context/Web3Drivecontext";
import React, { useState, useEffect, useContext } from "react";
import FileUpload from './components/FileUpload';
function App() {
  const { account, checkIfWalletConnected, connectwallet } = useContext(Web3DriveContext);

  useEffect(()=>{
    checkIfWalletConnected();
  },[checkIfWalletConnected])

  return (
    <div className="App">
      <h1 className="heading">WEB3 DRIVE</h1>
      {account 
        ? <h4 className="account">Account: {account}</h4>
        :<button onClick={connectwallet} className="btn">Connect to MetaMask</button>
      }
      <FileUpload/>
    </div>
  );
}

export default App;
