import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { LiffProvider } from 'react-liff';
import App from './App.jsx'
import './index.css'
import { createBrowserRouter, RouterProvider} from 'react-router-dom';
import Home from './pages/Home.jsx';
import HistoryPoint from './pages/History_point.jsx';
import HistoryServiceMachine from './pages/History_service_machine.jsx';
import UserProfile from './pages/UserProfile.jsx';
import ShopDetails from './pages/ShopDetails.jsx';
import ShopDetailsKhunnaiwimon from './pages/ShopDetailsKhunnaiwimon.jsx';
import MapKhunnaiWimon from './components/MapKhunnaiWimon.jsx';
import MapNaitonmai from './components/MapNaitonmai.jsx';
import ShopDetailsNaiTonMai from './pages/ShopDeatilNaiTonMai.jsx';
import ShopDetailParanee from './pages/ShopDetailParanee.jsx';
import MapParanee from './components/MapParanee.jsx';
import ShopDetailNaiKrung from './pages/ShopDetailNaiKrung.jsx';
import MapKrung from './components/MapKrung.jsx';
import ShopDetailKamalad from './pages/ShopDetailKamalad.jsx';
import MapKamalad from './components/MapKamalad.jsx';
import Conclusion from './pages/Conclusion.jsx';
import MachinePosition from './pages/MachinePosition.jsx';
import ContactUs from './pages/ContactUs.jsx';
import ConfirmOrder from './pages/partner/ConfirmOrder.jsx';
import ProfileStore from './pages/partner/ProfileStore.jsx';
import ContactUs_Partner from './pages/partner/ContactUs.jsx';
import PDPA from './pages/partner/PDPA.jsx';
import GetMoneyItems from './pages/partner/GetMoneyItems.jsx';
import AddProduct from './pages/partner/AddProduct.jsx';
import ChooseShop from './pages/ChooseShop.jsx';
import ChooseWimon from './pages/ChooseWimon.jsx';
import Register from './pages/Register.jsx';
import LoginRegister from './pages/LoginRegister.jsx';
import Login from './pages/Login.jsx';
import ShopList from './pages/ShopList.jsx';
import Map from './pages/Map.jsx';

const liffId = import.meta.env.VITE_LIFF_ID ;
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/register/:userId",
    element: <Register />
  },
  {
    path: "/shopList",
    element: <ShopList />
  },
  {
    path: "/first",
    element: <LoginRegister />
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/choose/wimon",
    element: <ChooseWimon />
  },
  {
    path: "/shop/:id",
    element: <ChooseShop />
  },
  {
    path: "/history-point",
    element: <HistoryPoint />
  },
  {
    path: "/history-service-machine",
    element: <HistoryServiceMachine />
  },
  {
    path: "/UserProfile",
    element: <UserProfile />
  },
  {
    path: "/store-map/khunnaiwimon",
    element: <MapKhunnaiWimon />
  },
  {
    path: "/store-map/naitonmai",
    element: <MapNaitonmai />
  },
  {
    path: "/store-map/paranee",
    element: <MapParanee />
  },
  {
    path: "/store-map/krung",
    element: <MapKrung />
  },
  {
    path: "/store-map/kamalad",
    element: <MapKamalad />
  },
  {
    path: "/conclusion",
    element: <Conclusion />
  },
  {
    path: "/machine-position",
    element: <MachinePosition />
  },
  {
    path: "/map",
    element: <Map />
  },
  {
    path: "/contact-us",
    element: <ContactUs />
  },
  {
    path: "/partner",
    element: <ConfirmOrder />
  },
  {
    path: "/partner/profile-store",
    element: <ProfileStore />
  },
  {
    path: "/partner/contact-us",
    element: <ContactUs_Partner />
  },
  {
    path: "/partner/pdpa",
    element: <PDPA />
  },
  {
    path: "/partner/get-money-item",
    element: <GetMoneyItems />
  },
  {
    path: "/partner/add-product",
    element: <AddProduct />
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LiffProvider liffId={liffId}>
      <RouterProvider router={router} />
    </LiffProvider>
  </StrictMode>,
)
