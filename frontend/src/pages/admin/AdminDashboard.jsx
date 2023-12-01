import React, {useState, useEffect} from 'react'
import Chart from 'react-apexcharts';
import {useGetUsersQuery} from '../../redux/api/usersApiSlice';
import {useGetTotalOrdersQuery, 
    useGetTotalSalesQuery,
    useGetTotalSalesByDateQuery
} from '../../redux/api/orderApiSlice';
import AdminMenu from './AdminMenu';
import OrderList from './OrderList';
import Loader from '../../components/Loader';
import { FaShoppingBag, FaUser } from 'react-icons/fa';
import { AiOutlineDeliveredProcedure } from 'react-icons/ai';
const AdminDashboard = () => {
    const {data: sales, isLoading} = useGetTotalSalesQuery();
    const {data: customers, isLoading: loadingUsers} = useGetUsersQuery();
    const {data: orders, isLoading: loadingOrders} = useGetTotalOrdersQuery();
    const {data: salesDetails} = useGetTotalSalesByDateQuery();
    const [state, setState] = useState({
        options: {
            chart: {
                type: "line",
            },
            tooltip: {
                theme: 'ligth',
            },
            colors: ['#000'],
            dataLabels: {
                enable: true,
            },
            stroke: {
                curve: 'smooth'
            },
            title: {
                text: 'Sales Trend',
                align: 'left'
            },
            grid: {
                borderColor: '#ccc'
            },
            markers: {
                size: 1,
            },
            xaxis: {
                categories: [],
                title: {
                    text: 'Date'
                }
            },
            yaxis: {
                title: {
                    text: 'Sales'
                },
                min: 0
            },
            legend: {
                position: 'top',
                horizontalAlign: 'right',
                floating: true,
                offsetY: -25,
                offsetX: -5
            }
        },
        series: [
            {name: 'Sales', data: []}
        ]
    });

    useEffect(() => {
        if(salesDetails){
            const formatSalesDate = salesDetails.map(item => ({
                x: item._id,
                y: item.countSales
            }))
            setState(prevState => ({
                ...prevState,
                options: {
                    ...prevState.options,
                    xaxis: {
                        categories: formatSalesDate.map(item => item.x)
                    }
                },
                series: [
                    {name: 'Sales', data: formatSalesDate.map(item => item.y)}
                ]
            }))
        }
    }, [salesDetails])
    return (
        <>
            <AdminMenu/>
            <section className='container mx-auto mt-[140px]'>
                <div className="w-[80%] flex justify-around flex-wrap">
                    <div className="rounded bg-slate-800 p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded w-[3rem] bg-teal-600 text-center p-3 text-white">
                            $
                        </div>
                        <p className="mt-5 text-white">Sales</p>
                        <h2 className='text-xl font-bold text-white'>
                            ${isLoading ? (<Loader/>) : sales?.countSales?.toFixed(2)}
                        </h2>
                    </div>
                    <div className="rounded bg-slate-800 p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded w-[3rem] bg-teal-600 p-3 text-white">
                            <FaUser className='mx-auto'/>
                        </div>
                        <p className="mt-5 text-white">Customers</p>
                        <h2 className='text-xl font-bold text-white'>
                            {isLoading ? (<Loader/>) : customers?.length}
                        </h2>
                    </div>
                    <div className="rounded bg-slate-800 p-5 w-[20rem] mt-5">
                        <div className="font-bold rounded w-[3rem] bg-teal-600 text-center p-3 text-white">
                            <FaShoppingBag className='mx-auto'/>
                        </div>
                        <p className="mt-5 text-white">Orders</p>
                        <h2 className='text-xl font-bold text-white'>
                            {isLoading ? (<Loader/>) : orders?.countOrders}
                        </h2>
                    </div>
                </div>
                <div className="mx-auto mt-10">
                    <Chart options={state.options} series={state.series} type='bar' width='100%' />
                </div>
                <div className="mt-10 pb-52">
                    <OrderList/>
                </div>
            </section>
        </>
    )
}

export default AdminDashboard