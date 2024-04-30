import { InstrumentsServices,TransactionsServices } from '../services';
import Web3 from 'web3';
export const readInstruments = async () => {
    try {
        const response = await InstrumentsServices.readInstruments();
        return response.data.map(item => ({
            instrumentTokenId:item.id,
            expireDate: item.expireDate.split('T')[0],
            isinCode: item.isinCode,
            type: item.type,
            buyPrice: parseFloat(item.buyPrice),
            sellPrice: parseFloat(item.sellPrice),
            commissionPercent: parseFloat(item.commissionPercent),
            currency: item.currency,
            contractABI: JSON.parse("[" + item.abi + "]") ,
            contractAddress:item.contractAddress,
            isActive: item.isActive ? 'Active' : 'Inactive',
        }));
    } catch (err) {
        console.error('An error occurred:', err);
        throw err;
    }
};

export const createTransactions = async (requestData) => {
    try {
        const response = await TransactionsServices.createTransactions(requestData);
        return response.data.map(item => ({
            txStatus: item.txStatus,
            id: item.id,
            instrumentTokenId: item.instrumentTokenId,
            customerWalletAddress: item.customerWalletAddress,
            transactionHash: item.customerWalletAddress,
            transferType: item.customerWalletAddress,
            purchasedCurrency: item.customerWalletAddress,
            purchasedAmount: item.purchasedAmount,
            unitPrice: item.unitPrice,
            totalPrice: item.totalPrice,
            commissionPercent: item.commissionPercent,
            txRequestDate: item.txRequestDate,
            txCompletionDate: item.txCompletionDate,
        }));
    } catch (err) {
        console.error('An error occurred:', err);
        throw err;
    }
};

export const metamaskAccountsInfo = async () => {
    let accountsData = [];

    if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
            const accounts = await web3.eth.getAccounts();
            accountsData = await Promise.all(accounts.map(async (account) => {
                const balance = await web3.eth.getBalance(account);
                return {
                    account,
                    balance: web3.utils.fromWei(balance, 'ether')
                };
            }));
        } catch (error) {
            console.error('Error fetching accounts', error);
        }
    } else {
        console.log('Ethereum object not found, install MetaMask.');
    }

    return accountsData;
};
