import { Web3DriveContext } from "../context/Web3Drivecontext";
import React, {useEffect, useState, useContext } from "react";
import "./Modal.css";
import CancelRoundedIcon from "@mui/icons-material/CancelRounded";
const Modal = ({ closeModal }) => {
  //---useContext
  const { contract } = useContext(Web3DriveContext);

  //---useStates
  const [removeAccessLoading, setRemoveAccessLoading] = useState(false);
  const [accessLoading, setAccessLoading] = useState(false);
  const [userHaveAccess, setUserHaveAccess] = useState([]);
  const [addressToGiveAccess, setAddressToGiveAccess] = useState("");
  const [addressToRemoveAccess, setAddressToRemoveAccess]= useState("");

  //--- Logic for giving access to the user
  const giveAccess = async () => {
    try {
      const access = await contract.giveAccess(addressToGiveAccess);
      setAccessLoading(true);
      await access.wait();
      setAccessLoading(false);
      setAddressToGiveAccess("");
      closeModal();
    } catch (err) {
      console.log("Error while giving access to the user");
    }
  };
  
  //--- Logic for removing access from user
  const removeAccess = async() =>{
    try {
      const removeAccess = await contract.removeAccess(addressToRemoveAccess);
      setRemoveAccessLoading(true);
      await removeAccess.wait();
      setRemoveAccessLoading(false);
      setAddressToRemoveAccess("");
      closeModal();
    } catch (err) {
      console.log("Error while removing access from the user");
    }
  }

  //---useEffect
  useEffect(()=>{ 
    //---getAccessList
    const getAccessList= async() =>{
      try {
        const AccessList = await contract.shareAccess();
        const ActualList = AccessList.filter((user)=>{
          return user.access === true;
        });
        setUserHaveAccess(ActualList);
        console.log(AccessList);
      } catch (err) {
        console.log("Error while fetching access list");
      }
    }
    getAccessList();
  },[contract,userHaveAccess]);

  return (
    <div className="modal">
      <CancelRoundedIcon
        className="closeModal"
        style={{ fontSize: 40 }}
        onClick={closeModal}
      />
      {!accessLoading && !removeAccessLoading  ? (
        <div className="modal-section">
          <h3>Enter Address</h3>
          <input
            className="givingAccess"
            type="text"
            placeholder="Enter address"
            onChange={(e) => setAddressToGiveAccess(e.target.value)}
          />
          <button className="access-btn" onClick={giveAccess}>
            Give Access
          </button>
          <form className="modal-form">
            <select id="selectAdd" onChange={e=>{setAddressToRemoveAccess(e.target.value)}}>
              <option className="address-Access">Users having Access</option>
              {
                userHaveAccess.map((user,index)=>{
                  return <option key={index} className="address-Access">{user.user}</option>
                })
              }
            </select>
          </form>
          <button className="r-access-btn" onClick={removeAccess}>
            Remove Access
          </button>
        </div>
      ) :accessLoading && !removeAccessLoading? (
        <div className="loading modal-section">
          <div className="loader"></div>
          <h4>Giving Access To The User</h4>
        </div>
      ):(<div className="loading modal-section">
          <div className="loader"></div>
          <h4>Removing Access From The User</h4>
        </div>)}
    </div>
  );
};

export default Modal;
