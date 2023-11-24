import React from 'react'
import { Link } from 'react-router-dom'
import HeartIcon from './HeartIcon'

const Product = ({product}) => {

    return (
        <div className='w-[30rem] ml-[2rem] p-3 relative'>
            <div className="relative flex items-center justify-center">
                <img src={product.image} alt="Image_Product_Home_Specials_Products" 
                    className='w-[20rem] h-[15rem] object-contain rounded'
                />
            </div>
            <HeartIcon product={product}/>
            <div className="p-4">
                <Link to={`/product/${product._id}`}>
                    <h2 className='flex justify-center items-center text-xl font-bold'>
                        {product.name}
                        <span className='bg-teal-100 text-teal-800 text-sm font-medium mr-2 px-2.5 py-0.5 rounded-full dark:bg-teal-900 dark:text-teal-300 ml-3'>
                            ${product.price}
                        </span>
                    </h2>
                </Link>
            </div>
        </div>
    )
}

export default Product