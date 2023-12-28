import React, { useContext } from "react";
import { X, MoreVertical } from "lucide-react";
import { NavLink } from "react-router-dom";
import { Context } from "../Context";

const ChatInfo = ({ userIcon, title, about, joiningData }) => {
    const { setChatInfoOpen } = useContext(Context);

    return (
        <>
            <div className="fixed inset-0 z-50 overflow-hidden">
                <div className="absolute inset-0 overflow-hidden">
                    <div className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" ></div>
                    <section className="absolute inset-y-0 right-0 max-w-full flex">
                        <div className="relative w-80">
                            <div className="h-full flex flex-col py-6 bg-white shadow-xl overflow-y-scroll">
                                <div className="px-4 sm:px-6">
                                    <div className="flex items-start justify-between">
                                        <h2 className="text-lg font-medium text-gray-900">
                                            Chat Info
                                        </h2>
                                        <div className="ml-3 h-7 flex items-center">
                                            <button
                                                onClick={() => {
                                                    setChatInfoOpen(false)
                                                }}
                                                className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:ring-2 focus:ring-indigo-500">
                                                <span className="sr-only">Close panel</span>
                                                <X size={20} className='text-gray-900' />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                                <div className="mt-6 relative px-4 sm:px-6">
                                    <div className="relative h-full flex flex-col justify-between items-center">
                                        <button
                                            onClick={() => {
                                                setChatInfoOpen(false)
                                            }}
                                            className="absolute top-0 right-0">
                                            <span className="sr-only">Close panel</span>
                                            <MoreVertical size={20} className='text-gray-900' />
                                        </button>
                                        {/* <MoreVertical size={20} className='absolute top-0 right-0' /> */}
                                        <div className="space-y-6">
                                            <div className="space-y-1">
                                                <div className="py-4 flex flex-col gap-5">
                                                    <img className="h-36 w-36 rounded-full border-8 border-indigo-200" src={userIcon} alt={title} />
                                                    <div className="ml-3 flex flex-col items-center">
                                                        <p className="text-sm font-medium text-gray-900">{title}</p>
                                                        <p className="text-sm text-gray-500">{about || '~Unknown'}</p>
                                                    </div>
                                                </div>

                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-500">
                                            <span className="text-gray-900 font-medium">Joining Date: </span>
                                            {new Date(joiningData).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric'
                                            })}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                </div>
            </div>
        </>
    );
};

export default ChatInfo;
