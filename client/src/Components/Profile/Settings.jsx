import React, { useContext } from "react";
import { Context } from "../Context";
import User from "./User";
import ChangePassword from "./PasswordModal";
import ForgetPasswordModal from "./ResetPassword";
import { useLocation } from "react-router-dom";

function Settings() {
    const { isOpen, passOpen, forgetPassModal } = useContext(Context);

    // Check if the user is on the login route
    const location = useLocation();
    const isLoginRoute = location.pathname === "/login";

    return isOpen ? (
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
                    {passOpen ? (
                        <ChangePassword />
                    ) : forgetPassModal ? (
                        <ForgetPasswordModal />
                    ) : (
                        <User />
                    )}
                </div>
            </div>
        </div>
    ) : null;
}

export default Settings;
