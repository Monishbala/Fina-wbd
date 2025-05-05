import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import Landing from './components/LandingPge'
import Register from './components/user/Register'
import Login from './components/user/Login'
import Homepage from './components/user/Home';
import ContactUs from './components/user/Contactus';
import AboutUs from './components/user/AboutUs'
import  AdminLogin  from './components/admin/AdminLogin';
import AdminHome from './components/admin/AdminHome';
import AdminBook from './components/admin/AdminBook';
import SuperLogin from './components/superuser/SuperLogin';
import SuperHome from './components/superuser/SuperHome';
import SuperAdmin from './components/superuser/SuperAdmin'
import SuperBook from './components/superuser/SuperBook'
import SeperateBook from './components/user/SeperateBook';
import AllBook from './components/user/AllBook'
import AllBestSeller from './components/user/AllBestSeller';
import SellBook from './components/user/SellBook';
import UsedBook from './components/user/UsedBook';
import RequestBook from './components/user/RequestBook';
import CartPage from './components/user/CartPage';
import OrderPage from './components/user/OrderPage';
import UserOrder from './components/user/UserOrder'
import SuperAnalytics from './components/superuser/SuperAnalytics'
import TermOfUse from './components/user/TermOfUse';
import Faq from './components/user/Faq';

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' Component={Landing}/>
        <Route path='/signup' Component={Register}/>
        <Route path='/login' Component={Login}/>
        <Route path="/users/:id" Component={Homepage} />
        <Route path="/contactus" Component={ContactUs} />
        <Route path="/aboutus" Component={AboutUs} />
        <Route path="/admin/loginpages" Component={AdminLogin} />
        <Route path="/adminhome/:admin" element={<AdminHome />} />
        <Route path="/adminhome/bookadmin/:admin" element={<AdminBook />} />
        <Route path="/superUser" element={<SuperLogin />} />
        <Route path="/superUser/home" element={<SuperHome />} />
        <Route path="/admincreate" element={<SuperAdmin />} />
        <Route path="/superuser/addbook" element={<SuperBook />} />
        <Route path='/superuser/analytics' element={<SuperAnalytics/>} />
        <Route path="/book/:bookid/:userid" element={< SeperateBook/>} />
        <Route path="/allbooks/:id" element={<AllBook />} />
        <Route path="/bestseller/:id" element={<AllBestSeller />} />
        <Route path="/sellbooks/:id" element={<SellBook />} />
        <Route path="/usedBook/:id" element={<UsedBook />} />
        <Route path="/request/:id" element={< RequestBook />} />
        <Route path="/mybooks/:id" element={< CartPage />} />
        <Route path="/order/:id" element={< OrderPage />} />
        <Route path="/orders/:id" element={< UserOrder />} />
        <Route path="/aboutus" element={< AboutUs />} />
        <Route path="/terms" element={< TermOfUse />} />
        <Route path="/faq" element={< Faq />} />
      </Routes>
    </Router>
  );
}

export default App;
