import React from 'react'

const CategoryForm = ({value, setValue, handlerSubmit, buttonText = 'Submit', handlerDelete, handlerCreate}) => {

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
                <input type="text" className='py-3 px-4 border rounded w-full' placeholder='Write A Category Name' value={value} onChange={e=> setValue(e.target.value)} />
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

export default CategoryForm