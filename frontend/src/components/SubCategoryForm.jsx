import React, { useEffect, useState } from 'react'
import { useFetchCategoriesQuery } from '../redux/api/categoryApiSlice'; 
import Loader from './Loader';

const SubCategoryForm = ({value, setValue, handlerSubmit, buttonText = 'Submit', handlerDelete, handlerCreate, handleCategoryChange}) => {

    const {data: categories} = useFetchCategoriesQuery();
    const onSubmit = (e) => {
        e.preventDefault();
        if (handlerSubmit) {
            handlerSubmit(e);
        } else if(handlerCreate) {
            handlerCreate(e);
        }else{
            handlerDelete(e);
        }
    };
    return (
        <div className='p-3'>
            <form onSubmit={onSubmit} className='space-y-3'>
                <input type="text" className='py-3 px-4 border rounded w-full' placeholder='Write A SubCategory Name' 
                    value={value} 
                    onChange={e=> setValue(e.target.value)} 
                />
                <label>Category</label>
                <select name="category" id="category" onChange={handleCategoryChange}
                    className='border p-2 ml-2'
                >
                {categories?.map((category) => (
                    <option key={category._id} value={category._id}
                        className='border'
                    >{category.name}</option>
                ))}
                </select>
                <div className="flex justify-between">
                    <button className='bg-teal-500 text-white py-2 px-4 rounded hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'>{buttonText}
                    </button>
                    {handlerDelete && (
                        <button onClick={handlerDelete} className='bg-red-600 text-white py-2 px-4 rounded hover:bg-red-800 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-opacity-50'>
                            Delete
                        </button>
                    )}
                </div>
            </form>
        </div>
    )
}

export default SubCategoryForm