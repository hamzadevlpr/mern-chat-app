import React, { useState, useEffect, useContext, useMemo } from 'react';
import axios from 'axios';
import { CONVERSATION_API_URL } from '../../config';
import { Plus } from 'lucide-react';
import ClipLoader from 'react-spinners/ClipLoader';
import { Context } from '../Context';
import NewChat from './NewChat';
import Skeleton from 'react-loading-skeleton';
import ChatSkeleton from '../Skeletons/Chat';

function Chats() {
    const { setSelectedChatId, setNewChatOpen, selectedChatId } = useContext(Context);
    const [chats, setChats] = useState([]);
    const [loading, setLoading] = useState(false);
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;

    useEffect(() => {
        const fetchChats = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${CONVERSATION_API_URL}/getChats/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setChats(res.data);
                console.log(res.data)
            } catch (error) {
                console.error('Error fetching chats:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchChats();
    }, [user.token]);

    const openNewChatModal = () => {
        setNewChatOpen(true);
    };

    return (
        <div className="flex flex-col mt-8 h-72">
            <div className="flex flex-row items-center justify-between text-xs">
                <span className="font-bold">Active Conversations</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">
                    {chats.length}
                </span>
            </div>
            {chats.length === 0 ? (
                <div className="flex flex-col items-center my-3 gap-2 h-72 justify-center">
                    {loading ? (
                        [...Array(3)].map((_, index) => (
                            <ChatSkeleton key={index} />
                        ))
                    ) : (
                        <div className="text-gray-400 font-bold text-lg ">No active chats</div>
                    )}
                </div>
            ) : (
                <div className="flex flex-col space-y-1 mt-4 -mx-2 h-48 overflow-y-auto">
                    {chats.map((chat) => {
                        return (
                            <button
                                key={chat.conversationId}
                                className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                onClick={() =>
                                    setSelectedChatId({
                                        conversationId: chat.conversationId,
                                        receiverId: chat.user?._id,
                                        name: chat.user?.fullName,
                                        userIcon: chat.user?.profilePic,
                                        about: chat.user?.about,
                                        createdAt: chat.user?.createdAt,
                                    })}
                            >
                                <img src={chat.user?.profilePic} className="h-10 w-10 bg-indigo-200 rounded-full border-2" />
                                <div className="text-start ml-3">
                                    <div className="text-sm font-semibold">{chat.user?.fullName}</div>
                                </div>
                            </button>
                        );
                    })}


                </div>
            )
            }
            <button
                className="rounded-md text-sm flex items-center justify-center gap-2 bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2"
                onClick={openNewChatModal}
            >
                <span>New Chat</span>
                <Plus size={16} />
            </button>
            <div className="flex flex-row items-center justify-between text-xs mt-6">
                <span className="font-bold">Archived</span>
                <span className="flex items-center justify-center bg-gray-300 h-4 w-4 rounded-full">7</span>
            </div>
            <NewChat />
        </div >
    );
}

export default Chats;
