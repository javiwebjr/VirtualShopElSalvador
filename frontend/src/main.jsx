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
import Home from './Home.jsx';
import Favorites from './pages/products/Favorites.jsx';
import ProductDetails from './pages/products/ProductDetails.jsx';
import Cart from './pages/Cart.jsx';
import Shop from './pages/Shop.jsx';
import SubCategoryList from './pages/admin/SubCategoryList.jsx';
import SubShop from './pages/subShop.jsx';
import Shipping from './pages/orders/Shipping.jsx';
import PlaceOrder from './pages/orders/PlaceOrder.jsx';
import {PayPalScriptProvider} from '@paypal/react-paypal-js';
import Order from './pages/orders/Order.jsx';
import UserOrder from './pages/user/UserOrder.jsx';
import OrderList from './pages/admin/OrderList.jsx';
import AdminDashboard from './pages/admin/AdminDashboard.jsx';
// import ConfirmedRoute from './components/ConfirmedRoute.jsx';


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      <Route index={true} path='/' element={<Home/>}/>
      <Route path='/favorites' element={<Favorites/>} />
      <Route path='/product/:id' element={<ProductDetails/>} />
      <Route path='/cart' element={<Cart/>} />
      <Route path='/shop' element={<Shop/>} />
      <Route path='/subshop' element={<SubShop/>} />
      <Route path='/user-orders' element={<UserOrder/>} />
      
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/confirm-account/:id' element={<ConfirmAccount/>} />
        <Route path='/profile' element={<Profile/>} />
        <Route path='/shipping' element={<Shipping/>} />
        <Route path='/placeorder' element={<PlaceOrder/>} />
        <Route path='/order/:id' element={<Order/>} />

      </Route>
      {/* AdminRoute */}
      <Route path='/admin' element={<AdminRoute/>}>
        <Route path='dashboard' element={<AdminDashboard/>} />
        <Route path='userlist' element={<UserList/>} />
        <Route path='categorylist' element={<CategoryList/>} />
        <Route path='subcategorylist' element={<SubCategoryList/>} />
        <Route path='productlist' element={<ProductList/>} />
        <Route path='orderlist' element={<OrderList/>} />
        <Route path='allproductslist' element={<AllProducts/>} />
        <Route path='product/update/:id' element={<ProductUpdate/>} />
      </Route>
    </Route>
  )
)

ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <Provider store={store}>
      <PayPalScriptProvider>
        <RouterProvider router={router} />
      </PayPalScriptProvider>
    </Provider>
  // </React.StrictMode>,
)
