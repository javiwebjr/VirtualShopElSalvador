import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import {useGetTopProductsQuery} from '../../redux/api/productApiSlice';
import SmallProduct from './SmallProduct';
import Loader from '../../components/Loader';

const ProductTabs = ({
    loadingProductReview, 
    userInfo, 
    submitHandler, 
    rating, 
    setRating, 
    comment, 
    setComment, 
    product
}) => {
    const {data, isLoading} = useGetTopProductsQuery();
    const [activeTab, setActiveTab] = useState(1);
    if(isLoading)return <Loader/>

    const handleTabClick = (tab) => {
        setActiveTab(tab);
    }
    return (
        <div className='flex flex-col md:flex-row'>
            <section className='mr-[5rem]'>
                <div 
                    className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 1 ? "font-bold" : ""}`} 
                    onClick={() => handleTabClick(1)}
                >
                    Leave Your Review Of This Product
                </div>
                <div 
                    className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 2 ? "font-bold" : ""}`} 
                    onClick={() => handleTabClick(2)}
                >
                    All Reviews
                </div>
                <div 
                    className={`flex-1 p-4 cursor-pointer text-lg ${activeTab === 3 ? "font-bold" : ""}`} 
                    onClick={() => handleTabClick(3)}
                >
                    Related Products
                </div>

            </section>
            {/*2nd*/}
            <section>
                {activeTab === 1 && (
                    <div className="mt-4">
                        {userInfo ? (
                            <form onSubmit={submitHandler}>
                                <div className="my-2">
                                    <label htmlFor="rating" className='block text-xl mb-2'>Rating
                                    </label>
                                    <select id='rating' required value={rating} 
                                        onChange={e => setRating(e.target.value)}
                                        className='p-2 border rounded xl:w-[40rem] text-black'
                                    >
                                        <option value="">Select</option>
                                        <option value="1">Very Poor</option>
                                        <option value="2">Poor</option>
                                        <option value="3">Fair</option>
                                        <option value="4">Good</option>
                                        <option value="5">Very Good</option>
                                    </select>
                                </div>
                                <div className="my-2">
                                    <label htmlFor="comment" className='block text-xl mb-2'>
                                        Comment
                                    </label>
                                    <textarea id='comment' rows="3" required value={comment}
                                        onChange={e => setComment(e.target.value)}
                                        className='p-2 border xl:w-[40rem] text-black resize-none'
                                    ></textarea>
                                </div>
                                <button type='submit' disabled={loadingProductReview}
                                    className='bg-teal-500 text-white py-2 px-4 rounded'
                                >
                                    Submit
                                </button>
                            </form>
                        ) : (
                            <p className='font-light'>Please <Link className='text-blue-600 hover:underline font-semibold' to='/login'>Sign In</Link> to write a review</p>
                        )}
                    </div>
                )}
            </section>
            <section>
                {activeTab === 2 && (
                    <>
                    <div>
                        {product.reviews.length === 0 && <p>No Reviews Yet</p>}
                    </div>
                    <div>
                        {product.reviews.map(review => (
                            <div key={review._id} className='bg-slate-200 p-4 rounded xl:ml-[2rem] sm:ml-[0rem] xl:w-[40rem] sm:w-[24rem] mb-5'>
                                <div className='flex justify-between'>
                                    <strong className='text-black'>{review.name}</strong>
                                    <p className='text-black'>{review.createdAt.substring(0,10)}</p>
                                </div>
                                <p className="my-4">{review.comment}</p>
                                <Rating value={review.rating} />
                            </div>
                        ))}
                    </div>
                    </>
                )}
            </section>
            <section>
                {activeTab === 3 && (
                    <section className='ml-[4rem] flex flex-wrap'>
                        {!data ? (<Loader/>) :
                            (
                                data.map(product => (
                                    <div key={product._id}>
                                        <SmallProduct product={product} />
                                    </div>
                                ))
                            )
                        }
                    </section>
                )}
            </section>
        </div>
    )
}

export default ProductTabs