import React, {useState, useEffect} from 'react';
import {useNavigate, useLocation} from 'react-router-dom';
import {FiArrowLeft} from 'react-icons/fi';
import Modal from "../components/Modal";
import {metamaskAccountsInfo} from '../../services/httpContextAccessor.js';
import TokenBuySellConfirmModel from "../../models/TokenBuySellConfirmModel";
import './TokenBuySell.css';

function formatSaleablePrice(saleablePrice) {
    return new Intl.NumberFormat('tr-TR', {
        style: 'decimal',
        minimumFractionDigits: 0
    }).format(saleablePrice);
}

function TokenBuySell() {
    let navigate = useNavigate();
    const isLabelField = label => label === "AMOUNT" || label === "ACCOUNT";
    const bsmv = 0.01;

    const location = useLocation();
    const tokenBuySell = location.state || {};

    // tokenBuySell VARIABLES
    const instrumentTokenId = tokenBuySell.instrumentTokenId;
    const isinCode = tokenBuySell.isinCode;
    const type = tokenBuySell.type;
    const buyPrice = tokenBuySell.buyPrice;
    const sellPrice = tokenBuySell.sellPrice;
    const commissionPercent = tokenBuySell.commissionPercent;
    const currency = tokenBuySell.currency;
    const contractABI = tokenBuySell.contractABI;
    const contractAddress = tokenBuySell.contractAddress;
    const quantity = tokenBuySell.quantity;
    const processType = tokenBuySell.processType;

    // FORMATTED VARIABLES
    const formattedType = type.charAt(0) + type.slice(1).toLowerCase();
    const avatarCode = isinCode.toString().substring(0, 2).toUpperCase();
    const shortIsinCode = isinCode.toString().split(' ')[0].toUpperCase();
    const longIsinCode = isinCode.toUpperCase();
    const price = processType === 'BUY' ? buyPrice : sellPrice;
    const formattedPrice = price === undefined ? 0 : price.toLocaleString('tr-TR', {minimumFractionDigits: 2});
    const splitSaleablePrice = (saleablePrice) => {
        const parts = saleablePrice.toString().split('.');
        const integerPart = parts[0];
        const decimalPart = parts[1] === undefined ? "00" : parts[1];
        return {
            formattedIntegerPart: formatSaleablePrice(integerPart),
            decimalPart
        };
    };
    const {
        formattedIntegerPart,
        decimalPart
    } = splitSaleablePrice(price === undefined || quantity === undefined ? 0 : price * quantity);

    // USE STATE
    const [amount, setAmount] = useState('');
    const [formattedTotalPrice, setFormattedTotalPrice] = useState('0,00');
    const [selectedAccount, setSelectedAccount] = useState('');
    const [selectedBalance, setSelectedBalance] = useState('');
    const [showAmountError, setShowAmountError] = useState(false);
    const [showAccountError, setShowAccountError] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [accountsInfo, setAccountsInfo] = useState([]);

    const goBackPage = () => {
        navigate(-1);
    };
    const handleAmountChange = (e) => {
        const newAmount = e.target.value;
        const regex = /^[0-9\b]+$/;

        if (newAmount === '' || regex.test(newAmount)) {
            setAmount(newAmount);
            const newTotalPrice = (price * newAmount).toFixed(2).replace('.', ',');
            setFormattedTotalPrice(newTotalPrice);
            setShowAmountError(false);
        }
    };
    const handleAmountKeyUp = (e) => {
        if (e.key === 'Backspace' || e.key === 'Delete') {
            if (!e.target.value || e.target.value === "") {
                setShowAmountError(true);
            } else {
                setShowAmountError(false);
            }
        }
    };
    const handleAccountChange = (event) => {
        const account = event.target.value;
        const accountData = accountsInfo.find(a => a.account === account);
        setSelectedAccount(account);
        setSelectedBalance(accountData ? accountData.balance : 'No balance available');
        setShowAccountError(false);
    };
    const handleConfirmClick = () => {
        if (!amount || parseInt(amount) === 0) {
            setErrorMessage('Geçerli bir Adet değeri giriniz.');
            setShowModal(true);
        } else if (!selectedAccount || selectedAccount === '') {
            setErrorMessage('İşlem yapılacak hesabı seçiniz.');
            setShowModal(true);
        } else {
            const totalPrice = formattedTotalPrice.replace(',', '.');
            const tokenBuySellConfirm = new TokenBuySellConfirmModel(instrumentTokenId,formattedType, avatarCode, shortIsinCode, longIsinCode, price, amount, totalPrice, currency, contractABI, contractAddress, commissionPercent, bsmv, processType, selectedAccount, selectedBalance)
            navigate('/token-buy-sell-confirm', {state: tokenBuySellConfirm});
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await metamaskAccountsInfo();
                setAccountsInfo(response);
            } catch (error) {
                console.error(error);
            }
        };
        fetchData();
    }, []);


    return (
        <div className="token-buy-sell-container">
            <div className="token-buy-sell-header">
                <button onClick={goBackPage} className="back-button">
                    <FiArrowLeft size={24}/>
                </button>
                <h1 className="title">{formattedType} {processType === 'BUY' ? 'Alım' : 'Satım'}</h1>
            </div>
            <div className="token-buy-sell-info-box">
                <div className="symbol-section">
                    <div className="avatarCode">{avatarCode}</div>
                    <div className="token-description">
                        <div className="shortIsinCode">{shortIsinCode}</div>
                        <div className="longIsinCode">{longIsinCode}</div>
                    </div>
                </div>
                <hr/>
                <div className="price-section">
                    <div className="priceText">Son fiyat</div>
                    <div className="priceValue">{formattedPrice} {currency}</div>
                    <div className="change">-0,10 {currency}</div>
                    <div className="percent">(%0,05)</div>
                </div>
                {processType === 'SELL' && (
                    <div className="saleable-section">
                        <hr/>
                        <div className="containerSaleablePrice">
                            <span>Satılabilir tutar</span>
                            <div className="saleable-value">
                                <span className="integer-part">{formattedIntegerPart}</span>
                                <span className="decimal-part">,{decimalPart}</span>
                                <span className="currency">{currency}</span>
                            </div>
                        </div>

                        <div className="containerAmount">
                            <span>Satılabilir adet</span>
                            <span>{quantity}</span>
                        </div>

                    </div>)}
            </div>
            <div className="token-buy-sell-details">
                <div className="form-group">
                    <label>BİRİM FİYAT</label>
                    <input type="text" value={formattedPrice} readOnly/>
                </div>
                <div className="form-group">
                    <label htmlFor="token-buy-sell-amount">ADET</label>
                    <input
                        type="text"
                        id="token-buy-sell-amount"
                        name="amount"
                        value={amount}
                        onChange={handleAmountChange}
                        onKeyUp={handleAmountKeyUp}
                        onBlur={() => {
                            if (!amount || amount === "") {
                                setShowAmountError(true);
                            }
                        }}
                        placeholder="Lütfen adedi yaz"
                        className={`form-control ${showAmountError && isLabelField("AMOUNT") ? 'error' : ''}`}
                    />
                    {showAmountError && isLabelField("AMOUNT") && (
                        <div className="error-message">
                            <span className="info-icon-error">i</span>
                            Bu alan zorunludur.
                        </div>
                    )}
                </div>
                <div className="form-group">
                    <label>TUTAR</label>
                    <input type="text" value={`${formattedTotalPrice} ${currency}`} readOnly/>
                </div>
            </div>
            <div className="token-buy-sell-accounts">
                <div className="form-group">
                    <label>GÖNDEREN</label>
                    <select
                        value={selectedAccount}
                        onChange={handleAccountChange}
                        onBlur={() => {
                            if (!selectedAccount || selectedAccount === "") {
                                setShowAccountError(true);
                            }
                        }}
                        className={`form-control ${showAccountError && isLabelField("ACCOUNT") ? 'error' : ''}`}
                    >
                        <option value="">Select an account</option>
                        {accountsInfo.map((item, index) => (
                            <option key={index} value={item.account}>
                                {item.account} - {item.balance} ETH
                            </option>
                        ))}
                    </select>
                    {showAccountError && isLabelField("ACCOUNT") && (
                        <div className="error-message">
                            <span className="info-icon-error">i</span>
                            Bu alan zorunludur.
                        </div>
                    )}
                    {selectedAccount && (
                        <>
                            <label>Selected Account: {selectedAccount}</label>
                            <label>Selected Balance: {selectedBalance} ETH</label>
                        </>
                    )}
                </div>
            </div>
            <button onClick={handleConfirmClick} className="token-buy-sell-button">Devam</button>
            {showModal && <Modal onClose={() => setShowModal(false)} errorMessage={errorMessage}/>}
        </div>
    );
}

export default TokenBuySell;
