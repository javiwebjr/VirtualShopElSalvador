import React from 'react'

const Oops = () => {
    
    return (
        <div className='container mx-auto flex justify-center flex-col items-center'>
            <span className='text-3xl font-semibold mt-20'>Oops, I couldn't find your products...</span> 
            <img src="/raccoon.png" alt="oops_error_img" className='object-cover w-96 h-96 mt-20' />
        </div>
    )
}

export default Oops