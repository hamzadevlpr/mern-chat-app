import React, { createContext, useState, useEffect } from "react";

const Context = createContext();

const ContextProvider = ({ children }) => {
    const [mainUser, setMainUser] = useState(JSON.parse(localStorage.getItem('user')) || {});
    const [isOpen, setIsOpen] = useState(false);
    const [newChatOpen, setNewChatOpen] = useState(false);
    const [chatInfoOpen, setChatInfoOpen] = useState(false);
    const [passOpen, setPassOpen] = useState(false);
    const [forgetPassModal, setForgetPassModel] = useState(false);
    const [selectedChatId, setSelectedChatId] = useState(null);
    const [chats, setChats] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);

    useEffect(() => {
        localStorage.setItem('selectedChatId', selectedChatId);
    }, [selectedChatId]);
    return (
        <Context.Provider value={{
            isOpen, setIsOpen, passOpen, setPassOpen,
            forgetPassModal, setForgetPassModel,
            mainUser, setMainUser,
            newChatOpen, setNewChatOpen,
            selectedChatId, setSelectedChatId,
            chats, setChats,
            chatInfoOpen, setChatInfoOpen,
            menuOpen, setMenuOpen
        }}>
            {children}
        </Context.Provider>
    );
};

export { Context, ContextProvider };