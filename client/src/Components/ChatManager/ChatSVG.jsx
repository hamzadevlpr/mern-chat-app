import React from 'react'
import chat_svg from '../../assets/mobile.svg';
import { UserRound } from 'lucide-react';
function ChatSVG() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    return (

        <>
            <div className="flex flex-col h-screen bg-gray-200">
                <div className="flex flex-row items-center justify-center h-full">
                    <div className="flex flex-row flex-wrap items-center justify-center gap-5">
                        <div>
                            <img src={chat_svg} className="w-96 rounded-full object-cover" alt="Chat illustration" />
                        </div>
                        <div className="flex flex-row items-center justify-center gap-2">
                            {user.profilePic ? (
                                <img
                                    className="h-20 w-20 rounded-full object-cover"
                                    src={user.profilePic}
                                    alt={user.fullName}
                                />
                            ) : (
                                <UserRound
                                    className="bg-white h-20 w-20 rounded-full object-cover p-5 text-gray-600"
                                />
                            )}
                            <div className="flex flex-col items-center justify-center">
                                <p className="text-2xl font-bold">Welcome to YooChat</p>
                                <p className="text-md font-medium text-center">Select a chat or create <br /> new chat to start messaging</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ChatSVG