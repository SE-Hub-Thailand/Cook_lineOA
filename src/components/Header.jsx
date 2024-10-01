import { NavLink } from "react-router-dom";
import logo from "../assets/images/Group.png";
import "./style.css";
import { useState } from "react";
import { BsBasket2 } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";

function Header() {
  const [clicked, setClicked] = useState(false);
  const [count, setCount] = useState(0);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  };

  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };

  return (
    <>
      <nav className="flex items-center justify-between p-5 pr-20 bg-white">
        <NavLink to="/">
          <img src={logo} alt="Logo" width={50} />
        </NavLink>

        {/* Basket Icon and Count */}
        <div className="flex items-center relative">
          <BsBasket2 className="w-10 h-10 text-green-700 ml-10" />
          {count > 0 && (
            <span className="basket-order absolute -top-2 -right-2 bg-red-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
              {count}
            </span>
          )}
        </div>

        {/* Coin Icon and Balance */}
        <div className="flex flex-col items-center">
          <BsCoin className="w-7 h-7 text-yellow-hard ml-8" />
          <p className="ml-6 mt-2">
            <strong>32000</strong>
          </p>
        </div>

        <div>
          <ul id="navbar" className={clicked ? "#navbar open" : "#navbar"}>
            <li>
              <NavLink
                className="font-semibold hover:text-yellow-hard"
                to="/UserProfile"
                style={({ isActive }) => {
                  return { color: isActive ? "yellow-hard" : "" };
                }}
              >
                ข้อมูลส่วนตัว/ลงทะเบียน
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-semibold hover:text-yellow-hard"
                to="/history-point"
                style={({ isActive }) => {
                  return { color: isActive ? "yellow-hard" : "" };
                }}
              >
                คะแนนสะสมและประวัติการแลกแต้ม
              </NavLink>
            </li>
            <li>
              <NavLink
                className="font-semibold hover:text-yellow-hard"
                to="/history-service-machine"
                style={({ isActive }) => {
                  return { color: isActive ? "yellow-hard" : "" };
                }}
              >
                ประวัติการใช้บริการตู้
              </NavLink>
            </li>
          </ul>
        </div>

        <div id="mobile" onClick={handleClick}>
          <i id="bar" className={clicked ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </nav>
    </>
  );
}

export default Header;
