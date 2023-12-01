import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilteredProductsQuery } from '../redux/api/productApiSlice';
import {setCategories, setProducts, setChecked} from '../redux/features/shop/shopSlice';
import {useFetchCategoriesQuery} from '../redux/api/categoryApiSlice';
import Oops from '../components/Oops';
import ProductCard from './products/ProductCard';
import Footer from '../components/Footer';
import FooterAbsolute from '../components/FooterAbsolute';
import { Link } from 'react-router-dom';

const Shop = () => {
    const dispatch = useDispatch();
    const {categories, products, checked, radio} = useSelector(state => state.shop);
    const categoriesQuery = useFetchCategoriesQuery();
    const [priceFilter, setPriceFilter] = useState('');
    const filterProductsQuery = useGetFilteredProductsQuery({
        checked, radio
    });

    useEffect(() => {
        if(!categoriesQuery.isLoading){
            dispatch(setCategories(categoriesQuery.data))
        }
    }, [categoriesQuery.data, dispatch]);

    useEffect(() => {
        if(!checked.length || !radio.length){
            if(!filterProductsQuery.isLoading){
                const filterProducts = filterProductsQuery.data.filter(product => {
                    return(
                        product.price.toString().includes(priceFilter) || 
                        product.price === parseInt(priceFilter, 10)
                    );
                });
                dispatch(setProducts(filterProducts));
            }
        };
    }, [checked, radio, filterProductsQuery.data, dispatch, priceFilter]);

    const HandleBrandClick = brand => {
        const productByBrand = filterProductsQuery.data?.filter(
            product => product.brand === brand
        );
        dispatch(setProducts(productByBrand));
    }

    const HandleCheck = (value, id) => {
        const updateChecked = value ? [...checked, id] : checked.filter(check => check !== id);
        dispatch(setChecked(updateChecked));
    }
    const uniqueBrands = [
        ...Array.from(
            new Set(filterProductsQuery.data?.map(
                product => product.brand).filter(
                    brand => brand !== undefined
                )
            )
        )
    ];
    const handlePriceChange = e => {
        setPriceFilter(e.target.value);
    }

    return (
        <>
            <Navbar/>
            <div className='container mx-auto'>
                <div className="flex md:flex-row relative">
                    <div className='bg-slate-400 p-3 mb-2 mt-[130px] fixed top-0 left-0 h-full'>
                        <h2 className='text-center py-2 bg-black rounded-full mb-2 text-white'>
                            Filter By Categories
                        </h2>
                        <div className="p-5 w-[15rem]">
                            {categories?.map(cat => (
                                <div key={cat._id} className='mb-2'>
                                    <div className="flex items-center mr-4">
                                        <input type="checkbox" id='red-checkbox' 
                                            onChange={
                                                e=>HandleCheck(e.target.checked, cat._id)
                                            } 
                                            className='w-4 h-4 text-teal-600 bg-slate-100 border-gray-300 rounded focus:ring-teal-500 dark:focus-ring-teal-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600'
                                        />
                                        <label htmlFor="red-checkbox" 
                                            className='ml-2 text-sm font-medium text-white dark:text-gray-300'
                                        >{cat.name}</label>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <h2 className='text-center py-2 bg-black rounded-full mb-2 text-white'>
                            Filter By Brands
                        </h2>
                        <div className='p-5'>
                            {uniqueBrands?.map(brand => (
                                <>
                                    <div key={brand} className='flex items-center mr-4 mb-5'>
                                        <input type="radio" id={brand} name='brand' 
                                            onChange={() => HandleBrandClick(brand)}
                                            className='w-4 h-4 text-teal-400 bg-gray-100 border-slate-100 focus:ring-teal-500 dark:focus:ring-teal-600 dark:ring-offset-slate-800 focus:ring-2 dark:bg-slate-700 dark:border-slate-600'
                                        />
                                        <label htmlFor='pink-radio' className="ml-2 text-sm font-medium text-white dark:text-gray-300">{brand}
                                        </label>
                                    </div>
                                </>
                            ))}
                        </div>
                        <h2 className='text-center py-2 bg-black rounded-full mb-2 text-white'>
                            Filter By SubCategories
                        </h2>
                        <div className='p-5'>
                            <Link to='/subshop' className='border border-slate-300 bg-slate-700 p-2 w-full block rounded text-white text-center'>
                                SubCategories
                            </Link>
                        </div>
                        <h2 className="text-center py-2 bg-black rounded-full mb-2 text-white">
                            Filter By Price
                        </h2>
                        <div className="p-5 w-[15rem]">
                            <input type="text" placeholder='Enter Price' value={priceFilter} 
                                onChange={handlePriceChange}
                                className='w-full px-3 py-2 border rounded focus:outline-none focus:ring focus:border-teal-900'
                            />
                        </div>
                        <div className="p-5 pt-0">
                            <button className='w-full border my-4 bg-slate-200 text-gray-400 font-semibold hover:bg-slate-800 hover:text-white' onClick={() => window.location.reload()}>Reset</button>
                        </div>
                    </div>
                    <div className="p-3 pl-72 mt-[130px]">
                        <div className="flex flex-wrap">
                            {products.length === 0 ? (
                                <Oops/>
                            ) : products?.map(prod => 
                                <div key={prod._id} className='p-3'>
                                    <ProductCard prod={prod}/>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <FooterAbsolute/>
        </>
    )
}

export default Shop