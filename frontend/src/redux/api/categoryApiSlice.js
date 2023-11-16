import {apiSlice} from './apiSlice.js';
import { CATEGORY_URL } from '../constants.js';
export const categoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createCategory: builder.mutation({
            query: (newCategory) => ({
                url: `${CATEGORY_URL}`,
                method: 'POST',
                body: newCategory
            })
        }),
        updateCategory: builder.mutation({
            query: ({categoryId, updatedCategory}) => ({
                url: `${CATEGORY_URL}/${categoryId}`,
                method: 'PUT',
                body: updatedCategory
            })
        }),
        deleteCategory: builder.mutation({
            query: (id) => ({
                url: `${CATEGORY_URL}/delete/${id}`,
                method: 'DELETE'
            })
        }),
        fetchCategories: builder.query({
            query: () => `${CATEGORY_URL}/categories`
        })
    })
});
export const { useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation, 
    useFetchCategoriesQuery 
} = categoryApiSlice;