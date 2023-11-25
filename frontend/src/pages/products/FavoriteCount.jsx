import React from 'react'
import { useSelector } from 'react-redux';

const FavoriteCount = () => {
    const favorites = useSelector(state => state.favorites);
    const favoriteCount = favorites.length;
    return (
        <div className='absolute left-4 top-8'>
            {favoriteCount > 0 && (
                <span className='px-1 py-0 text-sm text-white bg-red-600 rounded'>
                    {favoriteCount}
                </span>
            )}
        </div>
    )
}

export default FavoriteCount