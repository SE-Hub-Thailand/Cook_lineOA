// import React from 'react';
import Header from '../components/Header';
// import { CartContext } from "../components/CartContext";
// import { useContext } from 'react';
// import { getAllProductsByShopId } from "../api/strapi/productApi";

// function CartSummary() {
// 	const [products, setProducts] = useState([]);
// 	const [loading, setLoading] = useState(true);
// 	const [error, setError] = useState(null);
// 	const { id } = useParams();
// 	// const [counts, setCounts] = useState(() => {
// 	//   const storedCounts = localStorage.getItem('cart');
// 	//   return storedCounts ? JSON.parse(storedCounts) : {};
// 	// });
// 	const token = import.meta.env.VITE_TOKEN_TEST;
// 	const API_URL = import.meta.env.VITE_API_URL;
// 	const navigate = useNavigate();

//   	const counts = localStorage.getItem('cart') || {};
// 	console.log("products Summary: ", products);
// 	console.log("counts Summary: ", counts);
// 	// useEffect(() => {
// 	// 	const fetchProducts = async () => {
// 	// 	  try {
// 	// 		setLoading(true);
// 	// 		window.addEventListener('load', function () {
// 	// 		  localStorage.removeItem('cart');
// 	// 		});
// 	// 		const ProductData = await getAllProductsByShopId(token, id);
// 	// 		setProducts(ProductData);
// 	// 		setLoading(false);

// 	// 		if (ProductData.length === 0) {
// 	// 		  alert("No product for this shop");
// 	// 		  navigate("/home");
// 	// 		}
// 	// 	  } catch (error) {
// 	// 		console.error('Error fetching products:', error);
// 	// 		setError(error.message);
// 	// 		setLoading(false);
// 	// 	  }
// 	// 	};

// 	// 	fetchProducts();
// 	//   }, [id, token, navigate]);
// //   const cartItems = products
// //     .map(product => {
// //       const quantity = counts[product.id] || 0; // Default to 0 if no count for the product
// //       if (quantity > 0) {
// //         return {
// //           ...product,
// //           quantity,
// //           totalPoints: quantity * product.point,
// //         };
// //       }
// //       return null;
// //     })
// //     .filter(item => item !== null); // Remove null items
// 	// console.log("cartItems Summary: ", products);
// //   // Calculate total items and total points
// //   const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
// //   const totalPoints = cartItems.reduce((acc, item) => acc + item.totalPoints, 0);
// 	console.log("products: ", products);
// 	if (loading) return <p>Loading...</p>;
// 	if (error) return <p>Error: {error}</p>;

//   return (
// 	<>
// 		<Header />
// 	<h1>CartSummary</h1>
//     {/* <div>
//       <h2>รายการที่เลือก</h2>
//       {cartItems.length > 0 ? (
//         <table>
//           <thead>
//             <tr>
//               <th>ลำดับ</th>
//               <th>รายการ</th>
//               <th>จำนวน</th>
//               <th>ใช้แต้มไป</th>
//             </tr>
//           </thead>
//           <tbody>
//             {cartItems.map((item, index) => (
//               <tr key={item.id}>
//                 <td>{index + 1}</td>
//                 <td>{item.name}</td>
//                 <td>{item.quantity} รายการ</td>
//                 <td>{item.totalPoints} แต้ม</td>
//               </tr>
//             ))}
//             <tr>
//               <td colSpan="2">รวมทั้งหมด</td>
//               <td>{totalItems} รายการ</td>
//               <td>{totalPoints} แต้ม</td>
//             </tr>
//           </tbody>
//         </table>
//       ) : (
//         <p>ไม่มีสินค้าที่เลือก</p> // Display this if there are no items in the cart
//       )}
//       <div>
//         <button disabled={cartItems.length === 0}>สร้าง QR Code</button>
//       </div>
//     </div> */}


// 	</>
//   );
// };

// export default CartSummary;
import { useLocation } from 'react-router-dom';

const CartSummary = () => {
  const location = useLocation();
  const { storedCounts, cartItems } = location.state || {};
  const parsedCounts = typeof storedCounts === 'string' ? JSON.parse(storedCounts) : storedCounts;

  return (
	<>
		<Header />
		<div className="flex justify-center mt-6 px-4 sm:px-6 lg:px-8">
      <div className="bg-white shadow-md rounded-lg p-4 sm:p-6 w-full max-w-md border-2 border-gray-300">
        <h1 className="text-xl sm:text-2xl font-semibold text-center mb-4">Cart Summary</h1>
        <h2 className="text-md sm:text-lg font-semibold text-gray-700 mb-4 text-center">รายการที่เลือก</h2>
        <div className="border-b-2 border-gray-300 mb-4"></div>
        {cartItems && cartItems.length > 0 ? (
          <ul className="space-y-3 sm:space-y-4">
            {cartItems.map((item, index) => {
              const count = parsedCounts[item.id];
              if (count > 0) {
                const totalPoints = item.point * count;
                return (
					<li key={item.id} className="flex flex-col sm:flex-row justify-between items-start sm:items-center py-4 border-b border-gray-200">
						<div className="sm:w-2/3">
						<span className="font-semibold text-lg sm:text-xl">รายการที่ {index + 1}:</span>
						<span className="text-md sm:text-lg ml-2">{item.name}</span>
						<br />
						<span className="text-sm sm:text-md text-gray-600">จำนวน {count} รายการ</span>
						</div>

						<div className="text-right sm:w-1/3 mt-2 sm:mt-0">
						{item.point ? (
						<span className="font-semibold text-md sm:text-lg">ใช้แต้มไป {totalPoints} แต้ม</span>
						) : (
						<span className="text-md sm:text-lg text-gray-500">ไม่มีแต้มสำหรับสินค้านี้</span>
						)}
						</div>
				  	</li>
                );
              }
              return null;
            })}
          </ul>
        ) : (
          <p className="text-center text-gray-500">ไม่มีสินค้าในตะกร้า</p>
        )}
        <div className="border-t-2 border-gray-300 mt-4 pt-4">
          <p className="text-center text-xs sm:text-sm text-gray-500">ขอบคุณที่ใช้บริการ</p>
        </div>
      </div>
    </div>
	</>
  );
};

export default CartSummary;

