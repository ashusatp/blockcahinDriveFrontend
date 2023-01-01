import React from "react";
import "./Image.css";
const Image = ({ url }) => {
  return (
    <div className="image-container">
      <a href={`https://gateway.pinata.cloud/ipfs/${url.substring(6)}`}>
        <img
          src={`https://gateway.pinata.cloud/ipfs/${url.substring(6)}`}
          alt="asserts"
          className="image"
        />
      </a>
    </div>
  );
};

export default Image;
