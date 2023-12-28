import React, { useState } from 'react'
import { auth, provider } from '../Auth/firbase';
import { signInWithPopup } from 'firebase/auth';
import ClipLoader from "react-spinners/ClipLoader";
import axios from 'axios';
import { USER_API_URL } from '../../config';
import toast from 'react-hot-toast';
import { useLocation, useNavigate } from 'react-router-dom';

function Providers() {
    const [googleLoading, setGoogleLoading] = useState(false);
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [profilePic, setProfilePic] = useState('');
    const [accountProvider, setAccountProvider] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();

    // Google login
    const handleGoogleSignUp = async () => {
        try {
            setGoogleLoading(true);

            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Check if the email already exists in the database
            const existingUserResponse = await axios.post(`${USER_API_URL}/check-email`, {
                email: user.email,
            });

            if (existingUserResponse.data.exists) {
                // If the email already exists
                toast.error('Email already exists. Please log in.');
                setGoogleLoading(false);
                return;
            }

            // Update state
            setFullName(user.displayName);
            setEmail(user.email);
            setProfilePic(user.photoURL);
            setAccountProvider(user.providerData[0].providerId);

            // Make API request to signup
            const res = await axios.post(`${USER_API_URL}/google-signup`, {
                fullName: user.displayName,
                email: user.email,
                profilePic: user.photoURL,
                provider: user.providerData[0].providerId,
            });

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(res.data));
            setGoogleLoading(false);
            window.location.href = '/';
        } catch (err) {
            setGoogleLoading(false);
            if (err.response) {
                if (err.response.status === 401) {
                    toast.error(err.response.data.error);
                } else if (err.response.status === 500) {
                    toast.error("Internal Server Error");
                } else {
                    toast.error(`${err.response.data.error}`);
                }
            } else if (err.request) {
                toast.error("No response received from the server");
            } else {
                toast.error(`Error: ${err.message}`);
            }
        }
    };
    // login with google end here
    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true);

            // Sign in with Google
            const result = await signInWithPopup(auth, provider);
            const user = result.user;

            // Make API request to signup
            const res = await axios.post(`${USER_API_URL}/google-login`, {
                email: user.email,
            });

            // Store user data in local storage
            localStorage.setItem('user', JSON.stringify(res.data));
            toast.success(`Welcome back ${res.data.fullName}!`);
            setGoogleLoading(false);
            window.location.href = '/';
        } catch (err) {
            setGoogleLoading(false);

            if (err.response) {
                const { status, data } = err.response;

                if (status === 401) {
                    toast.error(data.error || 'Unauthorized');
                } else if (status === 500) {
                    toast.error('Internal Server Error');
                } else {
                    toast.error(data.error);
                }
            } else if (err.request) {
                toast.error('No response received from the server');
            } else {
                toast.error(`Error: ${err.message}`);
            }
        }
    };

    return (
        <>
            <div className="mt-6">
                <div>
                    <button
                        disabled={googleLoading}
                        onClick={location.pathname === '/signup' ? handleGoogleSignUp : handleGoogleSignIn}
                        className="w-full flex items-center justify-center px-8 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50"
                    >

                        {
                            googleLoading ?
                                <ClipLoader color='#000' size={23} /> :
                                <>
                                    <span className="mr-2 inline-block">
                                        <img src="https://img.icons8.com/color/20/000000/google-logo.png" />
                                    </span>
                                    Continue with Google
                                </>
                        }
                    </button>
                </div>
            </div>
        </>
    )
}

export default Providers