import {createSlice} from '@reduxjs/toolkit';
const initialState = {
    subcategories: [],
    products: [],
    checked: [],
    radio: [],
    brandCheckboxes: {},
    checkedBrands: [],
}
const subShopSlice = createSlice({
    name: 'subshop',
    initialState,
    reducers: {
        setSubCategories: (state, action) => {
            state.subcategories = action.payload
        },
        setProducts: (state, action) => {
            state.products = action.payload
        },
        setChecked: (state, action) => {
            state.checked = action.payload
        },
        setRadio: (state, action) => {
            state.radio = action.payload
        },
        setSelectedBrands: (state, action) => {
            state.selectedBrand = action.payload
        },
    }
});
export const {setSubCategories, setProducts, setChecked, setRadio, setSelectedBrands} = subShopSlice.actions;

export default subShopSlice.reducer;