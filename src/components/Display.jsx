import { Web3DriveContext } from "../context/Web3Drivecontext";
import React, { useState, useContext } from "react";
import "./Display.css";
import Image from "./Image";
const Display = () => {
  const { contract, account } = useContext(Web3DriveContext);
  const [urls, setUrls] = useState([]);
  const [display, setDisplay] = useState(false);
  const [data, setData] = useState("");

  const fetchUrls = async () => {
    if (display) {
      setDisplay(false);
      return;
    }
    setDisplay(true);
    try {
      var newAccount = account;
      if (data) {
        newAccount = data;
      }
      const fetchedUrls = await contract.display(newAccount);
      setUrls(fetchedUrls);
      console.log(urls);
    } catch (err) {
      console.log("getting error while fetching images from blockChian");
    }
  };
  return (
    <div className="display">
      <button className="display-btn" onClick={fetchUrls}>
        Display
      </button>
      <input
        type="text"
        className="text"
        placeholder="Accessible address"
        onChange={(e) => setData(e.target.value)}
      />
      {display && (
        <div className="display-conatiner">
          {
            urls.map((url,index)=>{
              return(
                <Image key={index} url={url}/>
              )
            })
          }
        </div>
      )}
    </div>
  );
};

export default Display;