import React from 'react'
import {useSelector} from 'react-redux';
import {selectFavoriteProduct} from '../../redux/features/favorites/favoriteSlice';
import Product from './Product';
import Navigation from '../auth/Navigation';
import Navbar from '../../components/Navbar';

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);
    const {userInfo} = useSelector(state => state.auth);
    return (
        <>
            <Navigation/>
            <Navbar/>
            <div className='container ml-[10rem] flex'>
                <div className='flex flex-col items-center justify-center m-auto'>
                    <h2 className="text-3xl font-bold mt-10 text-center">
                        {userInfo ? 'Favorite Products' : 'Sign In And Add Your Favorites Products'}
                    </h2>
                    {!userInfo && (
                        <img src="/thumbs.png" alt="" className='w-[300px] h-[300px] mt-10'/>
                    )}
                </div>
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