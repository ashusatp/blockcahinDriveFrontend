import React, { useState, useEffect} from "react";
import { ethers } from "ethers";
import {contractAddress,contractABI} from './contractDetails';


//--- Fetch smart Contract
const fetchContract = (signerOrProvider) => new ethers.Contract(contractAddress,contractABI,signerOrProvider);
//--- connect with smart contract
const connectWithSmartContract = () =>{
    try{
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const contract = fetchContract(signer);
        return contract; 
    }catch(err){
        console.log("something went wrong while connecting with contract");
    }
}



export const Web3DriveContext = React.createContext();


export const Web3DriveProvider = ({children}) =>{
    //--- useStates
    const [account,setAccount] = useState(null);
    const [contract , setContract] = useState(null);
    
    //--- check if wallet is connected
    const checkIfWalletConnected = async () =>{
        try{
            if(!window.ethereum){
                alert("Please Install MetaMask");
            }

            const accounts = await window.ethereum.request({
                method: "eth_accounts"
            });

            window.ethereum.on("accountsChanged", () => {
                window.location.reload();
            });

            if(accounts.length){
                setAccount(accounts[0]);
            }else{
                console.log("No account found");
            }
        }catch(error){
            console.log("Something went wrong while connecting to wallet");
        }
    }

    //connect with Wallet Function
    const connectwallet = async () =>{
        try{
            if(!window.ethereum){
                alert("Please Install MetaMask");
            }
            const accounts = await window.ethereum.request({
                method: "eth_requestAccounts"
            });
            setAccount(accounts[0]);
        }catch(err){
            console.log("Error while connecting with wallet");
        }
    }

    useEffect(()=>{
        const contract = connectWithSmartContract();
        setContract(contract);
    },[]);

    return(
        <Web3DriveContext.Provider value={{
            contract,
            account,
            checkIfWalletConnected,
            connectwallet
        }}>
            {children}
        </Web3DriveContext.Provider>
    )
}