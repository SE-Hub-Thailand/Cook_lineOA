import React, { useState, useEffect} from "react";
import { useNavigate, useParams } from "react-router-dom";
// import Header from "../components/Header.jsx";
import FileUpload from "../components/FileUpload.jsx";
import { Checkbox, TextField } from "@mui/material";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
// import WebcamCapture from "../components/WebcamCapture.jsx";
import { createUser } from "../api/strapi/userApi"; // Import createUser function
import Alert from "../components/Alert.jsx";
import CameraCapture from "../components/CameraCapture.jsx";
// import { uploadImage } from "../api/strapi/uploadApi"; // Import uploadImage function
import LoadingSpinner from "../components/LoadingSpinner.jsx";
import { handlePhotoUpload, uploadImageFromBase64 } from "../api/strapi/uploadApi";

function Register() {
  const displayName = localStorage.getItem('displayName');
  const pictureUrl = localStorage.getItem('pictureUrl');
  console.log("displayName in Register: ", displayName);
  console.log("pictureUrl in Register: ", pictureUrl);
  // console.log("token in Register: ", token);
  const userId = localStorage.getItem('lineId');
  const theme = createTheme({
    typography: {
      fontFamily: "Sarabun",
    },
  });
  const navigate = useNavigate(); // Initialize useNavigate for redirection
  const [isFormValid, setIsFormValid] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [hasImage, setHasImage] = useState(false);  // สถานะว่ามีภาพหรือไม่
  const [capturedImage, setCapturedImage] = useState(null);

  // Initial formData state is set with empty fields
  const [formData, setFormData] = useState({
    username: displayName,
    password: "",
    fullName: "",
    telNumber: "",
    gender: "",
    address: "",
    cardID: "",
    cardIdImage: "",
    photoImage: pictureUrl? pictureUrl : "",
    checkedOne: false,
  });

  useEffect(() => {
    const {
      username,
      fullName,
      telNumber,
      gender,
      address,
      cardID,
      // cardIdImage,
      checkedOne,
    } = formData;

    setIsFormValid(
      username &&
        fullName &&
        telNumber &&
        gender &&
        address &&
        cardID &&
        // hasImage &&
        checkedOne
    );
  }, [formData]);

  // Function to handle file change from FileUpload component
  const handleFileChange = (file) => {
    console.log("file change: ", file);
    setFormData((prevData) => ({
      ...prevData,
      photoImage: file, // Store the file in formData
    }));
  };

  // const handleImageCapture = (imageSrc) => {
  //   console.log("imageSrc: ", imageSrc);
  //   if (imageSrc) {
  //     setHasImage(true);  // มีภาพอยู่
  //     // setFormData((prevData) => ({
  //     //   ...prevData,
  //     //   cardIdImage: imageSrc,
  //     // }));
  //   } else {
  //     setHasImage(false);  // ไม่มีภาพ
  //   }
  // };
// ]

  const handleInputChange = (e) => {
    const { id, name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id || name]: type === "checkbox" ? checked : value,
    }));
  };


  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("formData: ", formData);
    // อัปโหลดรูปภาพก่อน ถ้ามีรูปภาพที่จะอัปโหลด
    let imageId, cardId_id = 0;
    if (formData.photoImage) {
      const { url, id } = await handlePhotoUpload(formData.photoImage);
      imageId = id;
      // ใช้ URL ของรูปภาพและ ID ที่ได้จากการอัปโหลดใน formData หรืออื่น ๆ
      formData.photoImage = url;
      console.log("Uploaded Image URL:", url);
      console.log("Uploaded Image ID:", id);
    }
    const base64Image = localStorage.getItem('cardIdImage');
    const cardIdImageObject = await uploadImageFromBase64(base64Image)
    if (cardIdImageObject) {
      cardId_id = cardIdImageObject.id;
      formData.cardIdImage = cardIdImageObject.url;
    }

      const userData = {
      username: formData.username || "cook" + userId ,
      email: "cook" + userId + "@cook.com", // Assuming email is the same as username in this example
      password: "cookcook",
      lineId: userId,
      userType: "customer",
      photoImage: imageId === 0 ? null : imageId,
      cardIdImage: cardId_id === 0 ? null : cardId_id,
      fullName: formData.fullName,
      telNumber: formData.telNumber,
      gender: formData.gender,
      address: formData.address,
      cardID: formData.cardID,
      point: 0,
    };
    console.log("userData before: ", userData);

    const response = await createUser(userData);
    console.log("response: ", response);
    console.log("response tok: ", response.jwt);
    // console.log("response ok: ", response.ok);
    if (response.jwt !== undefined) {
      console.log("User registered successfully!");
      setShowModal(true);
      const token = response.jwt;
      localStorage.setItem('token', token);
    } else {
      throw new Error('User registration failed.');
    }
  };

  const handleImageCaptured = (id, imageData) => {
    if (imageData) {
      localStorage.setItem(id, imageData);
      console.log("id: ", id);
      console.log("imageData: ", imageData);
      setHasImage(true);
      setCapturedImage(imageData);
      console.log("imageData: ", imageData);
    } else {
        setHasImage(false);  // ไม่มีภาพ
      }
  };

  if (loading) return <LoadingSpinner />; // Loading state
  if (error) return <p>Error: {error}</p>; // Error state

  return (
    <>
      { showModal &&
      <>
        <Alert
          title="User registered successfully!"
          message={`Welcome, ${formData.username}! We’re so happy to have you on Cook Website.`}
          path="/home"
          status="success"
        />

      </>
      }
    <ThemeProvider theme={theme}>
      <FileUpload
        photoImage={formData.photoImage} // Pass the selected photo to FileUpload component
        onFileChange={handleFileChange} // Pass handleFileChange function
      />
      <form onSubmit={handleSubmit}>
        <div className="container mx-auto px-4 py-8">
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
              // inputProps={{
              //   pattern: "[A-Za-z0-9]*", // อนุญาตเฉพาะตัวอักษรและตัวเลข
              //   inputMode: "text" // แสดงคีย์บอร์ดสำหรับการพิมพ์ตัวอักษรและตัวเลข
              // }}
              // error={formData.username && !/^[A-Za-z0-9]+$/.test(formData.username)}
              // helperText={
              //   formData.username && !/^[A-Za-z0-9]+$/.test(formData.username)
              //     ? "กรุณากรอกเฉพาะตัวอักษรและตัวเลขเท่านั้น"
              //     : ""
              // }
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
              // inputProps={{
              //   pattern: "[A-Za-z0-9 ]*", // อนุญาตเฉพาะตัวอักษร ตัวเลข และ space
              //   inputMode: "text" // แสดงคีย์บอร์ดสำหรับการพิมพ์ข้อความ
              // }}
              // error={formData.fullName && !/^[A-Za-z0-9 ]+$/.test(formData.fullName)}
              // helperText={ formData.fullName && !/^[A-Za-z0-9 ]+$/.test(formData.fullName) ? "กรุณากรอกเฉพาะตัวอักษร ตัวเลข และช่องว่างเท่านั้น" : "" }
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
                inputProps={{
                  maxLength: 10, // จำกัดจำนวนหลักให้ไม่เกิน 10
                  pattern: "[0-9]*", // อนุญาตเฉพาะตัวเลข
                  inputMode: "numeric", // แสดงคีย์บอร์ดตัวเลขบนอุปกรณ์มือถือ
                }}
                error={
                  formData.telNumber &&
                  (formData.telNumber.length !== 10 || !/^0[0-9]{9}$/.test(formData.telNumber))
                }
                helperText={
                  formData.telNumber && !/^[0-9]+$/.test(formData.telNumber)
                    ? "กรุณากรอกเฉพาะตัวเลขเท่านั้น"
                    : formData.telNumber && formData.telNumber.length !== 10
                    ? "เบอร์โทรศัพท์ต้องมี 10 หลัก"
                    : formData.telNumber && !/^0[0-9]{9}$/.test(formData.telNumber)
                    ? "เบอร์โทรศัพท์ต้องเริ่มต้นด้วยเลข 0"
                    : ""
                }
              />
            </div>
            <div className="w-full px-2 mt-4">
              <FormControl>
                <FormLabel>เพศ*</FormLabel>
                <RadioGroup
                  row
                  name="gender"
                  required
                  value={formData.gender}
                  onChange={handleInputChange}
                >
                  <FormControlLabel
                    value="Male"
                    control={<Radio />}
                    label="ชาย"
                  />
                  <FormControlLabel
                    value="Female"
                    control={<Radio />}
                    label="หญิง"
                  />
                </RadioGroup>
              </FormControl>
            </div>
            <div className="w-full px-2 mt-4">
              <TextField
                id="address"
                label="ที่อยู่"
                placeholder="ที่อยู่"
                multiline
                rows={4}
                className="w-full bg-white"
                required
                value={formData.address}
                onChange={handleInputChange}
                // inputProps={{
                //   pattern: "^[A-Za-z0-9.,\\-\\s]*$", // อนุญาตเฉพาะตัวอักษร ตัวเลข ช่องว่าง จุด จุลภาค และขีดกลาง
                // }}
                // error={
                //   formData.address && !/^[A-Za-z0-9.,\-\s]*$/.test(formData.address)
                // }
                // helperText={
                //   formData.address && !/^[A-Za-z0-9.,\-\s]*$/.test(formData.address)
                //     ? "ที่อยู่ต้องไม่มีอักขระพิเศษอื่น ๆ"
                //     : ""
                // }
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
                inputProps={{
                  maxLength: 13, // จำกัดจำนวนหลักให้ไม่เกิน 13
                  pattern: "[0-9]*", // อนุญาตเฉพาะตัวเลข
                  inputMode: "numeric", // แสดงคีย์บอร์ดตัวเลขบนอุปกรณ์มือถือ
                  }}
                  error={
                    formData.cardID &&
                    (formData.cardID.length !== 13 || !/^[0-9]+$/.test(formData.cardID))
                  }
                  helperText={
                    formData.cardID && !/^[0-9]+$/.test(formData.cardID)
                    ? "กรุณากรอกเฉพาะตัวเลขเท่านั้น"
                    : formData.cardID && formData.cardID.length !== 13
                    ? "หมายเลขบัตรประจำตัวต้องมี 13 หลัก"
                    : ""
                  }
              />
            </div>
            <div className="w-full px-2 mt-4">
            <label className="block text-gray-700 text-sm font-bold mb-2">
                ถ่ายรูปตนเองพร้อมถือบัตรประจำตัวประชาชน<span className="text-red-500">*</span>
              </label>
              {/* <WebcamCapture onCapture={handleImageCapture} /> */}
              <CameraCapture
                onImageCaptured={handleImageCaptured}
                initialImage="" // ใส่ URL ของภาพหรือ Data URL ที่ต้องการ
                id="cardIdImage"
              />
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
          <span>
            <strong>กุ๊ก</strong>ให้ความสำคัญเกี่ยวกับความปลอดภัยข้อมูลของคุณ{" "}
            <span className="text-left leading-loose">
              และเพื่อให้คุณมั่นใจว่า
              กุ๊กมีความมุ่งมั่นที่จะให้ความคุ้มครองและดำเนินการด้วยความรับผิดชอบต่อการเก็บรวบรวม
              ใช้ เปิดเผย และโอนข้อมูลของคุณ กุ๊กจึงขอความยินยอมจากคุณ
            </span>
          </span>
        </div>
        <div className="container mx-auto px-4">
        <button
          type="submit"
          disabled={!isFormValid || !hasImage || showModal}
          className={`w-full h-12 mb-10 flex justify-center rounded-xl items-center text-white font-bold transition duration-300 ${
            isFormValid && !showModal
              ? "bg-green-500 hover:bg-green-600 active:bg-green-700"
              : "bg-slate-300 cursor-not-allowed"
          } ${isFormValid && !showModal ? "cursor-pointer" : ""}`}
        >
          ลงทะเบียน
        </button>
        </div>
      </form>
    </ThemeProvider>
    </>
  );
}

export default Register;
