import React from 'react';
import { Link } from 'react-router-dom';

const SmallProduct = ({product}) => {

    return (
        <div className='w-[20rem] ml-[2rem] p-3'>
            <div className="relative hover:scale-105 transition-transform hover:border hover:shadow-2xl">
                <img src={product.image} 
                    alt={`Product_Image_Home_Header_${product.name}`} 
                    className='h-[10rem] mx-auto rounded'
                />
                {/* <HeartIcon product={product}/> */}
                <div className="p-4 border-t border-slate-700">
                    <Link to={`/product/${product._id}`}>
                        <h2 className="flex flex-col gap-4 justify-center items-start text-lg font-light">
                            {product.name}
                            <span className=' self-start text-teal-700 text-sm font-medium mr-2 px-2 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300'>
                               $ {product.price}
                            </span>
                        </h2>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default SmallProduct