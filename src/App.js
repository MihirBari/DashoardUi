import {
  Route,
  Routes,
} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './App.css';
import Login from './Pages/Login';
import Dashboad from './Pages/Dashboad/Dashboad.jsx';
import User from './Pages/User/User.jsx';
import addUser from './Pages/User/addUser.jsx';
import Product from './Pages/Product/products.jsx';
import AddProd from './Pages/Product/addProduct.jsx';
import Seller from './Pages/Seller/Seller'
import EditSeller from './Pages/Seller/editSeller.jsx'
import addSeller from './Pages/Seller/addSeller'
import  veiwProduct  from './Pages/Product/veiwProduct.jsx';
import  {EditProduct}  from './Pages/Product/editProduct.jsx';
import AddOrder from './Pages/Add/addOrder.jsx';
import Order from './Pages/Add/order.jsx';
import EditOrder from './Pages/Add/editOrder.jsx';
import Image from './Pages/Image/Image.jsx';

function App() {
  return (
   <>
      <Routes>
        <Route path='/'  Component={Login} > </Route>
        <Route path='/dashboard'  Component={Dashboad} > </Route>
        <Route path='/user'  Component={User} > </Route>
        <Route path='/adduser'  Component={addUser} > </Route>
        <Route path='/product'  Component={Product} > </Route>
        <Route path='/addProd'  Component={AddProd} > </Route>
        <Route path='/addProd'  Component={AddProd} > </Route>
        <Route path='/Seller'  Component={Seller} > </Route>
        <Route path='/addSeller'  Component={addSeller} > </Route>
        <Route path='/Customer'  Component={Order} > </Route>
        <Route path='/addCustomer'  Component={AddOrder} > </Route>
        <Route path="/Customer/edit/:product_id"  Component={EditOrder} > </Route>
        <Route path="/Seller/edit/:id"  Component={EditSeller} > </Route>
        <Route path="/Product/:product_Id"  Component={veiwProduct} > </Route>
        <Route path="/Product/edit/:product_id"  Component={EditProduct} > </Route>
        <Route path="/Search"  Component={Image} > </Route>
    
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark" />
        </>
  );
}

export default App;



