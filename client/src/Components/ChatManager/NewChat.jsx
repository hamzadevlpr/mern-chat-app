import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import { Context } from "../Context";
import { CONVERSATION_API_URL, MESSAGE_API_URL } from "../../config";
import ChatSkeleton from "../Skeletons/Chat";

function NewChat() {
    const { newChatOpen, setNewChatOpen, setSelectedChatId, selectedChatId } = useContext(Context);
    const [loading, setLoading] = useState(false);
    const [users, setUsers] = useState([]);
    const storeUser = JSON.parse(localStorage.getItem("user"));
    // console.log(selectedChatId)

    const handleCheckChat = async () => {
        try {
            const res = await axios.get(
                `${MESSAGE_API_URL}/checkChat/${storeUser._id}/${selectedChatId.id}`,
                {
                    headers: {
                        Authorization: `Bearer ${storeUser.token}`,
                    },
                }
            );
            console.log(res.data);
            setNewChatOpen(!newChatOpen);
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        const fetchUsers = async () => {
            setLoading(true);
            try {
                const res = await axios.get(`${CONVERSATION_API_URL}/getUsers/${storeUser._id}`, {
                    headers: {
                        Authorization: `Bearer ${storeUser.token}`,
                    },
                });
                setUsers(res.data);
                setLoading(false);
            } catch (err) {
                console.log(err);
            }
        };
        fetchUsers();
    }, []);



    return newChatOpen ? (
        <div className="fixed z-10 inset-0 overflow-y-auto">
            <div className="flex items-center justify-center min-h-screen text-center sm:block">
                {/* Background overlay */}
                <div className="fixed inset-0 transition-opacity">
                    <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
                </div>

                {/* Modal */}
                <div
                    className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-16 sm:align-middle sm:max-w-lg sm:w-full"
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby="modal-headline"
                >
                    <div className="flex flex-col p-5 justify-between">
                        <div>
                            <p className="text-2xl font-bold text-center">All Users</p>
                            <p className="text-md font-medium text-center">Select a user start messaging</p>
                        </div>
                        {users.length === 0 ? (
                            <div className="px-10 flex flex-col items-center my-3 gap-2 h-72 justify-center">
                                {loading ? (
                                    [...Array(3)].map((_, index) => (
                                        <ChatSkeleton key={index} />
                                    ))
                                ) : (
                                    <div className="text-gray-400 font-bold text-lg ">No active chats</div>
                                )}
                            </div>
                        ) : (
                            <div className="justify-start flex flex-col space-y-1 h-auto overflow-y-auto  py-5">
                                {users.map((user) => {
                                    return (
                                        <button
                                            key={user._id}
                                            className="flex flex-row items-center hover:bg-gray-100 rounded-xl p-2"
                                            onClick={() => {
                                                // handleCheckChat(),
                                                setSelectedChatId({
                                                    receiverId: user?._id,
                                                    name: user?.fullName,
                                                    userIcon: user?.profilePic,
                                                    createdAt: user?.createdAt,
                                                }),
                                                    setNewChatOpen(!newChatOpen)
                                            }}
                                        >
                                            <img src={user?.profilePic} className="h-10 w-10 bg-indigo-200 rounded-full border-2" />
                                            <div className="text-start ml-3">
                                                <p className="text-sm font-semibold">{user?.fullName}</p>
                                                <p className="text-xs">{user?.about}</p>
                                            </div>
                                        </button>
                                    );
                                })}


                            </div>
                        )
                        }
                        <button
                            onClick={() => {
                                setNewChatOpen(!newChatOpen)
                            }}
                            type="button"
                            className="mt-3 w-full inline-flex justify-center rounded-md border border-indigo-300 shadow-sm py-3 px-4 bg-indigo-400 text-base font-medium text-white hover:bg-indigo-500 sm:mt-0 sm:w-auto sm:text-sm"
                        >
                            Cancel
                        </button>
                    </div >
                </div>
            </div >
        </div >
    ) : null;
}

export default NewChat;
-400