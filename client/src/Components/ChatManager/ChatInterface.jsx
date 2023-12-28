import React, { useState, useEffect, useContext } from 'react';
import { Paperclip, SmilePlus, SendHorizontal } from 'lucide-react';
import ChatBar from './ChatBar';
import axios from 'axios';
import { Context } from '../Context';
import ChatSVG from './ChatSVG';
import ChatAlert from './ChatAlert';
import { MESSAGE_API_URL } from '../../config';
import { toast } from 'react-hot-toast';
import ChatInfo from './ChatInfo';

function ChatInterface() {
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [inputMessage, setInputMessage] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);
    const { chatInfoOpen, selectedChatId, setChatInfoOpen } = useContext(Context);
    // console.log(selectedChatId);

    useEffect(() => {
        setMessages([]);
        const fetchMessages = async () => {
            if (!selectedChatId || !selectedChatId.receiverId) {
                return;
            }
            try {
                setLoading(true);
                const res = await axios.get(`${MESSAGE_API_URL}/getMessages?senderId=${user._id}&receiverId=${selectedChatId.receiverId}`, {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                });
                setMessages(res.data);
            } catch (err) {
                console.error('Error fetching messages:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchMessages();
    }, [selectedChatId]);


    const sendMessage = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(
                `${MESSAGE_API_URL}/send`,
                {
                    conversationId: selectedChatId.conversationId,
                    message: inputMessage,
                    receiverId: selectedChatId.receiverId,
                    senderId: user._id,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );
            setInputMessage("");
        } catch (err) {
            console.log(err);
            toast.error('Error sending message');
        }
    };


    return (
        <>
            {chatInfoOpen && (
                <ChatInfo title={selectedChatId.name} userIcon={selectedChatId.userIcon} about={selectedChatId.about} joiningData={selectedChatId.createdAt} />
            )}
            {selectedChatId ? (
                <div className="h-screen flex flex-col flex-auto flex-shrink-0">
                    <ChatBar title={selectedChatId.name} userIcon={selectedChatId.userIcon} />

                    <div className="flex flex-col h-full overflow-y-auto p-2 bg-gray-500">
                        <ChatAlert />
                        <div className='rounded-lg my-2'>
                            {messages.length > 0 ? (
                                messages.map(({ message, user: { id, profilePic } = {} }, index) => (
                                    <div key={index} className={`my-3 flex ${id === user._id ? 'justify-end' : 'justify-start'}`}>
                                        <div className='flex justify-center items-center'>
                                            <div className={`mr-3 ml-3 text-sm bg-white py-3 px-4 shadow rounded-xl rounded-${id === user._id ? 'br' : 'bl'}`}>
                                                {message}
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="text-gray-800 font-bold text-xl text-center my-20">No messages yet</div>
                            )}



                        </div>


                    </div>


                    <form onSubmit={sendMessage} className=" flex flex-row items-center gap-3 bg-white w-full px-4 py-2 shadow-inner">
                        <button className="flex items-center justify-center text-gray-400 hover:text-gray-600">
                            <Paperclip size={20} />
                        </button>
                        <div className="flex-grow relative w-full">
                            <input
                                type="text"
                                placeholder="Type your message..."
                                value={inputMessage}
                                onChange={(e) => setInputMessage(e.target.value)}
                            />
                            <button className='absolute flex items-center justify-center h-full w-12 right-0 top-0 text-gray-400 hover:text-gray-600'>
                                <SmilePlus size={20} />
                            </button>
                        </div>
                        <button
                            disabled={!inputMessage}
                            className={`z-100 text-sm flex items-center justify-center gap-2 ${inputMessage ? 'bg-indigo-500 hover:bg-indigo-600' : 'bg-indigo-300 cursor-not-allowed'}  rounded-xl text-white px-4 py-2 flex-shrink-0`}
                            type='submit'
                            title={inputMessage ? "Send" : "Type a message to send"}
                        >
                            <span>Send</span>
                            <SendHorizontal size={16} />
                        </button>
                    </form>


                </div >
            ) : (
                <ChatSVG />
            )
            }
        </>
    );
}

export default ChatInterface;
