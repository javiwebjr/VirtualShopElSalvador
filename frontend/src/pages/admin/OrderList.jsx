import React from 'react';
import Navbar from '../../components/Navbar';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useGetOrdersQuery } from '../../redux/api/orderApiSlice';
import AdminMenu from './AdminMenu';
import FooterAbsolute from '../../components/FooterAbsolute';

const OrderList = () => {
    const {data: orders, isLoading, error} = useGetOrdersQuery();
    return (
        <>
            {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>
                {error?.data?.error || error.error}
            </Message>) : (
                <>
                    <Navbar/>
                    <div className='mt-[140px] container mx-auto border border-black'>
                        <table className='w-full border'>
                            <thead>
                                <tr className='mb-[5rem] border-b border-black'>
                                    <th className='p-1 border border-black'>ITEMS</th>
                                    <th className='p-1 border border-black'>ID</th>
                                    <th className='p-1 border border-black'>USER</th>
                                    <th className='p-1 border border-black'>DATA</th>
                                    <th className='p-1 border border-black'>TOTAL</th>
                                    <th className='p-1 border border-black'>PAID</th>
                                    <th className='p-1 border border-black'>DELIVERED</th>
                                    <th className='p-1 border border-black'>CHECK ORDER</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map(order => (
                                    <tr key={order._id}>
                                        <td>
                                            <img src={order.orderItems[0].image} 
                                            alt={
                                                `Image_table_admin_orders_users_${order.orderItems[0].image}`
                                            } 
                                            className='w-16 h-16 block mx-auto'
                                            />
                                        </td>
                                        <td className='text-center'>{order._id}</td>
                                        <td className='text-center'>
                                            {order.user ? order.user.username : 'N/A'}
                                        </td>
                                        <td className='text-center'>
                                            {order.createdAt.substring(0, 10)}
                                        </td>
                                        <td className='text-center'>
                                            ${order.totalPrice}
                                        </td>
                                        <td className='p-2'>
                                        {order.isPaid ? (
                                            <p className="p-1 text-center text-white bg-green-500 w-[6rem] border-black border rounded mx-auto">Completed</p>
                                            ) : <p 
                                            className="p-1 text-center text-white bg-red-500 w-[6rem] border-black border rounded mx-auto"
                                            >
                                            Incompleted
                                            </p>
                                        }
                                        </td>
                                        <td className='p-2'>
                                            {order.isDelivered ? (
                                                <p className="p-1 text-center text-white bg-blue-500 w-[6rem] border-black border rounded mx-auto">
                                                    Delivered
                                                </p>
                                            ) : (
                                                <p className="p-1 text-center text-white bg-orange-500 w-[6rem] border-black border rounded mx-auto">
                                                    Pending
                                                </p>
                                            )}
                                        </td>
                                        <td className='text-center'>
                                            <Link to={`/order/${order._id}`}
                                                className='bg-teal-600 text-white rounded border-black border p-2'
                                            >
                                                View Details
                                            </Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </>
    )
}

export default OrderList