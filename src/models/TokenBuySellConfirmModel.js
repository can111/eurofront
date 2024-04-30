class TokenBuySellConfirmModel {
    constructor(instrumentTokenId,type,avatarCode,shortIsinCode,longIsinCode,price,amount,totalPrice,currency,contractABI,contractAddress,commisionRate,bsmv,processType,selectedAccount,selectedBalance) {
        this.instrumentTokenId = instrumentTokenId;
        this.type = type;
        this.avatarCode = avatarCode;
        this.shortIsinCode = shortIsinCode;
        this.longIsinCode = longIsinCode;
        this.price = price;
        this.amount = amount;
        this.totalPrice = totalPrice;
        this.currency = currency;
        this.contractABI = contractABI;
        this.contractAddress = contractAddress;
        this.commisionRate = commisionRate;
        this.bsmv = bsmv;
        this.processType = processType;
        this.selectedAccount = selectedAccount;
        this.selectedBalance = selectedBalance;
    }
    update(newData) {
        Object.assign(this, newData);
    }
}

export default TokenBuySellConfirmModel;
