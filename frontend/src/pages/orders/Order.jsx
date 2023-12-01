import React, {useEffect} from 'react';
import { Link, useParams } from 'react-router-dom';
import { PayPalButtons, usePayPalScriptReducer } from '@paypal/react-paypal-js';
import { useSelector } from 'react-redux';
import {toast} from 'react-toastify';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import {useDeliverOrderMutation, 
    useGetOrderDetailsQuery, 
    useGetPaypalClientIdQuery, 
    usePayOrderMutation
} from '../../redux/api/orderApiSlice';
import Navbar from '../../components/Navbar'
import FooterAbsolute from '../../components/FooterAbsolute';
import { AiOutlineWhatsApp } from 'react-icons/ai';

const Order = () => {
    const {id: orderId} = useParams();
    const {data: order, refetch, isLoading, error} = useGetOrderDetailsQuery(orderId);
    const [payOrder, {isLoading: loadingPay}] = usePayOrderMutation();
    const [deliverOrder, {isLoading: loadingDeliver}] = useDeliverOrderMutation();
    const {userInfo} = useSelector(state => state.auth);
    const [{isPending}, paypalDispatch] = usePayPalScriptReducer();
    const {data: paypal, isLoading: loadingPaypal, error: errorPaypal} = useGetPaypalClientIdQuery();

    useEffect(() => {
        if(!errorPaypal && !loadingPaypal && paypal.clientId){
            const loadingPaypalScript = async () => {
                paypalDispatch({
                    type: "resetOptions",
                    value:  {
                        "client-id": paypal.clientId,
                        currency: "USD",
                    }
                })
                paypalDispatch({type: "setLoadingStatus", value: 'pending'})
            }
            if(order && !order.isPaid){
                if(!window.paypal){
                    loadingPaypalScript();
                }
            }
        }
    }, [errorPaypal, loadingPaypal, order, paypal, paypalDispatch]);

    function onApprove(data, actions){
        return actions.order.capture().then(async function (details){
            try {
                await payOrder({orderId, details});
                refetch();
                toast.success('Order Is Paid')
            } catch (error) {
                toast.error(error?.data?.message || error.message);
            }
        })
    }

    function createOrder(data, actions) {
        return actions.order.create({
            purchase_units: [{amount: {value: order.totalPrice}}]
        }).then(orderId => {
            return orderId
        })
    }
    function onError(err){
        toast.error(err.message);
    }

    const deliverHandler = async () => {
        await deliverOrder(orderId);
        refetch();
    }

    return isLoading ? (<Loader/>) : error ? 
    (<Message variant='danger'>{error.data.message}</Message>) : (
        <>
        
        <Navbar/>
        <div className={`container flex flex-col mx-auto mt-[140px]`}>
            <div className='md:h-2/3 pr-4'>
                <div className="border border-gray-300 mt-5 pb-4 mb-5">
                    {order.orderItems.length === 0 ? (
                        <Message >Your Order Is Empty</Message>
                    ) : (
                        <div className="overflow-x-auto">
                            <table className="w-[80%] text-center mx-auto">
                                <thead className='border-b-2'>
                                    <tr>
                                        <th className='p-2'>Image</th>
                                        <th className='p-2'>Product</th>
                                        <th className='p-2 text-center'>Quantity</th>
                                        <th className='p-2'>Unit Price</th>
                                        <th className='p-2'>Total</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {order.orderItems.map((item, index) => (
                                        <tr key={index}>
                                            <td className='p-2'>
                                                <img src={item.image} alt={item.name}  className='w-16 h-16 object-cover'
                                                />
                                            </td>

                                            <td className='p-2'>
                                                <Link to={`/product/${item.product}`}>
                                                    {item.name}
                                                </Link>
                                            </td>
                                            <td className='p-2'>
                                                {item.quantity}
                                            </td>
                                            <td className='p-2'>
                                                ${item.price}
                                            </td>
                                            <td className='p-2'>
                                                ${(item.quantity * item.price).toFixed(2)}
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    )}
                </div>
            </div>
            <div className='flex container mx-auto gap-3'>
                <div className="mt-5 border border-gray-300 p-4">
                    <h2 className='text-xl font-bold mb-2'>Shipping</h2>
                    <p className='mb-4 mt-4'>
                        <strong className='text-slate-800'>ORDER - </strong>
                        {order._id}
                    </p>
                    <p className="mb-4">
                        <strong className='text-slate-800'>NAME - </strong>
                        {order.user.username}
                    </p>
                    <p className="mb-4">
                        <strong className='text-slate-800'>EMAIL - </strong>
                        {order.user.email}
                    </p>
                    <p className="mb-4">
                        <strong className='text-slate-800'>Address - </strong>
                        {order.shippingAddress.address}, {order.shippingAddress.city}{" - "}
                        {order.shippingAddress.postalCode}, {" "}{order.shippingAddress.country}
                    </p>
                    <p className="mb-4">
                        <strong className='text-slate-800'>Payment Method - </strong>
                        {order.paymentMethod}
                    </p>
                    {order.isPaid ? (
                        <Message variant='success'><span className='text-blue-700 font-bold text-lg'>Paid On: </span> 
                            <b>{order.paidAt}</b>
                        </Message>
                    ): (<Message variant='danger'><span className='text-blue-700 font-bold text-lg'>Paid On:</span> 
                        <b className='text-lg'> Not Paid</b>
                        </Message>
                    )}
                </div>
                <div className="mt-5 border border-gray-300 p-4 flex flex-col gap-2">

                    <h3 className='text-xl font-bold mb-2'>
                        Order Summary
                    </h3>
                    <div className='flex justify-between mb-2'>
                        <span className='font-bold'>Items</span>
                        <span>${order.itemsPrice}</span>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <span className='font-bold'>Shipping</span>
                        <span>${order.shippingPrice}</span>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <span className='font-bold'>Tax</span>
                        <span>${order.taxPrice}</span>
                    </div>
                    <div className='flex justify-between mb-2'>
                        <span className='font-bold'>Total</span>
                        <span>${order.totalPrice}</span>
                    </div>
                    {!order.isPaid && (
                        <div>
                            {loadingPay && <Loader/>}
                            {isPending ? (<Loader/>) : (
                                <div>
                                    <div>
                                        <PayPalButtons createOrder={createOrder}
                                            onApprove={onApprove} onError={onError}
                                        >

                                        </PayPalButtons>
                                    </div>
                                </div>
                            )}
                            <Link to='https://api.whatsapp.com/send?phone=50371236891&text=Hola,%20vi%20tu%20portafolio%20web%20y%20estoy%20interesado/a%20en%20charlar%20sobre%20tus%20habilidades'
                                className='w-full rounded bg-teal-700 text-white p-3 flex items-center font-bold hover:bg-slate-800 transition-all gap-1'
                            >
                                Comprar Por WhatsApp<span><AiOutlineWhatsApp size={20} className='text-green-500'
                                />
                                </span>Atencion Personalizada
                            </Link>
                        </div>
                        
                    )}
                    
                    
                </div>
                
                
            </div>
            {loadingDeliver && <Loader/>}
            {userInfo && userInfo.isAdmin && order.isPaid && !order.isDelivered && (
                <div className='mt-5'>
                    <button type='button' className='bg-teal-600 text-white w-[25%] rounded font-semibold p-3 hover:bg-slate-800 transition-all'
                        onClick={deliverHandler}
                    >Mark As Delivered</button>
                </div>
            )}
        </div>
        
        <FooterAbsolute/>
        </>
    )
}

export default Order