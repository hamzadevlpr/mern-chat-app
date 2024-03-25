import React, { useContext, useEffect, useState } from 'react';
import { Menu, MessageSquareDashed, UserRound } from 'lucide-react';
import MyDropdown from './Profile/MyDropdown';
import Chats from './ChatManager/Chats';
import { Context } from './Context';
import ChatInterface from './ChatManager/ChatInterface'
import SideSidebar from './Sidebar'

function Sidebar() {
    const [user] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const { menuOpen } = useContext(Context);

    return (
        <>
            <div className={`z-100 flex-col py-8 px-5 w-72 bg-white flex-shrink-0 ${menuOpen ? 'hidden sm:block' : ''}`}>

                <div className="flex flex-row items-center justify-center h-12 w-full">
                    <div className="relative flex items-center justify-center rounded-2xl text-indigo-700 bg-indigo-100 h-10 w-10">
                        <MessageSquareDashed />
                    </div>
                    <div className="ml-2 font-bold text-2xl">YooChat</div>
                </div>
                <div className="relative flex flex-col items-center bg-indigo-100 border-gray-200 mt-4 w-full py-6 px-4 rounded-lg">
                    <div className="h-20 w-20 rounded-full border border-gray-300 overflow-hidden">
                        {user.profilePic ? (
                            <img
                                className="h-full w-full object-cover"
                                src={user.profilePic}
                                alt="User"
                            />
                        ) : (
                            <UserRound
                                className="bg-white p-5 h-full w-full object-cover text-gray-600"
                            />
                        )}
                    </div>
                    <div className="text-sm font-semibold mt-2">{user.fullName}</div>
                    <div className="text-xs text-gray-500">{user.about}</div>
                    <div className="flex flex-row items-center mt-3">
                        <div className="flex flex-col justify-center h-4 w-8 bg-indigo-500 rounded-full">
                            <div className="h-3 w-3 bg-white rounded-full self-end mr-1" />
                        </div>
                        <div className="leading-none ml-1 text-xs">Active</div>
                    </div>
                    <div className="absolute top-1 right-1">
                        <MyDropdown />
                    </div>
                </div>
                <Chats />
            </div>


        </>
    );
}

export default Sidebar;
