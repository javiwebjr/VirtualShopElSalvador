export const addFavorites = product => {
    const favorites = getFavorites();
    if(!favorites.some(prod => prod._id === product._id)){
        favorites.push(product);
        localStorage.setItem('favorites', JSON.stringify(favorites));
    }
}

export const removeFavorites = productId => {
    const favorites = getFavorites();
    const updateFavorites = favorites.filter(product => product._id !== productId);
    localStorage.setItem('favorites', JSON.stringify(updateFavorites));
}

export const getFavorites = () => {
    const favorites = localStorage.getItem('favorites');
    return favorites ? JSON.parse(favorites) : [];
}