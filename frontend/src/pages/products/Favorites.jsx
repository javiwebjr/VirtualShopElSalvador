import React from 'react'
import {useSelector} from 'react-redux';
import {selectFavoriteProduct} from '../../redux/features/favorites/favoriteSlice';
import Product from './Product';
import Navigation from '../auth/Navigation';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import FooterAbsolute from '../../components/FooterAbsolute';

const Favorites = () => {
    const favorites = useSelector(selectFavoriteProduct);
    const {userInfo} = useSelector(state => state.auth);
    return (
        <>
            {/* <Navigation/> */}
            <Navbar/>
            <div className='container ml-[10rem] flex mt-[130px]'>
                <div className='flex flex-col items-center justify-center m-auto'>
                    <h2 className="text-3xl font-bold mt-10 text-center">
                        {userInfo && favorites.length > 0 ? 'Favorite Products' : 'Start by adding your favorite products'}
                    </h2>
                    {!userInfo && (
                        <>
                        <h2 className='text-3xl mt-5'>Please Sign In To Complete Your Shop</h2>
                        <img src="/thumbs.png" alt="" className='w-[300px] h-[300px] mt-10'/>
                        </>
                    )}
                </div>
            </div>
            <div className={`flex flex-wrap pb-52 ${favorites.length === 0 ? 'pb-[500px]' : ''}`}>
                
                {favorites.map(product => (
                    <Product key={product._id} product={product} />
                ))}
            </div>
            <FooterAbsolute/>
        </>
    )
}

export default Favorites