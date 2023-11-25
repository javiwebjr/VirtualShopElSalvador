import React from 'react'
import {useSelector} from 'react-redux';
import {selectFavoriteProduct} from '../../redux/features/favorites/favoriteSlice';
import Product from './Product';

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);
    return (
        <>
            <div className='container ml-[10rem] flex'>
                <h2 className="text-3xl font-bold mt-10">
                    Favorite Products
                </h2>
            </div>
            <div className="flex flex-wrap">
                {favorites.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
        </>
    )
}

export default Favorites