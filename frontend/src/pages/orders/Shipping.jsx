import React, {useEffect, useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {saveShippingAddress, savePaymentMethod} from '../../redux/features/cart/cartSlice';
import Navbar from '../../components/Navbar';
import ProgressSteps from '../../components/ProgressSteps';
import Footer from '../../components/Footer';
import FooterAbsolute from '../../components/FooterAbsolute';

const Shipping = () => {
    const cart = useSelector(state => state.cart);
    const {shippingAddress} = cart;
    const [paymentMethod, setPaymentMethod] = useState('Paypal');
    const [address, setAddress] = useState(shippingAddress.address || '');
    const [city, setCity] = useState(shippingAddress.city || '');
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode || '');
    const [country, setCountry] = useState(shippingAddress.country || '');
    

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const submitHandler = e => {
        e.preventDefault();
        dispatch(saveShippingAddress({address, city, postalCode, country}));
        dispatch(savePaymentMethod(paymentMethod));
        navigate('/placeorder');
    }

    //Payment Paypal
    useEffect(() => {
        if(!shippingAddress.address){
            navigate('/shipping')
        }
    }, [navigate, shippingAddress])
    return (
        <>
            <Navbar/>
            <div className='mt-[130px] container mx-auto pb-40'>
                <ProgressSteps step1 step2/>
                <div className="mt-2 flex justify-around items-center flex-wrap">
                    <form onSubmit={submitHandler} className='w-[40rem]'>
                        <h1 className="text-2xl font-semibold mb-4">
                            Shipping
                        </h1>
                        <div className="mb-4">
                            <label className='block text-slate-950 mb-2'>
                                Address
                            </label>
                            <input type="text" className='w-full p-2 border rounded' placeholder='Enter Your Address' value={address} required 
                                onChange={e => setAddress(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className='block text-slate-950 mb-2'>
                                City
                            </label>
                            <input type="text" className='w-full p-2 border rounded' placeholder='Enter Your City' value={city} required 
                                onChange={e => setCity(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className='block text-slate-950 mb-2'>
                                Postal Code
                            </label>
                            <input type="text" className='w-full p-2 border rounded' placeholder='Enter Postal Code City' value={postalCode} required 
                                onChange={e => setPostalCode(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className='block text-slate-950 mb-2'>
                                Country
                            </label>
                            <input type="text" className='w-full p-2 border rounded' placeholder='Enter Your Country' value={country} required 
                                onChange={e => setCountry(e.target.value)}
                            />
                        </div>
                        <div className="mb-4">
                            <label className='block text-slate-950 mb-2'>
                                Payment Method
                            </label>
                            <div className="mt-2">
                                <label className='inline-flex items-center'>
                                    <input type="radio" className='form-radio text-teal-500' name='paymentMethod' value='PayPal' 
                                    checked={paymentMethod === 'PayPal'} 
                                    onChange={e => setPaymentMethod(e.target.value)}    
                                />
                                    <span className='ml-2'>PayPal Or Credit Card</span>
                                </label>
                            </div>
                        </div>
                        <button 
                            className='bg-teal-600 text-white py-2 px-4 rounded text-lg w-full'
                            type='submit'    
                        >
                            Continue
                        </button>
                    </form>
                </div>
            </div>
            <FooterAbsolute/>
        </>
    )
}

export default Shipping