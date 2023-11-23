import {apiSlice} from './apiSlice.js';
import { SUBCATEGORY_URL } from '../constants.js';
export const subCategoryApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createSubCategory: builder.mutation({
            query: (newSubCategory) => ({
                url: `${SUBCATEGORY_URL}`,
                method: 'POST',
                body: newSubCategory
            }),
            
        }),
        updateSubCategory: builder.mutation({
            query: ({categoryId, updatedSubcategory}) => ({
                url: `${SUBCATEGORY_URL}/${categoryId}`,
                method: 'PUT',
                body: updatedSubcategory
            }),
        }),
        deleteSubCategory: builder.mutation({
            query: (id) => ({
                url: `${SUBCATEGORY_URL}/delete/${id}`,
                method: 'DELETE'
            })
        }),
        fetchSubCategories: builder.query({
            query: () => `${SUBCATEGORY_URL}/subcategories`
        })
    })
});
export const { useCreateSubCategoryMutation, 
    useUpdateSubCategoryMutation, 
    useDeleteSubCategoryMutation, 
    useFetchSubCategoriesQuery 
} = subCategoryApiSlice;