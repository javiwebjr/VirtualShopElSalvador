import React, {useEffect} from 'react';
import Navbar from '../../components/Navbar';
import { Link, useNavigate } from 'react-router-dom';
import {toast} from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import Message from '../../components/Message';
import ProgressSteps from '../../components/ProgressSteps';
import Loader from '../../components/Loader';
import { useCreateOrderMutation } from '../../redux/api/orderApiSlice';
import { clearCartItems } from '../../redux/features/cart/cartSlice';
import FooterAbsolute from '../../components/FooterAbsolute';

const PlaceOrder = () => {
    const navigate = useNavigate();
    const cart = useSelector(state => state.cart);
    const [createOrder, {isLoading, error}] = useCreateOrderMutation();

    useEffect(() => {
        if(!cart.shippingAddress.address){
            navigate('/shipping');
        }
    }, [cart.paymentMethod, cart.shippingAddress.address, navigate]);

    const dispatch = useDispatch();

    const placeOrderHandler = async () => {
        try {
            const res = await createOrder({
                orderItems: cart.cartItems,
                shippingAddress: cart.shippingAddress,
                paymentMethod: cart.paymentMethod,
                itemsPrice: cart.itemsPrice,
                shippingPrice: cart.shippingPrice,
                taxPrice: cart.taxPrice,
                totalPrice: cart.totalPrice
            }).unwrap();
            dispatch(clearCartItems());
            navigate(`/order/${res._id}`);
        } catch (error) {
            toast.error(error);
        }
    }

    return (
        <>
            <Navbar/>
            <ProgressSteps step1 step2 step3/>
            <div className='container mx-auto mt-5 pb-52'>
                {cart.cartItems.length === 0 ? (
                    <Message>Your Cart Is Empty</Message>
                ): (
                    <div className="overflow-x-auto">
                        <table className='w-full border-collapse'>
                            <thead>
                                <tr>
                                    <td className='px-1 py-2 text-left align-top'>
                                        Image
                                    </td>
                                    <td className='px-1 py-2 text-left'>
                                        Product
                                    </td>
                                    <td className='px-1 py-2 text-left'>
                                        Quantity
                                    </td>
                                    <td className='px-1 py-2 text-left'>
                                        Price
                                    </td>
                                    <td className='px-1 py-2 text-left'>
                                        Total
                                    </td>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.cartItems.map((item, index) => (
                                    <tr key={index}>
                                        <td className='p-2'>
                                            <img src={item.image} 
                                                alt={`Item_Image_Summary_Cart_Table_${item.image}`} 
                                                className='w-20 h-20 object-cover'
                                            />
                                        </td>
                                        <td className='p-2'>
                                            <Link to={`/product/${item.product}`}>
                                                {item.name}
                                            </Link>
                                        </td>
                                        <td className='p-2 text-left'>{item.quantity}</td>
                                        <td className='p-2 text-left'>{item.price.toFixed(2)}</td>
                                        <td className='p-2 text-left'>${(item.quantity * item.price).toFixed(2)}</td>
                                    </tr>
                                ))}
                                
                            </tbody>
                        </table>
                    </div>
                )}
                <div className="mt-8 pb-52">
                    <h2 className="text-2xl font-semibold mb-5">
                        Order Summary
                    </h2>
                    <div className='flex justify-between flex-wrap p-8 bg-slate-100'>
                        <ul className="text-lg">
                            <li>
                                <span className='font-semibold mb-4'>
                                    Items
                                </span>
                                    ${cart.itemsPrice}
                            </li>
                            <li>
                                <span className='font-semibold mb-4'>
                                    Shipping
                                </span>
                                    ${cart.shippingPrice}
                            </li>
                            <li>
                                <span className='font-semibold mb-4'>
                                    Tax
                                </span>
                                    ${cart.taxPrice}
                            </li>
                            <li>
                                <span className='font-semibold mb-4'>
                                    Total
                                </span>
                                    ${cart.totalPrice}
                            </li>
                        </ul>
                        {error &&  <Message variant='danger'>
                            {error.data.message}
                            </Message>}
                        <div>
                            <h2 className='text-2xl font-semibold mb-4'>
                                Shipping
                            </h2>
                            <p>
                                <strong>Address</strong>{" "}
                                {cart.shippingAddress.address}, {cart.shippingAddress.city}{"-"}
                                {cart.shippingAddress.postalCode}, {" "}
                                {cart.shippingAddress.country}
                            </p>
                        </div>
                        <div>
                            <h4 className='text-2xl font-semibold mb-4'>
                                Payment Method
                            </h4>
                            <strong>Payment Method </strong>
                            {cart.paymentMethod}
                        </div>
                    </div>
                    <button type='button' className='bg-teal-500 text-white py-2 px-4 rounded text-lg w-[40%] mt-4' disabled={cart.cartItems === 0}
                        onClick={placeOrderHandler}
                    >
                        Make This Order
                    </button>
                    {isLoading && (<Loader/>)}
                </div>
            </div>
            <FooterAbsolute/>
        </>
    )
}

export default PlaceOrder