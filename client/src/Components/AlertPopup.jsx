import React, { useState } from 'react';
import { InfoIcon, X } from 'lucide-react';

function AlertPopup() {
    const [isVisible, setIsVisible] = useState(true);

    const hide = () => {
        setIsVisible(false);
    };

    return (
        <>
            {isVisible && (
                <div className='absolute bottom-5 right-5 w-full md:w-1/2 alert-popup'>
                    <div className="flex p-5 rounded-lg bg-white border shadow-md">
                        <button onClick={hide} className="absolute right-5 text-gray-400">
                            <X size={16} />
                        </button>
                        <div>
                            <InfoIcon />
                        </div>
                        <div className="ml-3">
                            <h2 className="font-semibold text-gray-800">Have Patience</h2>
                            <p className="mt-2 text-sm text-gray-600 leading-relaxed">
                                Our backend is currently taking some time to wake up because we have deployed it to render.com. Please be
                                patient. I'm grateful! 🙏
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default AlertPopup;
