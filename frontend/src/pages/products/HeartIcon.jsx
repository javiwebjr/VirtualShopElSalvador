import React, {useEffect} from 'react'
import {FaHeart, FaRegHeart} from 'react-icons/fa';
import {useSelector, useDispatch} from 'react-redux';
import { addToFavorites, removeFromFavorites, setFavorites } from '../../redux/features/favorites/favoriteSlice';
import { addFavorites, removeFavorites, getFavorites } from '../../utilities/favoriteStorage';

const HeartIcon = ({product}) => {
    const dispatch = useDispatch();
    const favorites = useSelector(state => state.favorites) || [];
    const isFavorites = favorites.some(prod => prod._id === product._id);
    useEffect(() => {
        const favoriteFromLocalStorage = getFavorites();
        dispatch(setFavorites(favoriteFromLocalStorage));
    }, [])

    const toggleFavorite = () => {
        if(isFavorites){
            dispatch(removeFromFavorites(product));
            removeFavorites(product._id);
        }else{
            dispatch(addToFavorites(product));
            addFavorites(product);
        }
    }

    return (
        <div onClick={toggleFavorite} className='absolute top-2 right-5 cursor-pointer z-20'>
            {isFavorites ? (<FaHeart className='text-red-600' />) : (
                <FaRegHeart className='text-black' />
            )}
        </div>
    )
}

export default HeartIcon