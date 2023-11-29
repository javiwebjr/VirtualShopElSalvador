import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { useSelector, useDispatch } from 'react-redux';
import { FaTrash } from 'react-icons/fa';
import { addToCart, removeFromCart } from '../redux/features/cart/cartSlice';
import FooterAbsolute from '../components/FooterAbsolute';

const Cart = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const cart = useSelector(state => state.cart);
    const {cartItems} = cart;

    const addToCartHandler = (product, quantity) => {
        dispatch(addToCart({...product, quantity}));
    }
    const removeFromCartHandler = id => {
        dispatch(removeFromCart(id));
    }
    const checkoutHandler = () => {
        navigate('/login?redirect=/shipping');
    }
    return (
        <>
            <Navbar/>
            <div className={`container flex justify-around items-start flex-wrap mx-auto mt-[130px] pb-52 pt-5`}>
                {cartItems.length === 0 ? (<h2 className='text-4xl mb-96'>
                            Your Cart Is Empty 
                            <Link className={`font-bold text-teal-500 hover:text-teal-700 hover:underline transition-all`}>
                                Start Shopping
                            </Link>
                        </h2>) : (
                    <>
                        <div className="flex flex-col w-[80%]">
                            <h1 className='text-2xl font-semibold mb-4'>Shoping Cart</h1>
                            {cartItems.map(item => (
                                <div key={item._id} className='flex items-center mb-4 pb-2 border-b'>
                                    <div className="w-20 h-20">
                                        <img src={item.image} alt="Cart_Image_Item" className='w-full h-full object-cover rounded' />
                                    </div>
                                    <div className="flex-1 ml-4">
                                        <Link to={`/product/${item._id}`} className='text-teal-500'>
                                            {item.name}
                                        </Link>
                                        <div className="mt-2 text-black">
                                            {item.brand}
                                        </div>
                                        <div className="mt-2 text-black font-semibold">
                                            ${item.price}
                                        </div>
                                    </div>
                                    <div className="w-24">
                                        <select 
                                            className='w-full p-1 border rounded text-black' 
                                            value={item.quantity} 
                                            onChange={e => addToCartHandler(item, Number(e.target.value))}
                                        >
                                            {[...Array(item.countInStock).keys()].map(
                                                cart => (
                                                    <option key={cart + 1} value={cart + 1}>
                                                        {cart + 1}
                                                    </option>
                                                )
                                            )}
                                        </select>
                                    </div>
                                    <div>
                                        <button className='text-red-600 mr-20'
                                            onClick={() => removeFromCartHandler(item._id)}
                                        >
                                            <FaTrash className='ml-4 '/>
                                        </button>
                                    </div>
                                </div>
                            ))}
                            <div className="mt-8 w-[40rem]">
                                <div className="p-4 rounded">
                                    <h2 className='text-xl font-semibold mb-2'>
                                        Items ({" "}{cartItems.reduce((accumulator, item) => accumulator + item.quantity, 0)}{" "})
                                    </h2>
                                    <div className="text-2xl font-bold">
                                        ${cartItems.reduce((accumulator, item) => accumulator + item.quantity * item.price, 0).toFixed(2)}
                                    </div>
                                    <button 
                                        className='bg-teal-500 mt-4 py-2 px-4 rounded text-lg w-full text-white hover:bg-teal-700' 
                                        disabled={cartItems.length === 0}
                                        onClick={checkoutHandler}
                                    >
                                        Proceed To Checkout
                                    </button>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
            <FooterAbsolute/>
        </>
    )
}

export default Cart