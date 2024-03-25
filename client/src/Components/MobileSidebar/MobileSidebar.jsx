import { Home, Settings, CircleUser } from 'lucide-react';
import React, { useState } from 'react';

function MobileSidebar() {
    const [showChats, setShowChats] = useState(false);
    const handleChatClick = () => {
        setShowChats(!showChats); 
    };

    const listItems = [
        { id: 1, name: 'Chat', icon: <Home /> },
        { id: 2, name: 'Profile', icon: <CircleUser /> },
        { id: 3, name: 'Settings', icon: <Settings /> },
    ];
    return (
        <>
            <>
                <div className="sm:hidden block absolute bottom-1 w-full border-t border-gray-200 bg-white">
                    <ul
                        className="flex flex-wrap -mb-px"
                        id="myTab"
                        data-tabs-toggle="#myTabContent"
                        role="tablist"
                    >
                        {
                            listItems.map((item) => (
                                <li
                                    className="w-1/3 text-center py-2"
                                    key={item.id}
                                    role="presentation"
                                >
                                    <a
                                        className="flex items-center justify-center gap-2 px-1 py-2 text-gray-600 hover:text-indigo-500"
                                        data-tabs-item="#chat"
                                        data-tabs-toggle="#chat"
                                        href="#"
                                        role="tab"
                                    >
                                        {item.icon}
                                        <span className='item-name'>{item.name}</span>

                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
            </>

        </>
    );
}

export default MobileSidebar;
