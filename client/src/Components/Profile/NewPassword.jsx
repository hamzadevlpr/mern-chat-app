import React, { useState, useEffect } from 'react';
import Spinner from '../Spinner';
import { EyeOff, Eye } from 'lucide-react';
import { USER_API_URL } from '../../config';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useParams, useNavigate, Navigate } from 'react-router-dom'
function NewPassword() {

    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState({
        new: false,
        confirm: false,
    });
    const [passwords, setPasswords] = useState({
        new: '',
        confirm: '',
    });
    const { id, token } = useParams();
    const navigate = useNavigate();

    const userValid = async () => {
        try {
            const response = await axios.get(`${USER_API_URL}/reset-password/${id}/${token}`);
            if (response.status === 201) {
                return;
            } else {
                navigate(`${USER_API_URL}/reset-password/${id}/${token}`);
            }
        } catch (err) {
            navigate(`${USER_API_URL}/reset-password/${id}/${token}`);
        }
    }


    useEffect(() => {
        userValid();
    }, [])

    const handleChange = (field, value) => {
        setPasswords(prevState => ({ ...prevState, [field]: value }));
    }
    const togglePassword = (field) => {
        setShowPassword(prevState => ({ ...prevState, [field]: !prevState[field] }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!passwords.new || !passwords.confirm) {
            return toast.error('Please fill all fields')
        }

        if (passwords.new !== passwords.confirm) {
            return toast.error('Passwords do not match');
        }
        try {
            setLoading(true);
            const response = await axios.put(
                `${USER_API_URL}/new-password/${id}`, { newPassword: passwords.new });
            if (response.status === 200) {
                toast.success(response.data.message);
                navigate('/login');
            }
        } catch (err) {
            setLoading(false);
            toast.error(err.response ? err.response.data.error : 'An error occurred');
            setPasswords({
                current: '',
                new: '',
            });
        } finally {
            setLoading(false);
        }
    }
    document.title = 'Set New Password | YooChat';
    return (
        <form
            onSubmit={handleSubmit}
            className='h-screen  flex justify-center items-center w-full p-6'>
            <div className="p-4 sm:p-7 w-full max-w-md">
                <div className="text-center my-5">
                    <h1 className='block text-2xl font-bold text-gray-800'>New Password</h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Unlocking Tomorrow, One Password Reset at a Time.
                    </p>
                </div>

                <div className="flex flex-col gap-3">
                    {Object.entries(passwords).map(([field, value]) => (
                        <div key={field} className="w-full">
                            <label htmlFor="" className="text-base font-medium text-gray-900">
                                {field === 'new' ? 'New Password' : 'Confirm New Password'}
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
                    <button
                        type="submit"
                        className={`${loading && 'cursor-not-allowed py-2'} py-3 px-4 inline-flex justify-center items-center gap-2 rounded-md border border-transparent font-semibold bg-indigo-500 text-white hover:bg-indigo-600 text-sm`}
                    >
                        {loading ? <Spinner /> : 'Reset Password'}
                    </button>
                </div>
            </div>
        </form >
    );
}

export default NewPassword;
