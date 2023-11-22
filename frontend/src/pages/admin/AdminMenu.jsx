import React, {useState, useEffect} from 'react';
import { NavLink } from 'react-router-dom';
import {FaTimes} from 'react-icons/fa';

const AdminMenu = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const toggleMenu = () => {
        setIsMenuOpen(prevState => !prevState);
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

    return (
        <>
            <button id="admin-menu-button" className={`${isMenuOpen ? 'top-2 right-2' : 'top-5 right-7'} bg-[#151515] p-2 fixed rounded`} onClick={toggleMenu}>
                {isMenuOpen ? (
                    <FaTimes color='white' />
                ) : (<>
                        <div onClick={toggleMenu} className="w-6 h-0.5 bg-white my-1"></div>
                        <div onClick={toggleMenu} className="w-6 h-0.5 bg-white my-1"></div>
                        <div onClick={toggleMenu} className="w-6 h-0.5 bg-white my-1"></div>
                    </>
                )}
            </button>
            {isMenuOpen && (
                <section onClick={toggleMenu} className='bg-[#151515] p-4 fixed right-7 top-5'>
                    <ul className="list-none mt-2">
                        <li>
                            <NavLink className='list-item py-2 px-3 block mb-5 hover:bg-teal-500 rounded' to='/admin/dashboard' 
                                style={({isActive}) => ({
                                    color: isActive ? 'greenyellow' : 'white'
                                })} 
                            >
                                Dashboard
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='list-item py-2 px-3 block mb-5 hover:bg-teal-500 rounded' to='/admin/categorylist' 
                                style={({isActive}) => ({
                                    color: isActive ? 'greenyellow' : 'white'
                                })} 
                            >
                                Categories
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='list-item py-2 px-3 block mb-5 hover:bg-teal-500 rounded' to='/admin/productlist' 
                                style={({isActive}) => ({
                                    color: isActive ? 'greenyellow' : 'white'
                                })} 
                            >
                                Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='list-item py-2 px-3 block mb-5 hover:bg-teal-500 rounded' to='/admin/allproductslist' 
                                style={({isActive}) => ({
                                    color: isActive ? 'greenyellow' : 'white'
                                })} 
                            >
                                All Products
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='list-item py-2 px-3 block mb-5 hover:bg-teal-500 rounded' to='/admin/userlist' 
                                style={({isActive}) => ({
                                    color: isActive ? 'greenyellow' : 'white'
                                })} 
                            >
                                Users
                            </NavLink>
                        </li>
                        <li>
                            <NavLink className='list-item py-2 px-3 block mb-5 hover:bg-teal-500 rounded' to='/admin/orderlist' 
                                style={({isActive}) => ({
                                    color: isActive ? 'greenyellow' : 'white'
                                })} 
                            >
                                Orders
                            </NavLink>
                        </li>
                    </ul>
                </section>
            )}
        </>
    )
}

export default AdminMenu