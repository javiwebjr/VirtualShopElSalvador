import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineShoppingCart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { addToCart } from '../../redux/features/cart/cartSlice';
import {toast} from 'react-toastify';
import HeartIcon from './HeartIcon';

const ProductCard = ({prod}) => {
    const dispatch = useDispatch();

    const addToCartHandler = (product, quantity) => {
        dispatch(addToCart({...product, quantity}));
        toast.success('Item Added To Your Shopping Cart', {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: 2000
        })
    }
    return (
        <div className='max-w-sm relative bg-transparent rounded shadow-md dark:bg-gray-800 dark:border-slate-900 hover:scale-105 hover:shadow-xl transition-all'>
            <section className='relative'>
                <HeartIcon product={prod}/>
                <Link to={`/product/${prod._id}`}>
                    <span className="absolute bottom-3 right-3 bg-teal-100 text-teal-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full">
                        {prod?.brand}
                    </span>
                    <img src={prod.image} alt={`Product_shop_image_${prod.image}`} 
                        className='h-72 w-72 object-right object-contain'
                    />
                    
                </Link>
            </section>
            <div className="p-5">
                <div className="flex justify-between">
                    <h3 className='mb-2 text-xl text-black dark:text-white'>
                        {prod?.name}
                    </h3>
                    <p className="text-black font-semibold">
                        {prod?.price?.toLocaleString('es-ES', {
                            style: 'currency',
                            currency: 'USD'
                        })}
                    </p>
                </div>
                <p className="mb-3 font-normal text-slate-800 text-sm">
                    {prod?.description?.substring(0,  100)}...
                </p>
                <section className='flex justify-between items-center'>
                    <Link to={`/product/${prod._id}`}
                        className='inline-flex items-center px-3 py-2 font-medium text-center text-white bg-slate-900 rounded hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-teal-400 dark:bg-slate-800 dark:hover:bg-slate-600'
                    >
                        Read More
                    </Link>
                    <button className='p-2 rounded-full' 
                        onClick={() => addToCartHandler(prod, 1)}
                    >
                        <AiOutlineShoppingCart size={26} className='hover:scale-125 transition-all'/>
                    </button>
                </section>
            </div>
        </div>
    )
}

export default ProductCard