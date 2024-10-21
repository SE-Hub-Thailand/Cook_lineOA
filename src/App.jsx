import React, { useEffect, useState} from 'react';
import { useLiff } from 'react-liff';
import './App.css';
import { loginWithLineId } from './api/business/login'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
// import Home from './pages/Home';
const App = () => {
  const navigate = useNavigate();
  const {isLoggedIn, liff, error } = useLiff();
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
      const initializeLiff = async () => {
          try {
              // Check if liff is defined and has the init function
              if (typeof liff === 'undefined') {
                  console.error("LIFF is undefined. Please check if the SDK is loaded correctly.");
                  setErrorMessage("LIFF is not loaded. Please refresh the page.");
                  return;
              }

              // Verify the liff.init method exists
              if (typeof liff.init !== 'function') {
                  // console.error("LIFF init method is not a function. Please check your LIFF SDK version.");
                  setErrorMessage("LIFF is not initialized correctly. Please try again.");
                  return;
              }

              // Initialize LIFF
              // await liff.init({ liffId: LiffPartner });
              console.log("LIFF initialized successfully.");

              if (liff.isLoggedIn()) {
                const profile = await liff.getProfile();
                const lineId = profile.userId;
                console.log("lineId", lineId);
                console.log("profile lineID", profile.displayName);
                console.log("profile lineID", profile.lineId);

                localStorage.setItem('displayName', profile.displayName);
                localStorage.setItem('pictureUrl', profile.pictureUrl);
                localStorage.setItem('lineId', lineId);

                // Set display name from profile
                setDisplayName(profile.displayName + "xxxx");
                const response = await loginWithLineId(lineId);
                console.log('respons: ', response.jwt);
                console.log('jwt: ', response.jwt);
                if(!response){
                  // This line is login fail
                  // This line we will redirect to sign up page
                  console.log("Login failed. Redirecting to sign up page...");;
                  navigate('/pdpa_customer');
                  // return;
                }else{
                  const token = response.jwt; // Access the token from the response
                  localStorage.setItem('token', token);
                  console.log('Token saved to localStorage:', token);
                  // This line is login success
                  console.log("Login successful. Redirecting to app...");
                  navigate('/home'); // Redirect to the App component
                }
              } else {
                  liff.login();
              }
          } catch (err) {
              console.error('Initialization or login error:', err);
              setErrorMessage('Initialization or login error. Please try again.');
          } finally {
              setLoading(false);
          }
      };

      initializeLiff();
  }, [liff, navigate]);

  const handleLogout = () => {
      if (liff) {
          liff.logout();
      }
      localStorage.removeItem('accessToken');
      localStorage.removeItem('user');
      navigate('/'); // Redirect to login page
  };

  if (loading) {
      return <div className="App"><LoadingSpinner /></div>;
  }

  if (error) {
      return <div className="App"><p>Something went wrong: {error.message}</p></div>;
  }

  return (
      <div className="App">
          {/* <header className="App-header">
              {isLoggedIn ? (
                  <>
                      <p>Welcome, {displayName}!</p>
                      <button className="App-button" onClick={handleLogout}>Logout</button>
                  </>
              ) : (
                  <p>Please log in.</p>
              )}
          </header> */}
      </div>



  );
};

export default App;
// const App = () => {
//   const [displayName, setDisplayName] = useState('');
//   const [errorMessage, setErrorMessage] = useState('');
//   const [loading, setLoading] = useState(false);
//   const { error, isLoggedIn, isReady, liff } = useLiff();
//   const navigate = useNavigate();

//   // Initialize LIFF and login or register the user
//   useEffect(() => {
//     const initializeLiff = async () => {
//       try {
//         const profile = await liff.getProfile();
//         const lineId = profile.userId;
//         console.log("lineId", lineId);
//         console.log("profile lineID", profile.displayName);
//         console.log("profile lineID", profile.lineId);

//         localStorage.setItem('displayName', profile.displayName);
//         localStorage.setItem('pictureUrl', profile.pictureUrl);
//         localStorage.setItem('lineId', lineId);

//         // Set display name from profile
//         setDisplayName(profile.displayName + "xxxx");
//         const response = await loginWithLineId(lineId);
//         console.log('respons: ', response.jwt);
//         console.log('jwt: ', response.jwt);
//         if(!response){
//           // This line is login fail
//           // This line we will redirect to sign up page
//           console.log("Login failed. Redirecting to sign up page...");;
//           navigate('/pdpa_customer');
//           // return;
//         }else{
//           const token = response.jwt; // Access the token from the response
//           localStorage.setItem('token', token);
//           console.log('Token saved to localStorage:', token);
//           // This line is login success
//           console.log("Login successful. Redirecting to app...");
//           navigate('/home'); // Redirect to the App component
//         }
//       } catch (err) {
//         console.error('Initialization or login error:', err);
//         setErrorMessage('Initialization or login error. Please try again.');
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (isLoggedIn) {
//       setLoading(true);
//       initializeLiff();
//     }
//   }, [liff, isReady, isLoggedIn, navigate]);


//   // Handle fetching redeem details (you can replace itemId dynamically)
//   const fetchRedeemDetails = async (itemId) => {
//     const token = localStorage.getItem('token');
//     try {
//       const response = await axios.get(`https://cookb.opencodelab.asia/api/redeems/${itemId}`, {
//         headers: { Authorization: `Bearer ${token}` },
//       });

//       // Process successful retrieval
//       console.log('Item claim:', response.data);
//     } catch (err) {
//       console.error('Error fetching redeem details:', err);
//       setErrorMessage('Failed to fetch the redeem details.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Render the login/logout buttons and display name
//   const showDisplayName = () => {

//     if (error) return <p>Something went wrong: {error.message}</p>;
//     if (!isReady) return <LoadingSpinner />;

//     if (!isLoggedIn) {
//       // liff.login();  // ล็อกอินถ้ายังไม่ได้ล็อกอิน
//       return (
//         // <button className="App-button" onClick={() => liff.login()}>
//         //   Login
//         // </button>
//         <button className="App-button" onClick={() => liff.login()}>
//         Login
//       </button>
//       );
//     }

//     // return (
//     //   <>
//     //     <p>Welcome, {displayName}!</p>
//     //   </>
//     // );
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {loading ? <LoadingSpinner /> : showDisplayName()}
//         {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
//       </header>
//     </div>
//   );
// };

// export default App;

