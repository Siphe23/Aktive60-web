import React from 'react';

const LocationSettings = () => {
    return (
        <div className='settings-container'>
            <h1 className='titlesettings'>Location Settings</h1>
            <div className='offerings'>
            <h2>Package offerings</h2>
            <button className='package-btn'>Basic Package</button>
            <button className='package-btn'>Premium Package</button>
        </div>
        </div>
    );
};

export default LocationSettings;