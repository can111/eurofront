import React from "react";
import './AddAsset.css';
import { FaAsterisk } from 'react-icons/fa';
function AddAsset({closeModal}) {
    function validateIsinCode(event) {
        const input = event.target;
        const isinCodeWarning = document.getElementById('addAsset-isinCodeWarning');
        if (!input.value.trim()) {
            isinCodeWarning.style.display = 'block';
        } else {
            isinCodeWarning.style.display = 'none';
        }
    }

    function validateAmount(event) {
        let {value} = event.target;
        value = value.replace(/[^0-9.]/g, '').replace(/(\..*?)\..*/g, '$1');
        const amountWarning = document.getElementById('addAsset-amountWarning');

        if (value.includes('.')) {
            const parts = value.split('.');
            if (parts[1].length > 2) {
                amountWarning.style.display = 'block';
            } else {
                amountWarning.style.display = 'none';
            }
        }

        event.target.value = value;
    }


    return (
        <div className="addAsset-background">
            <div className="addAsset">
                <div className="addAsset-background">
                    <div className="addAsset">
                        <div className="addAsset-header">
                            <span>ADD ASSET</span>
                            <button onClick={closeModal} className="addAsset-close-button">&times;</button>
                        </div>
                        <div className="addAsset-body">
                            <form>
                                <label htmlFor="addAsset-expireDate">EXPIRE DATE <FaAsterisk color="red" size="0.6em" /> </label>
                                <input type="date" id="addAsset-expireDate" required/>

                                <label htmlFor="addAsset-isinCode">ISIN CODE <FaAsterisk color="red" size="0.6em" /></label>
                                <input type="text" id="addAsset-isinCode" onInput={validateIsinCode} required/>
                                <div id="addAsset-isinCodeWarning" style={{display: 'none', color: 'red'}}>
                                    Isin Code Değeri Girilmeli
                                </div>

                                <label htmlFor="addAsset-type">TYPE <FaAsterisk color="red" size="0.6em" /></label>
                                <select id="addAsset-type" required>
                                    <option value="TAHVIL">TAHVİL</option>
                                    <option value="BONO">BONO</option>
                                    <option value="EUROBOND">EUROBOND</option>
                                </select>

                                <label htmlFor="addAsset-amount">AMOUNT <FaAsterisk color="red" size="0.6em" /></label>
                                <input type="text" id="addAsset-amount" required onInput={validateAmount}/>
                                <div id="addAsset-amountWarning" style={{display: 'none', color: 'red'}}>
                                    Ondalık kısmı maksimum 2 karakter olmalıdır.
                                </div>

                                <label htmlFor="addAsset-currency">CURRENCY <FaAsterisk color="red" size="0.6em" /></label>
                                <select id="addAsset-currency" required>
                                    <option value="USDC">USDC</option>
                                    <option value="USDT">USDT</option>
                                </select>

                            </form>
                        </div>
                        <div className="addAsset-footer">
                            <button type="submit" className="save-button">Save</button>
                            <button onClick={closeModal} type="button" className="cancel-button">Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>);
}

export default AddAsset;