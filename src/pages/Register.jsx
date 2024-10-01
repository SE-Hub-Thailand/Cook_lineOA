import React, { useState, useEffect } from "react";
import Header from "../components/Header.jsx";
import FileUpload from "../components/FileUpload.jsx";
import { Checkbox, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import WebcamCapture from "../components/WebcamCapture.jsx";
import { registerUserWithImage } from "../api/business/register"; // Import the function
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for routing

function Register() {
  const { userId } = useParams();
  const navigate = useNavigate();
  console.log('userId:', userId);
  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun",
    },
  });

  const [formData, setFormData] = useState({
    username: "",
    lineId: userId,
    fullName: "",
    telNumber: "",
    gender: "",
    address: "",
    cardID: "",
    photoImage: "", // This will store the base64 image or image path
    photoCardId: "",
    checkedOne: false,
  });

  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id || name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleImageCapture = (imageData) => {
    // imageData will be base64 image data from WebcamCapture component
    setFormData((prevData) => ({
      ...prevData,
      photoImage: imageData,
    }));
  };

  useEffect(() => {
    const { username, fullName, telNumber, gender, address, cardID, checkedOne } = formData;
    if (username && fullName && telNumber && gender && address && cardID && checkedOne) {
      setIsFormValid(true);
    } else {
      setIsFormValid(false);
    }
  }, [formData]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isFormValid) return;

    setLoading(true);
    try {
		if (!formData.photoImage) {
			formData.photoImage = "0.jpg"; // Placeholder image
		}
		console.log('formData:', formData);
    console.log('formData.lineId: ', formData.lineId);
      // Calling the backend API to register the user
      const response = await registerUserWithImage(
        formData.username,
		    formData.lineId,
        formData.fullName,
        formData.telNumber,
        formData.gender,
        formData.address,
        formData.cardID,
        formData.photoImage,// Send the base64 image data
		    formData.photoCardId
      );
      console.log('User registered successfully:', response);
      navigate('/'); // Redirect to the App component
      // Handle success (e.g., show a success message or navigate to a different page)
    } catch (error) {
      console.error('Error during registration:', error.message);
      // Handle error (e.g., show an error message)
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <FileUpload />
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
          {/* Input fields */}
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2">
              <TextField
                id="username"
                label="ชื่อผู้ใช้"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mt-4">
              <TextField
                id="fullName"
                label="ชื่อ-นามสกุล"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full md:w-1/2 px-2 mt-4">
              <TextField
                id="telNumber"
                label="เบอร์โทร"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.telNumber}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-2 mt-4">
              <FormControl>
                <FormLabel>เพศ</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel value="ชาย" control={<Radio />} label="ชาย" />
                  <FormControlLabel value="หญิง" control={<Radio />} label="หญิง" />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="w-full px-2 mt-4">
              <TextField
                id="address"
                placeholder="ที่อยู่"
                multiline
                rows={4}
                className="w-full bg-white"
                required
                value={formData.address}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-2 mt-4">
              <TextField
                id="cardID"
                label="หมายเลขบัตรประจำตัวประชาชน"
                variant="outlined"
                className="w-full bg-white"
                required
                value={formData.cardID}
                onChange={handleInputChange}
              />
            </div>
            <div className="w-full px-2 mt-4">
              <WebcamCapture onCapture={handleImageCapture} />
            </div>
          </div>
        </div>
        <div className="container mx-auto px-4 mt-10 mb-5">
          <Checkbox
            id="checkedOne"
            checked={formData.checkedOne}
            onChange={handleInputChange}
            required
            sx={{ "& .MuiSvgIcon-root": { fontSize: 30 } }}
          />
          <span>ยอมรับข้อตกลงและเงื่อนไข</span>
        </div>
        <div className="container mx-auto px-4">
          <button
            type="submit"
            disabled={!isFormValid || loading}
            className={`w-full h-12 mb-10 flex justify-center rounded-xl items-center text-white ${
              isFormValid ? "bg-green-500" : "bg-slate-300"
            }`}
          >
            {loading ? "กำลังบันทึก..." : "บันทึกข้อมูล"}
          </button>
        </div>
      </form>
    </ThemeProvider>
  );
}

export default Register;
