import React, { useState, useContext } from 'react'
import Providers from './Providers'
import axios from 'axios'
import { toast } from 'react-hot-toast'
import { USER_API_URL } from '../../config'
import { useNavigate, NavLink } from 'react-router-dom'
import Spinner from '../Spinner'
import { Context } from '../Context'
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate();



    const handleLogin = async (e) => {
        setLoading(true);
        e.preventDefault();
        if (email === "" || password === "") {
            toast.error("Fields Can't be Empty");
            setLoading(false);
        } else {
            try {
                const response = await axios.post(`${USER_API_URL}/login`, {
                    email: email,
                    password: password
                });
                if (response.status === 200) {
                    window.location.href = '/';
                    localStorage.setItem('user', JSON.stringify(response.data));
                    toast.success('Logged In Successfully');
                    setLoading(false);

                } else if (response.status === 401) {
                    setLoading(false);
                    toast.error(response.data.error);
                } else {
                    setLoading(false);
                    toast.error("Internal Server Error");
                }
            } catch (err) {
                setLoading(false);
                if (err.response) {
                    if (err.response.status === 401) {
                        toast.error(err.response.data.error);
                        setPassword('');
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
        }
    }
    return (
        <>
            <div className="h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <h2 className="text-center text-3xl font-extrabold text-gray-800">
                        Sign in to your account
                    </h2>
                    <p className=" text-center text-sm text-gray-800 max-w">
                        <span>Or </span>
                        <NavLink to='/signup' className="font-medium text-blue-600 hover:text-blue-500">
                            create an account
                        </NavLink>
                    </p>
                </div>
                <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="bg-white py-8 px-4 shadow sm:rounded-xl sm:px-10 border">
                        <form className="space-y-6" onSubmit={handleLogin}>
                            <div>
                                <label
                                    htmlFor="email"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Email address
                                </label>
                                <div className="mt-1">
                                    <input
                                        type="email"
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your email address"
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div>
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium text-gray-700"
                                >
                                    Password
                                </label>
                                <div className="mt-1">
                                    <input
                                        name="password"
                                        type="password"
                                        className="appearance-none rounded-md relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                                        placeholder="Enter your password"
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                    <input
                                        id="remember_me"
                                        name="remember_me"
                                        type="checkbox"
                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                    />
                                    <label
                                        htmlFor="remember_me"
                                        className="ml-2 block text-sm text-gray-900"
                                    >
                                        Remember me
                                    </label>
                                </div>
                                <div className="text-sm">
                                    <button
                                        type='button'
                                        onClick={() => navigate('/reset-password')}
                                        className="font-medium text-blue-600 hover:text-blue-500"
                                    >
                                        Forgot your password?
                                    </button>
                                </div>
                            </div>
                            <button
                                type="submit"
                                disabled={loading}
                                className={`${loading && 'cursor-not-allowed py-2'}  group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700`}
                            >
                                {loading ? <Spinner /> : "Sign in"}
                            </button>
                        </form>
                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white text-gray-500">
                                        Or continue with
                                    </span>
                                </div>
                            </div>
                            <Providers />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Login