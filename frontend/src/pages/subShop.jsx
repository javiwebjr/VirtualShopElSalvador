import React, {useEffect, useState} from 'react';
import Navbar from '../components/Navbar';
import { useDispatch, useSelector } from 'react-redux';
import { useGetFilteredSubProductsQuery } from '../redux/api/productApiSlice';
import {setSubCategories, setProducts, setChecked} from '../redux/features/shop/subShopSlice';
import {useFetchSubCategoriesQuery} from '../redux/api/subCategoryApiSlice';
import Loader from '../components/Loader';
import ProductCard from './products/ProductCard';
import Oops from '../components/Oops';

const SubShop = () => {
    const dispatch = useDispatch();
    const {subcategories, products, checked, radio} = useSelector(state => state.subshop);
    const subCategoriesQuery = useFetchSubCategoriesQuery();
    const filterSubProductsQuery = useGetFilteredSubProductsQuery({
        checked, radio
    });
    useEffect(() => {
        if(!subCategoriesQuery.isLoading){
            dispatch(setSubCategories(subCategoriesQuery.data))
        }
    }, [subCategoriesQuery.data, dispatch]);

    useEffect(() => {
        if(!checked.length || !radio.length){
            if(!filterSubProductsQuery.isLoading){
                const filterProducts = filterSubProductsQuery.data.filter(product => 
                    product.subcategory
                );
                dispatch(setProducts(filterProducts));
            }
        };
    }, [checked, radio, filterSubProductsQuery.data, dispatch]);


    const HandleCheck = (value, id) => {
        const updateChecked = value ? [...checked, id] : checked.filter(check => check !== id);
        dispatch(setChecked(updateChecked));
    }

    return (
        <>
            <Navbar/>
            <div className='container mx-auto'>
                <div className="flex md:flex-row relative">
                    <div className='bg-slate-400 p-3 mb-2 mt-[130px] fixed top-0 left-0 h-full'>
                        <h2 className='text-center py-2 bg-black rounded-full mb-2 text-white'>
                            Filter By SubCategories
                        </h2>
                        <div className="p-5 w-[15rem]">
                            {subcategories?.map(cat => (
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
                        <div className="p-5 pt-0">
                            <button className='w-full border my-4 bg-slate-200 text-gray-400 font-semibold hover:bg-slate-800 hover:text-white' 
                            onClick={() => window.location.reload()}>
                                Reset
                            </button>
                        </div>
                    </div>
                    <div className="p-3 pl-72 mt-[130px]">
                        <div className="flex flex-wrap container">
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
        </>
    )
}

export default SubShop