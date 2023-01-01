import { Web3DriveContext } from "../context/Web3Drivecontext";
import React, { useState, useContext } from "react";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import SentimentDissatisfiedRoundedIcon from "@mui/icons-material/SentimentDissatisfiedRounded";
import "./Display.css";
import Image from "./Image";
const Display = () => {
  //---useContext
  const { contract, account } = useContext(Web3DriveContext);

  //---useStates
  const [display, setDisplay] = useState(false);
  const [fetchingError, setFetchingError] = useState(false);
  const [nothing, setNothing] = useState(false);
  const [urls, setUrls] = useState([]);
  const [data, setData] = useState("");

  //---Logic for fetching urls
  const fetchUrls = async () => {
    setFetchingError(false);
    setNothing(false);
    // if (display) {
    //   setDisplay(false);
    //   return;
    // }
    setDisplay(true);
    try {
      var newAccount = account;
      if (data) {
        newAccount = data;
      }
      const fetchedUrls = await contract.display(newAccount);
      if (fetchedUrls.length <= 0) {
        setNothing(true);
      }
      setUrls(fetchedUrls);
    } catch (err) {
      console.log("getting error while fetching images from blockChian");
      setFetchingError(true);
      setData("");
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
        placeholder="Enter The Accessible Address"
        value={data}
        onChange={(e) => setData(e.target.value)}
      />
      {display && (
        <div className="display-conatiner">
          {fetchingError && !nothing ? (
            <div className="error">
              <NewReleasesIcon className="errorIcon" style={{ fontSize: 80 }} />
              <h2>You don't have access of this Address</h2>
            </div>
          ) : !fetchingError && nothing ? (
            <div className="error">
              <SentimentDissatisfiedRoundedIcon className="errorIcon" style={{ fontSize: 80 }} />
              <h2>Nothing to display</h2>
            </div>
          ) : (
            urls.map((url, index) => {
              return <Image key={index} url={url} />;
            })
          )}
        </div>
      )}
    </div>
  );
};

export default Display;
