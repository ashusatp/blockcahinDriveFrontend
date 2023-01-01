import "./App.css";
import { Web3DriveContext } from "./context/Web3Drivecontext";
import React, { useState, useEffect, useContext } from "react";
import FileUpload from "./components/FileUpload";
import Display from "./components/Display";
import Modal from "./components/Modal";
function App() {
  const { account, checkIfWalletConnected, connectwallet } =
    useContext(Web3DriveContext);
  const [openModal, setOpenModal]=useState(false);

  const closeModal = () => {
    setOpenModal(false);
  }

  useEffect(() => {
    checkIfWalletConnected();
  }, [checkIfWalletConnected]);

  return (
    <>
      <div className="App">
        <button className="share" onClick={()=>setOpenModal(true)}>Share</button>
        {openModal && <Modal closeModal={closeModal}/>}
        <h1 className="heading">WEB3 DRIVE</h1>
        {account ? (
          <h4 className="account">Account: {account}</h4>
        ) : (
          <button onClick={connectwallet} className="btn">
            Connect to MetaMask
          </button>
        )}
        <FileUpload />
        <Display />
      </div>
    </>
  );
}

export default App;
