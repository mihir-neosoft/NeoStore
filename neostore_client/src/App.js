import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Dashboard from './components/application/Dashboard/Dashboard';
import ForgetPassword from './components/application/User/ForgetPassword';
import Home from './components/application/Home';
import Login from './components/application/User/Login';
import Registration from './components/application/User/Registration';
import Footer from './components/common/Footer';
import Navigation from './components/common/Navigation';
import ResetPassword from './components/application/User/ResetPassword';
import Logout from './components/application/User/Logout';
import MyAccount from './components/application/MyAccount/MyAccount';
import Profile from './components/application/MyAccount/Profile';
import Orders from './components/application/MyAccount/Orders';
import Addresses from './components/application/MyAccount/Addresses';
import AddAddress from './components/application/MyAccount/AddAddress';
import ChangePassword from './components/application/MyAccount/ChangePassword';
import Products from './components/application/Product/Products';
import ProductDetail from './components/application/Product/ProductDetail';
import Cart from './components/application/Cart';
import Checkout from './components/application/Checkout';

function App() {
  return (
    <div>

      <BrowserRouter>
        <Navigation />
        <img src="./Neostore_Images/Beds/category.webp" alt="" />
        <Routes>
          {/* dashboard */}
          <Route path="/" element={<Dashboard />} />
          <Route path="/home" element={<Home />} />

          {/* user auth route */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/forgetpassword" element={<ForgetPassword />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="/logout" element={<Logout />} />

          {/* product routes */}
          <Route path="/products" element={<Products />} />
          <Route path="/products/:id" element={<ProductDetail />} />

          {/* my account routes */}
          <Route path="/myaccount" element={<MyAccount />} >
            <Route path="" element={<Profile />} />
            <Route path="orders" element={<Orders />} />
            <Route path="addresses" element={<Addresses />} />
            <Route path="addnewaddress" element={<AddAddress />} />
            <Route path="changepassword" element={<ChangePassword />} />
          </Route>
          {/* order */}
          <Route path="/orders" element={<Orders />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
        </Routes>
        <Footer />
      </BrowserRouter>

    </div>
  );
}

export default App;
