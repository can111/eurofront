import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

function WalletInfo() {
    const [accountsInfo, setAccountsInfo] = useState({});

    useEffect(() => {
        const loadAccountsData = async () => {
            if (window.ethereum) {
                const web3 = new Web3(window.ethereum);
                try {
                    const accounts = await web3.eth.getAccounts();
                    const accountsData = {};

                    for (let account of accounts) {
                        const balance = await web3.eth.getBalance(account);
                        accountsData[account] = web3.utils.fromWei(balance, 'ether');
                    }

                    setAccountsInfo(accountsData);
                } catch (error) {
                    console.error('Error fetching accounts', error);
                }
            } else {
                console.log('Ethereum object not found, install MetaMask.');
            }
        };

        loadAccountsData();
    }, []);

    return (
        <div>
            <h1>MetaMask Accounts Info</h1>
            <ul>
                {Object.entries(accountsInfo).map(([account, balance], index) => (
                    <li key={index}>{account} has a balance of {balance} ETH</li>
                ))}
            </ul>
        </div>
    );
}

export default WalletInfo;
