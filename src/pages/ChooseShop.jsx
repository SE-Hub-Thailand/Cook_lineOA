import Header from "../components/Header";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { NavLink } from "react-router-dom";
import logo from "../assets/images/Group.png";
import "../components/style.css";
import { BsBasket2 } from "react-icons/bs";
import { BsCoin } from "react-icons/bs";
import { useParams } from "react-router-dom";
import { useEffect, useState } from 'react';
import { getAllProductsByShopId } from "../api/strapi/productApi";

export default function ChooseShop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams(); // Get shopId from URL params
  const [counts, setCounts] = useState({}); // Use an object to keep track of product counts
  const token = import.meta.env.VITE_TOKEN_TEST ;
  const API_URL = import.meta.env.VITE_API_URL;
  // const token = localStorage.getItem('accessToken');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const ProductData = await getAllProductsByShopId(token, id);
        setProducts(ProductData);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching products:', error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [id, token]);

  const handleIncrement = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: (prevCounts[productId] || 0) + 1,
    }));
  };

  const handleDecrement = (productId) => {
    setCounts((prevCounts) => ({
      ...prevCounts,
      [productId]: prevCounts[productId] > 0 ? prevCounts[productId] - 1 : 0,
    }));
  };

  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked((prevState) => !prevState);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <>
      <nav className="flex items-center justify-between p-5 pr-20 bg-white">
        <NavLink to="/">
          <img src={logo} alt="Logo" width={50} />
        </NavLink>
        <NavLink to="/conclusion">
        <BsBasket2 className="w-10 h-10 text-green-700 ml-10 relative top-4" />
        {counts >= 0 && (
            <span className="relative number-basket  inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 rounded-full">
              {counts}
            </span>
          )}
        </NavLink>
        <div className="flex flex-col">
          <BsCoin  className="w-7 h-7 text-yellow-hard ml-8 " />
          <p className="ml-6 mt-2"><strong>32000</strong></p>
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
      <Container maxWidth="sm">
      <p className="text-3xl text-center pt-10">{products[id].shop.name}</p>
        {products.map(product => (
          <div key={product.id}>
            <div className="w-full h-60 bg-white mt-10 rounded-s-md">
              <div className="flex justify-center ">
                <span
                  className="circle"
                  style={{
                    backgroundImage: product.image?.data?.attributes?.url
                      ? `url(${API_URL}${product.image.data.attributes.url})`
                      : 'url(https://cdn.britannica.com/70/234870-050-D4D024BB/Orange-colored-cat-yawns-displaying-teeth.jpg)', // fallback to default image if no image found
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    width: "100%", // Set width to 100% to make it responsive
                    maxWidth: "150px", // Limit the max width
                    height: "150px", // Set height for larger image
                    borderRadius: "50%", // Circle shape
                  }}
                ></span>
              </div>
              <div className="flex flex-row">
                <button
                  className="basis-1/4 rounded-bl-md bg-red-hard-bg text-white font-bold text-3xl pb-3 width-button-inandde"
                  style={{ height: '2.9rem' }}
                  onClick={() => handleDecrement(product.id)}>
                  -
                </button>
                <button
                  className="basis-1/2 col-start-2 col-span-4 bg-yellow-hard-bg font-bold width-button-count"
                  style={{ height: '2.9rem' }}>
                  {counts[product.id] || 0}
                </button>
                <button
                  className="basis-1/4 bg-green-hard-bg text-white font-bold text-3xl pb-3 rounded-br-md width-button-inandde"
                  style={{ height: '2.9rem' }}
                  onClick={() => handleIncrement(product.id)}>
                  +
                </button>
              </div>
            </div>
            <p className="text-center text-2xl mt-10">{product.name}</p>
            <p className="text-center text-2xl mt-3 pb-10">35 แต้ม</p>
          </div>
        ))}
      </Container>
    </>
  );
}
