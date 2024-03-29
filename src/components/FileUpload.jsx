import "./FileUpload.css";
import { Web3DriveContext } from "../context/Web3Drivecontext";
import axios from "axios";
import React, { useState, useContext } from "react";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
const FileUpload = () => {
  //---useContext
  const { contract, account } = useContext(Web3DriveContext);

  //---useStates
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [blockChainUpload, setblockChainUpload] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFileName, setSelectedFileName] = useState(null);

  //-Logic for uploading images on IPFS and blockchain
  const upload = async (e) => {
    setError(false);
    e.preventDefault();
    if (selectedFile) {
      try {
        //creating a formdata and storing clientside uploaded file
        const formData = new FormData();
        formData.append("file", selectedFile);
        setLoading(true);
        //uploading on ipfs
        const resFile = await axios({
          method: "post",
          url: "https://api.pinata.cloud/pinning/pinFileToIPFS",
          data: formData,
          headers: {
            pinata_api_key: `0807e8eac5962baf6878`,
            pinata_secret_api_key: `
            ae5a1ab8419a3cc2c7550dd01f72ee967ce1067c96fb34c2e60995858f902b0b`,
            "Content-Type": "multipart/form-data",
          },
        });
        setLoading(false);
        setSelectedFile(null);
        setSelectedFileName(null);
        const ImgHash = `ipfs://${resFile.data.IpfsHash}`;
        const sendingURL = await contract.addURL(account, ImgHash);
        setblockChainUpload(true);
        await sendingURL.wait();
        setblockChainUpload(false);
        alert("Image uploaded Successfully");
        window.location.reload();
      } catch (err) {
        console.log(err);
        console.log("Getting error while uploading image");
        setError(true);
      }
    }
  };

  return (
    <div className="wrapper">
      {!loading && !blockChainUpload && !error ? (
        <div className="container">
          <form className="form">
            <label htmlFor="file-upload" className="choose">
              Choose Images:
            </label>
            <input
              className="input"
              type="file"
              name="data"
              disabled={!account}
              onChange={(e) => {
                setSelectedFile(e.target.files[0]);
                setSelectedFileName(e.target.files[0].name);
              }}
            />
          </form>
          {selectedFileName && <h5>{selectedFileName}</h5>}
          <button onClick={upload} className="upload">
            Upload File
          </button>
        </div>
      ) : (
        <div className="container">
          {error && !loading && !blockChainUpload ? (
            <div className="error">
              <NewReleasesIcon className="errorIcon" style={{ fontSize: 80 }} />
              <h2>Getting error while uploading image</h2>
            </div>
          ) : loading && !error && !blockChainUpload ? (
            <div className="loading">
              <div className="loader"></div>
              <h4>Uploading on IPFS</h4>
            </div>
          ) : (
            <div className="loading">
              <div className="loader"></div>
              <h4>Uploading on Blockchain</h4>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FileUpload;
