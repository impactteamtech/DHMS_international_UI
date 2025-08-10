import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout/Layout';
import Home from './components/Home/Home';
import Shop from './components/Shop/Shop';
import Cart from './components/Cart/Cart';
import SignIn from './components/SignIn/SignIn';
import SignUp from './components/SignUp/SignUp';
import Dashboard from './components/Dashboard/Dashboard';
import Contact from './components/Contact/Contact';
import ScrollToTop from './components/ScrollToTop/ScrollToTop';
import { Toaster } from 'react-hot-toast';
import CheckOut from './components/CheckOut/CheckOut';
import SuccessPage from './components/SuccessPage/SuccessPage';
import CancelPage from './components/CancelPage/CancelPage';
import OrderHistory from './components/Dashboard/SubPages/OrderHistory';
import Overview from './components/Dashboard/SubPages/Overview';
import Favorites from './components/Dashboard/SubPages/Favorites';
import AccountInfo from './components/Dashboard/SubPages/AccountInfo';
import UpdatePassword from './components/Dashboard/ChangePassword';


function App() {
  return (
    <>
      <Toaster position="top-center" />
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="shop" element={<Shop />} />
          <Route path="cart" element={<Cart />} />
          <Route path="login" element={<SignIn/>} />
          <Route path="register" element={<SignUp />} />
          <Route path="contact" element={<Contact />} />
          <Route path="checkout" element={<CheckOut />} />
          <Route path="success" element={<SuccessPage/>} />
          <Route path="cancel" element={<CancelPage/>} />
          {/* NESTED DASHBOARD routes*/}
          <Route path="dashboard" element={<Dashboard/>}>
            <Route path="orders" element={<OrderHistory/>} />
            <Route path="overview" element={<Overview />} />
            <Route path="favorites" element={<Favorites />} />
            <Route path="profile" element={<AccountInfo />} />
            <Route path="change-password" element={<UpdatePassword/>} />
          </Route>
        </Route>
      </Routes>
    </>
  );
}

export default App;
