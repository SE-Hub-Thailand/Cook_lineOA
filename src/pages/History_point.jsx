import React from "react";
import Header from "../components/Header.jsx";
import "../index.css";
import coin from "../assets/images/coins.png";
import Container from '@mui/material/Container';
import BackgroundPoint from '../assets/images/fruit.png';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getAllHistoryPoints } from "../api/strapi/historyPointApi";
import { convertDateTime } from '../components/ConvertDateTime';
import LoadingSpinner from '../components/LoadingSpinner';
import AlertNoData from "../components/AlertNoData";

export default function HistoryPoint() {
  console.log("heloooo in HistoryPoint");
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');
  const { id } = useParams();
  const [points, setHistoryPoints] = useState(null); // เปลี่ยนจาก false เป็น null เพื่อเช็คง่ายขึ้น
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistoryPoints = async () => {
      try {
        setLoading(true);
        console.log("Fetching history points...");
        const pointsData = await getAllHistoryPoints(id, token);
        console.log("pointsData: ", pointsData);

        // ตั้งค่าข้อมูลแต้ม หรือ ถ้าไม่มีข้อมูลตั้งค่าเป็น array ว่าง
        setHistoryPoints(pointsData.length > 0 ? pointsData : []);
        setLoading(false); // หยุด loading
      } catch (error) {
        console.error("Error fetching history points:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchHistoryPoints();
  }, [id, token]);

  // ถ้ากำลังโหลดอยู่ ให้แสดง LoadingSpinner
  if (loading) return <LoadingSpinner />;

  // ไม่แสดง error ถ้ามีปัญหา แต่ไม่มีข้อมูล
  if (points === null || points.length === 0) {
    return (
      <>
        <Header />
        <AlertNoData title="No Points Data Available" message="You currently have no recorded point redemptions." />
      </>
    );
  }

  // ถ้ามีข้อมูล ให้แสดงเนื้อหา
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <p className="text-center mt-16 text-2xl">คะแนนสะสม</p>
        <div className="flex justify-center mt-8">
          <img src={coin} alt="coins" width="120" />
        </div>
        <p className="text-center mt-8 text-xl font-semibold">{points[0].user.point} แต้ม</p>
        <p className="text-center mt-10 text-2xl font-semibold">ประวัติการแลกแต้ม</p>

        {points.map((point, index) => (
          <div
            key={index}
            className="shadow-inner w-full max-w-md mx-auto h-auto bg-white mt-10 rounded-lg mb-6 p-4"
          >
            <div className="flex justify-center">
              <img
                src={
                  point.shop?.image?.data?.attributes?.url
                    ? `${API_URL}${point.shop.image.data.attributes.url}`
                    : BackgroundPoint
                }
                alt={`ร้าน ${point.shop?.name}`}
                className="rounded-full w-24 h-24 sm:w-32 sm:h-32 object-cover"
              />
            </div>
            <div className="flex justify-center mt-4 text-lg sm:text-xl font-semibold">
              <p>{point.shop.name}</p>
            </div>
            <div className="grid grid-cols-[4fr_2fr_3fr] mt-10 text-lg sm:text-xl">
              <p className="pl-4 sm:pl-8">แลกแต้มทั้งหมด</p>
              <p className="text-center">{point.totalPoint}</p>
              <p className="pr-4 sm:pr-8 text-right">แต้ม</p>
            </div>
            <p className="mt-6 text-center text-sm sm:text-lg">
              {convertDateTime(point.date, point.time)}
            </p>
          </div>
        ))}
      </Container>
    </>
  );
}
