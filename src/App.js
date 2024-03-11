import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';
import Login from './Pages/Login';
import User from './Pages/User/User.jsx';
import AddUser from './Pages/User/addUser.jsx';
import Product from './Pages/Product/products.jsx';
import AddProd from './Pages/Product/addProduct.jsx';
import Seller from './Pages/Seller/Seller';
import EditSeller from './Pages/Seller/editSeller.jsx';
import AddSeller from './Pages/Seller/addSeller';
import VeiwProduct from './Pages/Product/veiwProduct.jsx';
import { EditProduct } from './Pages/Product/editProduct.jsx';
import AddOrder from './Pages/Add/addOrder.jsx';
import Order from './Pages/Add/order.jsx';
import EditOrder from './Pages/Add/editOrder.jsx';
import EditUser from './Pages/User/editUser.jsx';
import Image from './Pages/Image/Image.jsx';
import SearchProduct from './Pages/Search/searchProduct.jsx';
import { useContext } from 'react';
import { AuthContext } from './context/AuthContext.jsx';
import Expense from './Pages/Expense/Expense.jsx';
import AddEpense from './Pages/Expense/addExpense.jsx';
import EditExpense from './Pages/Expense/editExpense.jsx';
import History from './Pages/history/History.jsx';
import Details from './Pages/Detail/Details.jsx';
import Market from './Pages/market/Market.jsx';
import AddMarket from './Pages/market/AddMarket.jsx';
import EditMarket from './Pages/market/EditMarket.jsx';
import AddOrderID from './Pages/Search/addOrderID.jsx';
import ViewExpense from './Pages/Expense/ViewExpense.jsx';
import ViewSeller from './Pages/Seller/ViewSeller.jsx';
import AddHistory from './Pages/history/addHistory.jsx';
import Dashboard from './Pages/Dashboad/Dashboad.jsx';
import WasteProducts from './Pages/wasteProduct/WasteProducts.jsx';
import { EditOrders } from './Pages/Image/EditOrders.jsx';
import ViewWasteProduct from './Pages/wasteProduct/ViewWasteProduct.jsx';
import { EditWasteProduct } from './Pages/wasteProduct/EditWasteProduct.jsx';


function App() {
  const { currentUser } = useContext(AuthContext);

  return (
    <>
      <Routes>
        <Route path='/' element={currentUser ? <Navigate to='/product' /> : <Login />} />
        <Route path='/user' element={currentUser ? <User /> : <Navigate to='/' />} />
        <Route path='/dashboard' element={currentUser ? <Dashboard /> : <Navigate to='/' />} />
        <Route path='/user/edit/:id' element={currentUser ? <EditUser /> : <Navigate to='/' />} />
        <Route path='/adduser' element={currentUser ? <AddUser /> : <Navigate to='/' />} />
        <Route path='/product' element={currentUser ? <Product /> : <Navigate to='/' />} />
        <Route path='/wasteProducts' element={currentUser ? <WasteProducts /> : <Navigate to='/' />} />
        <Route path='/addProd' element={currentUser ? <AddProd /> : <Navigate to='/' />} />
        <Route path='/Seller' element={currentUser ? <Seller /> : <Navigate to='/' />} />
        <Route path='/Expense' element={currentUser ? <Expense /> : <Navigate to='/' />} />
        <Route path='/Market' element={currentUser ? <Market /> : <Navigate to='/' />} />
        <Route path='/addSeller' element={currentUser ? <AddSeller /> : <Navigate to='/' />} />
        <Route path='/addExpense' element={currentUser ? <AddEpense /> : <Navigate to='/' />} />
        <Route path='/addMarket' element={currentUser ? <AddMarket /> : <Navigate to='/' />} />
        <Route path='/addHistory' element={currentUser ? <AddHistory /> : <Navigate to='/' />} />
        <Route path='/Customer' element={currentUser ? <Order /> : <Navigate to='/' />} />
        <Route path='/addCustomer' element={currentUser ? <AddOrder /> : <Navigate to='/' />} />
        <Route path='/addCustomers' element={currentUser ? <AddOrderID /> : <Navigate to='/' />} />
        <Route
          path='/Customer/edit/:order_id'
          element={currentUser ? <EditOrder /> : <Navigate to='/' />}
        />
        <Route path='/Seller/edit/:id' element={currentUser ? <EditSeller /> : <Navigate to='/' />} />
        <Route path='/Expense/edit/:id' element={currentUser ? <EditExpense /> : <Navigate to='/' />} />
        <Route path='/Market/edit/:id' element={currentUser ? <EditMarket /> : <Navigate to='/' />} />
        <Route path='/Product/:product_Id' element={currentUser ? <VeiwProduct /> : <Navigate to='/' />} />
        <Route path='/wasteProducts/:product_Id' element={currentUser ? <ViewWasteProduct /> : <Navigate to='/' />} />
        <Route path='/Expense/:id' element={currentUser ? <ViewExpense /> : <Navigate to='/' />} />
        <Route path='/Seller/:id' element={currentUser ? <ViewSeller /> : <Navigate to='/' />} />
        <Route
          path='/Product/edit/:product_id'
          element={currentUser ? <EditProduct /> : <Navigate to='/' />}
        />
         <Route
          path='/wasteProducts/edit/:product_id'
          element={currentUser ? <EditWasteProduct /> : <Navigate to='/' />}
        />
         <Route
          path='/Search/edit/:product_id'
          element={currentUser ? <EditOrders /> : <Navigate to='/' />}
        />
        <Route path='/Search' element={currentUser ? <Image /> : <Navigate to='/' />} />
        <Route path='/Search/:product_Id' element={currentUser ? <SearchProduct /> : <Navigate to='/' />} />
        <Route path='/History' element={currentUser ? <History /> : <Navigate to='/' />} />
        <Route path='/Details' element={currentUser ? <Details /> : <Navigate to='/' />} />
      </Routes>
      
      <ToastContainer
        position='top-center'
        autoClose={2000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme='dark'
      />
    </>
  );
}

export default App;
