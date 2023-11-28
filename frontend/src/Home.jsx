import React from 'react'
import { Link, useParams } from 'react-router-dom';
import { useGetProductsQuery } from './redux/api/productApiSlice';
import Loader from './components/Loader';
import Header from './components/Header';
import Message from './components/Message';
import Product from './pages/products/Product';
import Navigation from './pages/auth/Navigation';

const Home = () => {
    const {keyword} = useParams();
    const {data, isLoading, isError} = useGetProductsQuery({keyword});

    return (
        <>
            {/* <Navigation/> */}
            {!keyword ? <Header/> : null}
            {isLoading ? (<Loader/>) : isError ? (<Message variant='danger'>
                {isError?.data.message || isError.error}
            </Message>) : (
                <>
                    <div className='flex justify-between items-center mt-[5rem]'>
                        <h1 className='ml-[20rem] text-4xl font-bold uppercase'>
                            Welcome to <b className='italic text-blue-800'>Hey Boss</b> - Your Destiny for the Latest Technology Updates
                        </h1>
                        <Link to='/shop' className='bg-teal-600 font-bold rounded-full p-2 px-10 mr-[25rem] text-slate-100 hover:scale-105 hover:bg-teal-700 hover:text-slate-50 hover:border-2 transition-transform'>
                            Shop
                        </Link>
                    </div>
                    <div className='w-[60%] border-b-2 border-teal-400 mx-auto mt-5'></div>
                    <div>
                        <div className="flex justify-center items-center flex-wrap mt-[2rem] ">
                            {
                                data.product?.map(product => (
                                    <div key={product._id} className='hover:scale-105 transition-transform'>
                                        <Product product={product} />
                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    
                </>
            )}
        </>
    )
}

export default Home