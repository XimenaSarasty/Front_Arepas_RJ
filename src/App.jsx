import "./index.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { HomeLogin } from './pages/HomeLogin.jsx';
import Products from './pages/Products.jsx';
import ShoppingCart from './pages/ShoppingCart';
import ProfileUser from './pages/ProfileUser.jsx';
import ShoppingSummary from './pages/ShoppingSummary.jsx';
import AdmViewNewProd from './pages/AdmViewNewProd.jsx';
import AdmDomicilio from './pages/AdmDomicilio.jsx';
import { RegisterLogin } from "./pages/RegisterLogin..jsx";
import AdmOrder  from "./pages/AdmOrder.jsx";
import HomeAdmView from "./pages/HomeAdmView.jsx";
import UserHistory from "./pages/UserHistory.jsx";
import RolesView from "./pages/RolesView.jsx";
import DataProvider from "./context/cartContext.jsx";
import EditProduct from "./components/EditProduct.jsx";
import ShipmentView from "./components/ShipmentView.jsx";
import Home from "./pages/Home.jsx";
import PaymentGateway from "./pages/PaymentGateway.jsx";
import ShoppingProvider from "./context/shoppingContext.jsx";
import UserProvider from "./context/userContext.jsx";
import AdmProfile from "./pages/AdmProfile.jsx";

function App() {

  return (
    <>
      <UserProvider>
        <ShoppingProvider>
          <DataProvider>
              <BrowserRouter>
              <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/home/login' element={<HomeLogin />} />
                    <Route path='/login/register' element={<RegisterLogin />} />
                    <Route path='/products' element={<Products />} />
                    <Route path='/shoppingcart' element={<ShoppingCart />} />
                    <Route path='/admin/new-product' element={<AdmViewNewProd />} />
                    <Route path='/admin/shipment-fee' element={<AdmDomicilio />} />
                    <Route path='/user/profile' element={<ProfileUser/>} />
                    <Route path='/shoppingsummary' element={<ShoppingSummary />} />
                    <Route path='/admin/adm-order' element={<AdmOrder />} />
                    <Route path='/admin' element={<HomeAdmView />} />
                    <Route path="/admin/profile" element={<AdmProfile />} />
                    <Route path="/user/user-history" element={<UserHistory />} />
                    <Route path="/user/payment/gateway" element={<PaymentGateway />} />
                    <Route path="/admin/roles" element={<RolesView />} />
                    <Route path="/admin/:id/edit-prod" element={<EditProduct />} />
                    <Route path="/admin/shipmentView" element={<ShipmentView />} />
                </Routes>
              </BrowserRouter>
            </DataProvider>
          </ShoppingProvider>
      </UserProvider>
    </>
  )
}

export default App
