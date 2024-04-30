import React , { useState } from 'react';
import { FaExclamationCircle } from 'react-icons/fa';
import './MetaMask.css';

function MetaMask({ accountAddress, userBalance, errorMessage }) {
    const [isHovering, setIsHovering] = useState(false);

    return (
        <div className="metamask-info">
            <div>
                <FaExclamationCircle
                    onMouseEnter={() => setIsHovering(true)}
                    onMouseLeave={() => setIsHovering(false)}
                />
                {isHovering && (
                    <div className="metamask-tooltip">
                        Hesap seçmek veya değiştirmek için ilk olarak tarayıcı üzerinde yer alan MetaMask uygulamasından hesap seçmeli veya değiştirmelisiniz.
                        Daha sonra sayfada yer alan Connect Wallet butonuna tıklamanız gerekmektedir.
                    </div>
                )}
            </div>

            <div>Wallet Address: {accountAddress}</div>
            <div>Wallet Balance: {userBalance}</div>
            {errorMessage}
        </div>
    );
}

export default MetaMask;
