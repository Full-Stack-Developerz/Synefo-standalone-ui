import React from 'react';

const ToggleButton = ({ isOn, onChange}) => {

    const toggle = () => {
        onChange(!isOn); 
    };

    return (
        <div
            className={`w-16 h-8 flex items-center drop-shadow-md rounded-full p-[3px] cursor-pointer ${isOn ? 'bg-gray-50 ' : 'bg-gray-100'}`}
            onClick={toggle}
        >
            <div
                className={` w-7 h-7 rounded-full shadow-md transform transition-transform duration-300 ease-in-out ${
                    isOn ? 'translate-x-7 bg-green-400' : 'bg-gray-300'
                }`}
            />
        </div>
    );
};

export default ToggleButton;
