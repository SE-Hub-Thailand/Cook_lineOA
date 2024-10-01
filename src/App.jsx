import React, { useEffect, useState } from 'react';
import { useLiff } from 'react-liff';
import axios from 'axios';
import './App.css';
import { loginWithLineId } from './api/business/login'
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

// const API_URL = import.meta.env.VITE_API_URL
const App = () => {
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, isLoggedIn, isReady, liff } = useLiff();
  const navigate = useNavigate();

  // Initialize LIFF and login or register the user
  useEffect(() => {
    const initializeLiff = async () => {
      try {
        const profile = await liff.getProfile();
        const lineId = profile.userId;
        console.log("lineId", lineId);
        console.log("profile lineID", profile.displayName);
        console.log("profile lineID", profile.lineId);
        // Set display name from profile
        setDisplayName(profile.displayName + "xxxx");
        const response = await loginWithLineId(lineId);
        console.log('respons: ', response.jwt);
        console.log('jwt: ', response.jwt);
        if(!response){
          // This line is login fail
          // This line we will redirect to sign up page
          console.log("Login failed. Redirecting to sign up page...");
          // navigate(`/register/${lineId}`); // Redirect to the Register component
          navigate('/home');

        }else{
          const token = response.jwt; // Access the token from the response

          // Save the token in localStorage
          localStorage.setItem('accessToken', token);
          console.log('Token saved to localStorage:', token);
          // This line is login success
          console.log("Login successful. Redirecting to app...");
          navigate('/home'); // Redirect to the App component
        }
      } catch (err) {
        console.error('Initialization or login error:', err);
        setErrorMessage('Initialization or login error. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (isLoggedIn) {
      setLoading(true);
      initializeLiff();
    }
  }, [liff, isLoggedIn]);


  // Handle fetching redeem details (you can replace itemId dynamically)
  const fetchRedeemDetails = async (itemId) => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`https://cookb.opencodelab.asia/api/redeems/${itemId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Process successful retrieval
      console.log('Item claim:', response.data);
    } catch (err) {
      console.error('Error fetching redeem details:', err);
      setErrorMessage('Failed to fetch the redeem details.');
    } finally {
      setLoading(false);
    }
  };

  // Render the login/logout buttons and display name
  const showDisplayName = () => {
    if (error) return <p>Something went wrong: {error.message}</p>;
    if (!isReady) return <p>Loading...</p>;

    if (!isLoggedIn) {
      return (
        <button className="App-button" onClick={() => liff.login()}>
          Login
        </button>
      );
    }

    return (
      <>
        <p>Welcome, {displayName}!</p>
        <button className="App-button" onClick={() => { liff.logout(); setDisplayName(''); }}>
          Logout
        </button>
      </>
    );
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <p>Loading...</p> : showDisplayName()}
        {errorMessage && <p className="error-message">{errorMessage}</p>}
      </header>
    </div>
  );
};

export default App;
