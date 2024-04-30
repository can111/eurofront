class TokenBuySellModel {
    constructor(instrumentTokenId,expireDate, isinCode, type, buyPrice, sellPrice, commissionPercent, currency,contractABI,contractAddress, quantity, processType) {
        this.instrumentTokenId = instrumentTokenId;
        this.expireDate = expireDate;
        this.isinCode = isinCode;
        this.type = type;
        this.buyPrice = buyPrice;
        this.sellPrice = sellPrice;
        this.commissionPercent = commissionPercent;
        this.currency = currency;
        this.contractABI = contractABI;
        this.contractAddress = contractAddress;
        this.quantity = quantity;
        this.processType = processType;
    }
    update(newData) {
        Object.assign(this, newData);
    }
}

export default TokenBuySellModel;
