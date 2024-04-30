import React from 'react';
import { FaWallet } from 'react-icons/fa';
import './Header.css';

function Header({onConnectClick}) {
    const handleClick = () => {
        onConnectClick();
    };

    return (
        <div className="header">
            <button onClick={handleClick} className="connect-wallet-button">
                <FaWallet className="metamask-icon"/> <span className="button-text">
                    Connect Wallet
                </span>
            </button>
        </div>);
}

export default Header;
