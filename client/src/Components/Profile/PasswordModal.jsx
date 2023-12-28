// ChangePassword.js
import React, { useState, useContext } from 'react';
import { Context } from '../Context';
import Spinner from '../Spinner';
import { EyeOff, Eye } from 'lucide-react';
import { USER_API_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useLocation, Navigate } from 'react-router-dom'
function ChangePassword() {
    const [loading, setLoading] = useState(false);
    const { setPassOpen, setForgetPassModel } = useContext(Context);
    const onClose = () => setPassOpen(false);
    const storedUser = localStorage.getItem('user');
    const [user, setUserState] = useState(JSON.parse(storedUser) || {});
    const [passwords, setPasswords] = useState({
        current: '',
        new: '',
        confirm: '',
    });
    const location = useLocation();
    const [showPassword, setShowPassword] = useState({
        current: false,
        new: false,
        confirm: false,
    });

    const togglePassword = (field) => {
        setShowPassword(prevState => ({ ...prevState, [field]: !prevState[field] }));
    }

    const handleChange = (field, value) => {
        setPasswords(prevState => ({ ...prevState, [field]: value }));
    }

    const forgetPass = () => {
        setForgetPassModel(true);
        setPassOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();


        if (!passwords.current || !passwords.new || !passwords.confirm) {
            return toast.error('Please fill all fields')
        }

        if (passwords.new !== passwords.confirm) {
            return toast.error('Passwords do not match');
        }
        

        try {
            setLoading(true);
            const response = await axios.put(
                `${USER_API_URL}/change-password/${user._id}`,
                {
                    oldPassword: passwords.current,
                    newPassword: passwords.new,
                },
                {
                    headers: {
                        Authorization: `Bearer ${user.token}`,
                    },
                }
            );

            if (response.status === 200) {
                toast.success(response.data.message);
                onClose();
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response ? err.response.data.error : 'An error occurred');
            setPasswords({
                current: '',
                new: passwords.new,
                confirm: passwords.confirm,
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <form onSubmit={handleSubmit} className='w-full p-6'>
            <div className="p-4 sm:p-7 w-full max-w-md">
                <div className="text-center my-5">
                    <h1 className='block text-2xl font-bold text-gray-800'>Update Password</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Unlocking Tomorrow, One Password Reset at a Time.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {Object.entries(passwords).map(([field, value]) => (
                        <div key={field} className="w-full">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                {field === 'current' ? 'Current Password' : (field === 'new' ? 'New Password' : 'Confirm New Password')}
                            </label>
                            <div className="mt-2 flex items-center relative">
                                <input
                                    className="form-inputs"
                                    type={showPassword[field] ? "text" : "password"}
                                    value={value}
                                    onChange={(e) => handleChange(field, e.target.value)}
                                />
                                {/* Uncomment this div to show the eye icon to toggle password visibility */}
                                <div>
                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm leading-5">
                                        <button
                                            type='button'
                                            onClick={() => togglePassword(field)}
                                            className="text-gray-400 hover:text-gray-500 focus:outline-none focus:text-gray-700"
                                        >
                                            {showPassword[field] ? <Eye size={18} /> : <EyeOff size={18} />}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    ))}
                    <div className="text-sm text-right">
                        <button
                            type='button'
                            onClick={forgetPass}
                            className="font-medium text-blue-600 hover:text-blue-500"
                        >
                            Forgot your password?
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <button
                            type="submit"
                            className={`${loading && 'cursor-not-allowed py-2'} py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-500 text-white hover:bg-indigo-600 text-sm`}
                        >
                            {loading ? <Spinner /> : 'Reset Password'}
                        </button>
                        {
                            location.pathname == '/update-password' ?
                                null :
                                <button
                                    onClick={onClose}
                                    type="button"
                                    className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 sm:mt-0 sm:w-auto sm:text-sm"
                                >
                                    Cancel
                                </button>
                        }
                    </div>
                </div>
            </div>
        </form >
    );
}

export default ChangePassword;
