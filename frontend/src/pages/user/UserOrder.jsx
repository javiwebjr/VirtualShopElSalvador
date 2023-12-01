import React from 'react';
import Navbar from '../../components/Navbar';
import Message from '../../components/Message';
import Loader from '../../components/Loader';
import { Link } from 'react-router-dom';
import { useGetMyOrdersQuery } from '../../redux/api/orderApiSlice';
import FooterAbsolute from '../../components/FooterAbsolute';

const UserOrder = () => {
    const {data: orders, isLoading, error} = useGetMyOrdersQuery();
    return (
        <>
            <Navbar/>
            <div className={`mt-[140px] container mx-auto ${orders?.length === 0 ? 'pb-[500px]' : 'pb-[400px]'}`}>
                <h2 className='text-2xl font-semibold mb-4'>My Orders</h2>
                {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>
                    {error?.data?.error || error.error}
                </Message>) : (
                    <table className='w-full'>
                        <thead>
                            <tr>
                                <td className='p-2'>Image</td>
                                <td className='p-2'>ID</td>
                                <td className='p-2'>DATE</td>
                                <td className='p-2'>TOTAL</td>
                                <td className='p-2'>PAID</td>
                                <td className='p-2'>DELIVERED</td>
                                <td className='p-2'></td>
                            </tr>
                        </thead>
                        <tbody>
                            {orders.map(order => (
                                <tr key={order._id}>
                                    <td className='p-2'>
                                        <img src={order.orderItems[0].image} 
                                            alt={`User_Orders_Images ${order.image}`} 
                                            className='w-[6rem] mb-5'
                                        />
                                    </td>
                                    <td className='p-2'>{order._id}</td>
                                    <td className='p-2'>
                                        {order.createdAt.substring(0, 10)}
                                    </td>
                                    <td className='p-2'>${order.totalPrice}</td>
                                    <td className='p-2'>
                                        {order.isPaid ? (
                                        <p className="p-1 text-center text-white bg-green-500 w-[6rem] rounded">Completed</p>
                                    ) : <p className="p-1 text-center text-white bg-red-500 w-[6rem] rounded"
                                        >
                                        Incompleted
                                        </p>
                                    }</td>
                                    <td className='p-2'>
                                        {order.isDelivered ? (
                                            <p className="p-1 text-center text-white bg-blue-500 w-[6rem] rounded">
                                                Delivered
                                            </p>
                                        ) : (
                                            <p className="p-1 text-center text-white bg-orange-500 w-[6rem] rounded">
                                                Pending
                                            </p>
                                        )}
                                    </td>
                                    <td className='p-2'>
                                        <Link to={`/order/${order._id}`}
                                            className='bg-teal-600 text-white p-2 rounded'
                                        >
                                            View Details
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
            <FooterAbsolute/>
        </>
    )
}

export default UserOrder