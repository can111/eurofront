import React, {useState} from "react";
import {ethers} from 'ethers'
import Header from '../dashboard/Header.js';
import MetaMask from '../dashboard/MetaMask.js';
import MyAssets from '../dashboard/MyAssets.js';
import './Dashboard.css';

function Dashboard(){
    const [errorMessage, setErrorMessage] = useState(null);
    const [accountAddress, setAccountAddress] = useState(null);
    const [userBalance, setUserBalance] = useState(null);

    const handleConnectClick = (isConnected) => {
        if (window.ethereum && window.ethereum.isMetaMask) {
            console.log('MetaMask Here!');

            window.ethereum.request({method: 'eth_requestAccounts'})
                .then(result => {
                    accountChangedHandler(result[0]);
                    getAccountBalance(result[0]);
                })
                .catch(error => {
                    setErrorMessage(error.message);
                });
        } else {
            console.log('Need to install MetaMask');
            setErrorMessage('Please install MetaMask browser extension to interact');
        }
    };
    const accountChangedHandler = (newAccount) => {
        console.log('New Account: ', newAccount);
        setAccountAddress(newAccount);
        setErrorMessage(null);
        getAccountBalance(newAccount.toString());
    }
    const getAccountBalance = (account) => {
        window.ethereum.request({method: 'eth_getBalance', params: [account, 'latest']})
            .then(balance => {
                setUserBalance(ethers.utils.formatEther(balance));
                setErrorMessage(null);
            })
            .catch(error => {
                setErrorMessage(error.message);
            });
    };

    return (
        <div className="dashboard-content">
            <Header onConnectClick={handleConnectClick}/>
            <MetaMask accountAddress={accountAddress} userBalance={userBalance} errorMessage={errorMessage}/>
            <MyAssets/>
        </div>
    );
}

export default Dashboard;