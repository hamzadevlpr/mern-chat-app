
import { Phone, Video, MoreVertical, ArrowLeft } from 'lucide-react'
import { Context } from '../Context';
import { useContext } from 'react';

function ChatBar({ userIcon, title }) {
    const { setChatInfoOpen } = useContext(Context)
    return (
        <>
            <div className="flex items-center justify-between w-full bg-indigo-600 px-5">
                <div className='flex gap-2 items-center'>
                    <button className="flex items-center justify-center h-8 w-8 rounded-full" title='Go Back'>
                        <ArrowLeft size={22} className='text-indigo-200' />
                    </button>
                    <button
                        onClick={() => setChatInfoOpen(true)}
                        className="flex flex-row items-center rounded-xl py-2 pr-16">
                        <div className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full">
                            <img
                                className="w-8 h-8 rounded-full object-cover"
                                src={userIcon}
                                alt={title}
                            />
                        </div>
                        <div className="flex">
                            <div className="ml-2 text-sm font-semibold text-white">{title}</div>
                        </div>
                    </button>
                </div>
                <div className='flex gap-5'>
                    <button className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" title='Voice Call'>
                        <Phone size={18} className='text-indigo-600' />
                    </button>
                    <button className="flex items-center justify-center h-8 w-8 bg-indigo-200 rounded-full" title='Video Call'>
                        <Video size={18} className='text-indigo-600' />
                    </button>
                    <button className="flex items-center justify-center" title='More Options'>
                        <MoreVertical size={20} className='text-white' />
                    </button>
                </div>
            </div>
        </>

    )
}

export default ChatBar