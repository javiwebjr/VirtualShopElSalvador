import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import {Route, RouterProvider, createRoutesFromElements} from 'react-router';
import {createBrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store.js';
import PrivateRoute from './components/PrivateRoute.jsx';
import Login from './pages/auth/Login.jsx';
import Register from './pages/auth/Register.jsx';
import Profile from './pages/user/Profile.jsx';
import AdminRoute from './pages/admin/AdminRoute.jsx';
import UserList from './pages/admin/UserList.jsx';
import ConfirmAccount from './components/ConfirmAccount.jsx';
import CategoryList from './pages/admin/CategoryList.jsx';
import ProductList from './pages/admin/ProductList.jsx';
import ProductUpdate from './pages/admin/ProductUpdate.jsx';
import AllProducts from './pages/admin/AllProducts.jsx';
import "./index.css";
// import ConfirmedRoute from './components/ConfirmedRoute.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/confirm-account/:id' element={<ConfirmAccount/>} />
        <Route path='/profile' element={<Profile/>} />
      </Route>
      {/* AdminRoute */}
      <Route path='/admin' element={<AdminRoute/>}>
        <Route path='userlist' element={<UserList/>} />
        <Route path='categorylist' element={<CategoryList/>} />
        <Route path='productlist' element={<ProductList/>} />
        <Route path='allproductslist' element={<AllProducts/>} />
        <Route path='product/update/:id' element={<ProductUpdate/>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  // </React.StrictMode>,
)
