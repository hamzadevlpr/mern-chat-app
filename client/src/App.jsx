import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, Navigate } from 'react-router-dom';
import MainLayout from './Components/MainLayout';
import Login from './Components/Auth/Login';
import { Toaster, toast } from 'react-hot-toast';
import Signup from './Components/Auth/Signup';
import { jwtDecode } from 'jwt-decode';
import ForgetPassword from './Components/Profile/ResetPassword';
import NewPassword from './Components/Profile/NewPassword';
import ErrorPages from './ErrorPages';
import axios from 'axios';
import { CHECK_URL } from './config';
import AlertPopup from './Components/AlertPopup';

function App() {
  const user = JSON.parse(localStorage.getItem('user'));
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(true);




  useEffect(() => {
    const checkUrlValidity = async () => {
      try {
        toast.promise(
          axios.get(`${CHECK_URL}/?url=https://yoochat.onrender.com/`),
          {
            loading: 'Checking Server...',
            success: <span>Hurry! Server is Live!</span>,
            error: <span>Server Error.</span>,
          }
        );
      } catch (error) {
        toast.error('Server Error.');
      }
    };

    checkUrlValidity();
  }, []);

  useEffect(() => {
    localStorage.removeItem('selectedChatId');
    const checkTokenExpiration = () => {
      if (user && user.token) {
        try {
          const decodedToken = jwtDecode(user.token);
          if (decodedToken.exp * 1000 < Date.now()) {
            localStorage.clear();
            navigate('/login');
          }
        } catch (error) {
          console.error('Error decoding token:', error);
        }
      }
    };
    checkTokenExpiration();
  }, [user, navigate]);

  useEffect(() => {
    const hidePopup = setTimeout(() => {
      setShowPopup(false);
    }, 5000);

    return () => {
      clearTimeout(hidePopup);
    };
  }, []);
  return (
    <>
      <Routes>
        <Route path="/" element={user ? <MainLayout /> : <Navigate to="/login" />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<ErrorPages />} />
        <Route path="/reset-password" element={<ForgetPassword />} />
        <Route path="/new-password/:id/:token" element={<NewPassword />} />
        <Route path="/new-password" element={user ? <MainLayout /> : <Navigate to="/login" />} />
      </Routes>
      {/* {showPopup && <AlertPopup />} */}
      <Toaster />
    </>
  );
}

export default App;
