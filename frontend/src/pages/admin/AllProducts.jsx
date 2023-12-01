import React from 'react';
import {Link} from 'react-router-dom';
import moment from 'moment';
import {useAllProductsQuery} from '../../redux/api/productApiSlice';
import AdminMenu from './AdminMenu';
import Loader from '../../components/Loader';
import Navigation from '../auth/Navigation';
import Navbar from '../../components/Navbar';

const AllProducts = () => {
    const {data: products, isLoading, isError} = useAllProductsQuery();
    if(isLoading)return <Loader/>
    if(isError)return <div>Error Loading Products</div>
    return (
        <>
        <Navbar/>
        <div className='bg-gradient-to-tr from-slate-900 via-purple-900 to-slate-900 mt-[130px]'>
            <div className="flex flex-col md:flex-row justify-center items-center">
                <div className="p-3">
                    <div className="ml-[15rem] text-2xl font-bold h-12 text-slate-300">
                        All Products
                        ({products.length})
                    </div>
                    <div className="flex flex-wrap justify-center items-center gap-2 ">
                        {products.map(product => (
                            <Link 
                                key={product?._id} 
                                to={`/admin/product/update/${product?._id}`}
                                className='block mb-4 overflow-hidden p-3 border-b border-gray-500'
                            >
                                <div className="flex ">
                                    <img src={product?.image} alt={product.name}
                                        className='w-[8rem] h-[8rem] object-cover'
                                    />
                                    <div 
                                        className="p-4 flex flex-col justify-around "
                                    >
                                        <div className="flex justify-between">
                                            <h5 className="text-xl font-semibold mb-2 text-slate-100">
                                                {product?.name}
                                            </h5>
                                            <p className="text-gray-400 text-sm">
                                                {moment(product?.createdAt).format("MMMM Do YYYY")}
                                            </p>
                                        </div>
                                        <p 
                                            className="text-gray-400 xl:w-[30rem] md:w-[20rem] sm:w-[10rem] text-sm mb-4"
                                        >
                                            {product?.description?.substring(0, 160)}...
                                        </p>
                                        <div className="flex justify-between">
                                            <button onClick={() => window.location.href=`/admin/product/update/${product._id}`}
                                                className='inline-flex items-center px-3 py-2 text-sm font-medium text-center text-black bg-teal-500 rounded hover:bg-teal-700 hover:text-white'
                                            >
                                                Update Product
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>
                <div className="md:w-1/4 p-3 mt-2">
                    <AdminMenu/>
                </div>
            </div>
        </div>
        </>
    )
}

export default AllProducts