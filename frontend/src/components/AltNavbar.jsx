import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, Link } from 'react-router-dom';
import {FaCartArrowDown, FaCodeBranch} from 'react-icons/fa'
import { useDispatch, useSelector } from 'react-redux';
import { useLogoutMutation } from '../redux/api/usersApiSlice';
import { logout } from '../redux/features/auth/authSlice';
import { AiFillShopping, AiFillHome, AiFillHeart } from 'react-icons/ai';

const AltNavbar = () => {
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
        <div className="flex justify-center items-center m-auto mt-[80px] h-[50px] bg-slate-700 fixed top-0 left-0 w-full z-[40]">
            <div className="container flex justify-between items-center">
                
                <Link to='/subshop' className='text-lg text-teal-300 font-light text-center hover:scale-110 hover:text-white transition-all flex items-center gap-1'>
                    Subcategories <FaCodeBranch/>
                </Link>
                <Link to='/shop' className='text-lg text-teal-300 font-light text-center hover:scale-110 hover:text-white transition-all flex items-center gap-1'>
                    Shop <AiFillShopping/>
                </Link>
                <Link to='/' className='text-lg text-teal-300 font-light text-center hover:scale-110 hover:text-white transition-all flex items-center gap-1'>
                    Home <AiFillHome/>
                </Link>
                <Link to='/cart' className='text-lg text-teal-300 font-light text-center hover:scale-110 hover:text-white transition-all flex items-center gap-1'>
                    Cart <FaCartArrowDown/>
                </Link>
                <Link to='/favorites' className='text-lg text-teal-300 font-light text-center hover:scale-110 hover:text-white transition-all flex items-center gap-1'>
                    Favorites <AiFillHeart/>
                </Link>
                
                
            </div>
        </div>
    )
}

export default AltNavbar