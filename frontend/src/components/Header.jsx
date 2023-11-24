import React from 'react';
import { useGetTopProductsQuery } from '../redux/api/productApiSlice';
import Loader from './Loader';
import SmallProduct from '../pages/products/SmallProduct';
import ProductCarousel from '../pages/products/ProductCarousel';

const Header = () => {
    const {data, isLoading, isError} = useGetTopProductsQuery();
    if(isLoading) return <Loader/>
    if(isError) return <span className='text-center text-3xl text-red-600'>ERROR LOADING PRODUCTS</span>
    return (
        <>
            <div className="flex justify-around items-center bg-slate-200">
                <div className="xl:block lg:hidden md:hidden sm:hidden">
                    <div className="grid grid-cols-2">
                        {data.map(product => (
                            <div key={product._id}>
                                <SmallProduct product={product}/>
                            </div>
                        ))}
                    </div>
                </div>
                <ProductCarousel/>
            </div>
        </>
    )
}

export default Header