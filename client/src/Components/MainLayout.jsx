import React from 'react'
import ChatInterface from './ChatManager/ChatInterface'
import Sidebar from './Sidebar'

function MainLayout() {
    return (
        <div className="flex h-screen antialiased text-gray-800">
            <div className="flex flex-row h-full w-full overflow-hidden">
                <Sidebar />
                <div className="flex flex-col flex-auto h-full">
                    <ChatInterface />
                </div>
            </div>
        </div>
    )
}

export default MainLayout