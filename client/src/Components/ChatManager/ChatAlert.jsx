import React from 'react'
import { Lock } from 'lucide-react';
function ChatAlert() {
    return (
        <>
            <div className="bg-indigo-300 text-slate-800 text-xs mt-1 py-1 px-3 rounded-lg max-w-md mx-auto">
                <div className='flex text-center'>
                    <Lock size={18} className='font-medium'/>
                    <p>
                        Your chats are encrypted and nobody can see them even <strong className='underline'>YooChat</strong> so don't worry about your privacy
                    </p>
                </div>
            </div>
            <div></div>
        </>

    )
}

export default ChatAlert