import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import {AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart} from 'react-icons/ai';
import {FaHeart} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import {useLogoutMutation} from '../../redux/api/usersApiSlice';
import { logout } from '../../redux/features/auth/authSlice';
import "./navigation.css";

const Navigation = () => {
    const {userInfo} = useSelector(state => state.auth);
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [showSideBar, setShowSideBar] = useState(false);
    const handleMouseEnter = () => {
        setDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setDropdownOpen(false);
    };
    const toggleSideBar = () => {
        setShowSideBar(!showSideBar);
    }
    const closeSideBar = () => {
        setShowSideBar(false);
    }
    

    
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutApiCall] = useLogoutMutation();
    const logoutHandler = async () => {
        try {
            await logoutApiCall().unwrap();
            dispatch(logout());
            navigate('/login')
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div style={{zIndex: 999}} 
            className={`${showSideBar ? "hidden" : 'flex'} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-opacity-50 bg-black backdrop-blur-sm w-[4%] hover:w-[15%] h-[100vh] fixed items-center`}
            id='navigation-container'
        >
            <div className="flex flex-col justify-center space-y-4">
                <Link to="/" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineHome size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Home</span>
                </Link>
                <Link to="/shop" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShopping size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Shop</span>
                </Link>
                <Link to="/cart" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <AiOutlineShoppingCart size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Cart</span>
                </Link>
                <Link to="/favorite" className='flex items-center transition-transform transform hover:translate-x-2'>
                    <FaHeart size={26} className='mr-2 mt-[3rem]' />
                    <span className="hidden nav-item-name mt-[3rem]">Favorite</span>
                </Link>
                
            </div>
            <div className="relative group"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onClick={handleMouseLeave}
            >
                <button onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={() => setDropdownOpen(!dropdownOpen)}
                    className='flex items-center text-gray-700 focus:outline-none hover:trigger'
                >
                    {
                        userInfo ? <span className='text-white'>{userInfo.username}</span> 
                        : <></>
                    }
                    {userInfo && (
                        <svg
                            xmlns='http://www.w3.org/2000/svg'
                            className={`h-4 w-4 ml-1 ${
                                dropdownOpen ? "transform rotate-180deg" : ""
                            }`}
                            fill='none'
                            viewBox='0 0 24 24'
                            stroke='white'
                        >
                            <path
                                strokeLinecap='rounde'
                                strokeLinejoin='rounde'
                                strokeWidth="2"
                                d={dropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"}
                            />
                        </svg>
                    )}
                </button>
                {dropdownOpen && userInfo && (
                    <ul className={`absolute left-8 -top-24 mt-2 mr-14 space-y-2 bg-opacity-80 bg-white backdrop-blur-2xl text-black ${!userInfo.isAdmin ? '-top-20' : '-top-80'}`}
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                        onClick={handleMouseLeave}
                    >
                        {userInfo.isAdmin && (
                            <>
                                <li>
                                    <Link to="/admin/dashboard" className='block px-4 py-2 hover:bg-gray-100'>Dashboard</Link>
                                </li>
                                <li>
                                    <Link to="/admin/productlist" className='block px-4 py-2 hover:bg-gray-100'>Products</Link>
                                </li>
                                <li>
                                    <Link to="/admin/categorylist" className='block px-4 py-2 hover:bg-gray-100'>Categories</Link>
                                </li>
                                <li>
                                    <Link to="/admin/orderlist" className='block px-4 py-2 hover:bg-gray-100'>
                                        Orders 
                                    </Link> 
                                </li>
                                <li>
                                    <Link to="/admin/userlist" className='block px-4 py-2 hover:bg-gray-100'>
                                        Users
                                    </Link>
                                </li>
                                
                            </>
                        )}
                        <li>
                            <Link to="/profile" className='block px-4 py-2 hover:bg-gray-100'>
                                Profile
                            </Link>
                        </li>
                        <li>
                            <Link to="/login" className='block px-4 py-2 hover:bg-gray-100'
                                onClick={logoutHandler}
                            >
                                Logout
                            </Link>
                        </li>
                    </ul>
                )}
            </div>
            {!userInfo && (
                <ul>
                    <li>
                        <Link to="/login" className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineLogin size={26} className='mr-2 mt-[3rem]' />
                            <span className="hidden nav-item-name mt-[3rem]">Login</span>
                        </Link>
                    </li>
                    <li>
                        <Link to="/register" className='flex items-center transition-transform transform hover:translate-x-2'>
                            <AiOutlineUserAdd size={26} className='mr-2 mt-[3rem]' />
                            <span className="hidden nav-item-name mt-[3rem]">Register</span>
                        </Link>
                    </li>
                </ul>
            )}
        </div>
    )
}

export default Navigation