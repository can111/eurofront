import React, { useEffect } from 'react';
import Web3 from 'web3';
import BN from 'bn.js';
import { useNavigate, useLocation } from 'react-router-dom';
import { FiArrowLeft } from "react-icons/fi";
import { createTransactions } from "../../services/httpContextAccessor";
import './TokenBuySellConfirm.css';

const TokenBuySellConfirm = () => {
    let navigate = useNavigate();

    const location = useLocation();
    const tokenBuySellConfirm = location.state || {};

    // tokenBuySellConfirm VARIABLES
    const instrumentTokenId = tokenBuySellConfirm.instrumentTokenId;
    const type = tokenBuySellConfirm.type;
    const avatarCode = tokenBuySellConfirm.avatarCode;
    const shortIsinCode = tokenBuySellConfirm.shortIsinCode;
    const price = tokenBuySellConfirm.price;
    const amount = tokenBuySellConfirm.amount;
    const totalPrice = tokenBuySellConfirm.totalPrice;
    const formattedTotalPrice = totalPrice.replace('.', ',');
    const currency = tokenBuySellConfirm.currency;
    const contractABI = tokenBuySellConfirm.contractABI;
    const contractAddress = tokenBuySellConfirm.contractAddress;
    const commisionRate = tokenBuySellConfirm.commisionRate;
    const bsmv = tokenBuySellConfirm.bsmv;
    const processType = tokenBuySellConfirm.processType;
    const selectedAccount = tokenBuySellConfirm.selectedAccount;
    const selectedBalance = tokenBuySellConfirm.selectedBalance;

    // FORMATTED VARIABLES
    const formattedPrice = price === undefined ? 0 : price.toLocaleString('tr-TR', { minimumFractionDigits: 2 });
    const formattedCommisionRate = commisionRate === undefined ? 0 : commisionRate.toLocaleString('tr-TR', { minimumFractionDigits: 2 });
    const formattedBsmv = bsmv === undefined ? 0 : bsmv.toLocaleString('tr-TR', { minimumFractionDigits: 2 });

    // ABI AND CONTRACT ADDRESS DEFINITION
    const web3 = new Web3(window.ethereum); // Metamask ile bağlantı kurar
    const myContract = new web3.eth.Contract(contractABI, contractAddress);
    let transactionHash;

    const goBackPage = () => {
        navigate(-1);
    };

    const buySellTokens = async () => {
        try {
            const priceInWeiString = web3.utils.toWei(price, 'ether');
            const amountToSend = new BN(priceInWeiString);

            let response;
            if (processType === 'BUY') {
                response = await myContract.methods.buyBond(amount).send({
                    from: selectedAccount, value: amount * amountToSend
                }).on('transactionHash', (hash) => {
                    transactionHash = hash;
                    console.log("BUY TOKEN TRANSACTION HASH VALUE: " , transactionHash);
                    callCreateTransactionsService();
                }).catch((error) => {
                    console.error(error);
                });
            } else {
                response = await myContract.methods.redeemBond(amount).send({
                    from: selectedAccount, value: amount * amountToSend
                }).on('transactionHash', (hash) => {
                    transactionHash = hash;
                    console.log("SELL TOKEN TRANSACTION HASH VALUE: " , transactionHash);
                    callCreateTransactionsService();
                }).catch((error) => {
                    console.error(error);
                });
            }

            console.log(response);
        } catch (error) {
            console.error('İşlem sırasında hata oluştu:', error);
        }
    }

    const callCreateTransactionsService = async () => {
        try {
            const requestData = {
                txStatus: "P",
                instrumentTokenId: instrumentTokenId,
                customerWalletAddress: selectedAccount,
                transactionHash: transactionHash,
                transferType: processType,
                purchasedAmount: amount,
                unitPrice: price,
                totalPrice: totalPrice,
                commissionPercent: commisionRate,
                purchasedCurrency: currency
            };

            const response = await createTransactions(requestData);
            console.log('Transaction created:', response);
        } catch (error) {
            console.error('Error creating transaction:', error);
        }
    };

    useEffect(() => {

    }, []);


    return (<div className="token-buy-sell-confirm-container">
        <div className="token-buy-sell-confirm-header">
            <button onClick={goBackPage} className="back-button">
                <FiArrowLeft size={24}/>
            </button>
            <h1 className="title">{type} {processType === 'BUY' ? 'Alım' : 'Satım'} Onay</h1>
        </div>
        <div className="token-buy-sell-confirm-info-box">
            <div className="avatarCode">{avatarCode}</div>
            <div className="shortIsınCode">{shortIsinCode}</div>
            <div className="priceValue">Son fiyat: {formattedPrice} {currency}</div>
            <div className="totalPriceText">TOPLAM TUTAR</div>
            <div className="totalPriceValue">{formattedTotalPrice} {currency}</div>

            <label className="label">BİRİM FİYAT</label>
            <span className="orderedPrice">{formattedPrice} {currency}</span>

            <label className="label">İŞLEM TUTARI</label>
            <span className="transactionPrice">{formattedPrice} {currency}</span>

            <label className="label">ADET</label>
            <span className="amount">{amount}</span>

            <label className="label">TOPLAM TUTAR</label>
            <span className="totalPrice">{formattedTotalPrice}</span>

            <div className="commission-item">
                <label className="label">KOMİSYON</label>
                <span className="commission-value">{formattedCommisionRate} {currency}</span>
            </div>
            <div className="commission-item">
                <label className="label">BSMV</label>
                <span className="bsmv-value">{formattedBsmv} {currency}</span>
            </div>
        </div>
        <div className="token-buy-sell-confirm-accounts">
            <label className="label">SELECTED ACCOUNT</label>
            <span className="selectedAccount">{selectedAccount}</span>

            <label className="label">SELECTED BALANCE</label>
            <span className="selectedBalance">{selectedBalance} ETH</span>
        </div>
        <button onClick={() => buySellTokens(amount, selectedAccount, price)}
                className="token-buy-sell-button"
        >
            Onaylıyorum
        </button>
    </div>);
}

export default TokenBuySellConfirm;
