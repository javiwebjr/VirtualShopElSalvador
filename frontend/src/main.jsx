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
import "./index.css";


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<App/>}>
      <Route path='/login' element={<Login/>} />
      <Route path='/register' element={<Register/>} />
      
      <Route path='' element={<PrivateRoute/>}>
        <Route path='/profile' element={<Profile/>} />
        <Route path='/confirm-account/:id' element={<ConfirmAccount/>} />
      </Route>
      {/* AdminRoute */}
      <Route path='/admin' element={<AdminRoute/>}>
        <Route path='userlist' element={<UserList/>} />
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
