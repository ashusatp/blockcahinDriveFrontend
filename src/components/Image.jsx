import React from "react";
import "./Image.css";
const Image = ({ url }) => {
  return (
    <div className="image-container">
      <a href={`https://azure-wee-clownfish-885.mypinata.cloud/ipfs${url.substring(6)}`}>
        <img
          src={`https://azure-wee-clownfish-885.mypinata.cloud/ipfs${url.substring(6)}`}
          alt="asserts"
          className="image"
        />
      </a>
    </div>
  );
};

export default Image;
