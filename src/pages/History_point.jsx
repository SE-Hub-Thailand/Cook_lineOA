import React from "react";
import Header from "../components/Header.jsx";
import "../index.css";
import coin from "../assets/images/coins.png";
import Container from '@mui/material/Container'
import BackgroundPoint from '../assets/images/fruit.png';
function History_point() {
  return (
    <>
      <Header />
      <Container maxWidth="sm">
        <p className="text-center mt-16 text-2xl">คะแนนสะสม</p>
        <div className="flex justify-center mt-8">
            <img src={coin} alt="coins" width="120" />
        </div>
        <p className="text-center mt-8 text-xl font-semibold">32000 แต้ม</p>
        <p className="text-center mt-10 text-2xl font-semibold">
            ประวัติการแลกแต้ม
        </p>
        <div className="shadow-inner w-full h-80 bg-white mt-10 rounded-lg mb-3">
            <div className="flex justify-center">
                <img src={BackgroundPoint} alt="ร้านผักคุณนายวิมล" className="top-5 relative bottom-16"/>
            </div>
            <div className="flex justify-center relative top-10 text-xl font-semibold">
                 <p className="">ร้านผักคุณนายวิมล</p>
            </div>
            <div className="grid grid-cols-3 mt-20 text-xl">
                <p className="pl-8">แลกแต้มทั้งหมด</p>
                <p className="pl-20">160</p>
                <p className="pl-16">แต้ม</p>
            </div>
            <p className="mt-10 ml-3">วันอังคารที่ 6 เดือน สิงหาคม 2567 เวลา 18:50 น.</p>
        </div>
        
      </Container>
      
    </>
  );
}
export default History_point;
