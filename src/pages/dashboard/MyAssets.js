import React, {useState} from 'react';
import {FaPlus} from 'react-icons/fa';
import AddAsset from "./AddAsset";
import MyAssetTable from "./MyAssetTable.js";
import './MyAssets.css';

function MyAssets() {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="my-assets">
            <div className="my-assets-header">
                <button onClick={openModal} className="my-assets-add-asset">
                    <FaPlus/> ADD ASSET
                </button>
                {isModalOpen && (
                   <AddAsset closeModal={closeModal}/>
                )}
            </div>
            <MyAssetTable/>
        </div>
    );
}

export default MyAssets;
