
import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import Spinner from '../Spinner';
import { useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';
import { USER_API_URL } from '../../config';
import { toast } from 'react-hot-toast';

function ForgetPassword() {
    const [loading, setLoading] = useState(false);
    const { setForgetPassModel } = useContext(Context);

    const onClose = () => {
        setForgetPassModel(false);
    };
    const storedUser = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const [email, setEmail] = useState(storedUser.email);;
    const location = useLocation();

    const sendLink = async (e) => {
        e.preventDefault();

        if (!email) {
            toast.error('Please enter an email');
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post(`${USER_API_URL}/reset-password`, { email },
                {
                    headers: {
                        Authorization: `Bearer ${storedUser.token}`,
                    },

                });

            if (response.status === 201) {
                setLoading(false);
                setEmail('');
                toast.success('Password reset link sent to your email');
            } else {
                // Handle non-successful response
                setLoading(false);
                toast.error('Failed to send reset link. Please try again.');
            }
        } catch (error) {
            // Handle network errors or unexpected issues
            setLoading(false);
            if (error.response && error.response.status === 404) {
                toast.error('Email not found');
            } else {
                toast.error('Failed to send reset link. Please try again.');
            }
        }
    };




    return (
        <>
            <main id="content" role="main" className={`${location.pathname == '/' ? 'w-full p-6' : 'h-screen  flex justify-center items-center'}`}>
                <div className="p-4 sm:p-7 w-full max-w-md">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800">
                            {
                                location.pathname == '/' ? 'Forget Password' : 'Reset Password'
                            }
                        </h1>
                        {
                            location.pathname == '/reset-password' ?
                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                                    Remember your password?
                                    <NavLink
                                        to='/login'
                                        className="text-blue-600 decoration-2 hover:underline font-medium"
                                        href="#"
                                    >
                                        Login here
                                    </NavLink>
                                </p> : "We'll send you instructions in email"
                        }
                    </div>
                    <div className="mt-5">
                        <form onSubmit={sendLink}>
                            <div className="grid gap-y-4">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-bold ml-1 mb-2 dark:text-white"
                                    >
                                        Email address
                                    </label>
                                    <div className="relative">
                                        <input
                                            type="email"
                                            className="form-control"
                                            placeholder="Enter your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                        />
                                    </div>
                                    <p className="hidden text-xs text-red-600 mt-2" id="email-error">
                                        Please include a valid email address so we can get back to you
                                    </p>
                                </div>
                                <div className="flex flex-col gap-2">
                                    <button
                                        type="submit"
                                        className={`${loading && 'cursor-not-allowed py-2'} py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-500 text-white hover:bg-indigo-600 text-sm`}
                                    >
                                        Reset password
                                    </button>
                                    <button
                                        onClick={onClose}
                                        type="button"
                                        className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>


        </>
    );
}

export default ForgetPassword;
