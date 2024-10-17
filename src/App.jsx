import React, { useEffect, useState, useRef } from 'react';
import { useLiff } from 'react-liff';
import './App.css';
import { loginWithLineId } from './api/business/login'
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from './components/LoadingSpinner';
// import Home from './pages/Home';

const App = () => {
  const [displayName, setDisplayName] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { error, isLoggedIn, isReady, liff } = useLiff();
  const loginButtonRef = useRef(null);
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
  }, [liff, isReady, isLoggedIn, navigate]);


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
    if (!isReady) return <LoadingSpinner />;

    if (!isLoggedIn) {
      // liff.login();  // ล็อกอินถ้ายังไม่ได้ล็อกอิน
      return (
        // <button className="App-button" onClick={() => liff.login()}>
        //   Login
        // </button>
        <button className="App-button" onClick={() => liff.login()}>
        Login
      </button>
      );
    }

    // return (
    //   <>
    //     <p>Welcome, {displayName}!</p>
    //   </>
    // );
  };

  return (
    <div className="App">
      <header className="App-header">
        {loading ? <LoadingSpinner /> : showDisplayName()}
        {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
      </header>
    </div>
  );
};

export default App;

// const App = () => {
//   const [loading, setLoading] = useState(true);  // เริ่มต้นด้วย loading
//   const [errorMessage, setErrorMessage] = useState('');
//   const { liff, isLoggedIn, isReady } = useLiff();
//   const navigate = useNavigate();

//   useEffect(() => {
//     const initializeLiff = async () => {
//       try {
//         if (!isReady) return;  // รอจนกว่า LIFF จะพร้อมใช้งาน

//         // ถ้ายังไม่ได้ล็อกอิน ให้เรียก liff.login()
//         if (!isLoggedIn) {
//           liff.login();
//           return;
//         }

//         // ถ้าล็อกอินแล้ว ให้ดึงข้อมูลโปรไฟล์ผู้ใช้
//         const profile = await liff.getProfile();
//         const lineId = profile.userId;

//         // เก็บข้อมูลโปรไฟล์ผู้ใช้ใน localStorage
//         localStorage.setItem('displayName', profile.displayName);
//         localStorage.setItem('pictureUrl', profile.pictureUrl);
//         localStorage.setItem('lineId', lineId);

//         // เรียก API ฝั่งเซิร์ฟเวอร์เพื่อล็อกอินด้วย Line ID
//         const response = await loginWithLineId(lineId);

//         if (response && response.jwt) {
//           // ถ้าล็อกอินสำเร็จ เก็บ JWT token แล้ว redirect ไปที่หน้า home
//           localStorage.setItem('token', response.jwt);
//           navigate('/home');
//         } else {
//           // ถ้าล็อกอินไม่สำเร็จ ให้ redirect ไปที่หน้า register
//           navigate(`/register/${lineId}`);
//         }
//       } catch (err) {
//         console.error('Error during login or initialization:', err);
//         setErrorMessage('Error during login or initialization. Please try again.');
//       } finally {
//         setLoading(false);  // เมื่อเสร็จสิ้นให้หยุดการแสดง loading spinner
//       }
//     };

//     // เริ่มการทำงานเมื่อ LIFF พร้อมใช้งานและโหลดเสร็จแล้ว
//     if (isReady) {
//       initializeLiff();
//     }
//   }, [liff, isLoggedIn, isReady, navigate]);

//   if (loading) {
//     return <LoadingSpinner />;
//   }

//   return (
//     <div className="App">
//       <header className="App-header">
//         {errorMessage && <p>{errorMessage}</p>}
//       </header>
//     </div>
//   );
// };

// export default App;




  // Handle fetching redeem details (you can replace itemId dynamically)
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
//     if (!isReady) return <p>Loading...</p>;
//     if (!isLoggedIn) {
//       liff.login();  // ล็อกอินถ้ายังไม่ได้ล็อกอิน
//     } else {
//       // ถ้าล็อกอินแล้วให้ปิดหน้าต่าง LIFF
//       liff.closeWindow();
//     }

//     // if (!isLoggedIn) {
//     //     return (
//     //     <>
//     //     <button className="App-button" onClick={liff.login()}>
//     //       Login
//     //     </button>
//     //   </>
//     //   );
//     // }

//     // return (
//     //   <>
//     //     <p>Welcome, {displayName}!</p>
//     //     <button className="App-button" onClick={() => { liff.logout(); setDisplayName(''); }}>
//     //       Logout
//     //     </button>
//     //   </>
//     // );
//   };

//   return (
//     <div className="App">
//       <header className="App-header">
//         {loading ? <LoadingSpinner /> : null }
//       </header>
//     </div>
//   );
// };

// export default App;

// {/* {!isLoggedIn ? liff.login() :  <LoadingSpinner />} */}
// {/* {errorMessage && <p className="error-message">{errorMessage}</p>} */}
