import React from 'react';
import './Modal.css';

const Modal = ({ onClose, errorMessage }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal" onClick={e => e.stopPropagation()}>
                <div className="modal-content">
                    <div className="modal-header">
                        <h2 className="modal-title">Bilgilendirme</h2>
                        <span className="info-icon-warning">i</span>
                    </div>
                    <p className="modal-message">{errorMessage}</p>
                    <button onClick={onClose} className="close-modal">Tamam</button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
