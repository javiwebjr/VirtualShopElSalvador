import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {TfiAlignJustify} from 'react-icons/tfi';
import {FaUser, FaTimes} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/api/usersApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import { AiOutlineLogin, AiOutlineUserAdd } from 'react-icons/ai';

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    }
    useEffect(() => {
        const closeMenu = (event) => {
        const button = document.getElementById('admin-menu-button');
        if (
            button &&
            !button.contains(event.target)
        ) {
            setIsMenuOpen(false);
        }
        };
        document.addEventListener('click', closeMenu);
        return () => {
            document.removeEventListener('click', closeMenu);
        };
    }, []);

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
        <div className="flex justify-center items-center m-auto h-[80px] bg-slate-800 fixed top-0 left-0 w-full z-[99]">
            <div className="container flex justify-between items-center">
                <button id="admin-menu-button" className={`${isMenuOpen ? '' : ''} bg-black p-2 rounded mr-12`} onClick={toggleMenu}>
                    <TfiAlignJustify size={20} className={`text-white ${isMenuOpen ? 'hidden' : ''}`}/>
                    {isMenuOpen && (
                        <FaTimes color='white' />
                    )}
                </button>
                {isMenuOpen && (
                    <section className='bg-slate-900 p-4 fixed top-6 left-16 z-50 rounded'>
                        <ul className="list-none mt-2">
                            <li>
                                <NavLink className='list-item py-2 px-3 mb-5 hover:bg-teal-500 rounded' to='/' 
                                    style={({isActive}) => ({
                                        color: isActive ? 'greenyellow' : 'white'
                                    })} 
                                >
                                    Home
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='list-item py-2 px-3 mb-5 hover:bg-teal-500 rounded' to='/shop' 
                                    style={({isActive}) => ({
                                        color: isActive ? 'greenyellow' : 'white'
                                    })} 
                                >
                                    Shop
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='list-item py-2 px-3 mb-5 hover:bg-teal-500 rounded' to='/cart' 
                                    style={({isActive}) => ({
                                        color: isActive ? 'greenyellow' : 'white'
                                    })} 
                                >
                                    Cart
                                </NavLink>
                            </li>
                            <li>
                                <NavLink className='list-item py-2 px-3 mb-5 hover:bg-teal-500 rounded' to='/favorites' 
                                    style={({isActive}) => ({
                                        color: isActive ? 'greenyellow' : 'white'
                                    })} 
                                >
                                    Favorites
                                </NavLink>
                            </li>
                        </ul>
                    </section>
                )}
                <h1 className='text-3xl text-blue-300 font-bold text-center'>HEY BOSS</h1>
                <div 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleMouseEnter}
                    className={`${!userInfo ? 'hidden' : ''} p-4`}
                >
                        <button 
                            onMouseEnter={handleMouseEnter}
                            onClick={handleMouseEnter}
                            className='flex items-center text-gray-300 focus:outline-none hover:trigger'
                        >
                        {
                            userInfo ? <span className='text-gray-300 mr-2'>{userInfo.username}</span> 
                            : <></>
                        }
                        {userInfo && (
                            <FaUser/>
                        )}
                    </button>
                    {dropdownOpen && userInfo && (
                        <ul className={`absolute right-16 -top-24 mt-2 mr-14 space-y-2 bg-opacity-80 bg-white backdrop-blur-2xl text-black z-50 ${!userInfo.isAdmin ? 'top-10' : 'top-10'}`}
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
                    <div 
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}
                    onClick={handleMouseEnter}
                    className={`${userInfo ? 'hidden' : ''} p-4`}
                >
                        <button 
                            onMouseEnter={handleMouseEnter}
                            onClick={handleMouseEnter}
                            className='flex items-center text-gray-700 focus:outline-none hover:trigger'
                        >
                        {!userInfo && (
                            <FaUser/>
                        )}
                    </button>
                    {dropdownOpen && !userInfo && (
                        <ul className={`absolute right-16 top-10 mt-2 mr-14 space-y-2 bg-opacity-80 bg-white backdrop-blur-2xl text-black z-50`}
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                            onClick={handleMouseLeave}
                        >
                            {!userInfo && (
                                <>
                                    <li>
                                        <Link to="/login" className='block px-4 py-2 hover:bg-gray-100'>Login</Link>
                                    </li>
                                    <li>
                                        <Link to="/register" className='block px-4 py-2 hover:bg-gray-100'>Register</Link>
                                    </li>
                                </>
                            )}
                        </ul>
                    )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Navbar