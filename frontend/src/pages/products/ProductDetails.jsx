import React, {useState} from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {toast} from 'react-toastify';
import {useGetProductDetailsQuery, useCreateReviewMutation} from '../../redux/api/productApiSlice';
import Loader from '../../components/Loader';
import Message from '../../components/Message';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaComment, FaApple } from 'react-icons/fa';
import moment from 'moment';
import HeartIcon from './HeartIcon';
import Rating from './Rating';
import ProductTabs from './ProductTabs';
import Navigation from '../auth/Navigation';
import Navbar from '../../components/Navbar';
import { addToCart } from '../../redux/features/cart/cartSlice';
const ProductDetails = () => {
    const {id: productId} = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(1);
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState('');

    const {data: product, isLoading, refetch, error} = useGetProductDetailsQuery(productId);
    const {userInfo} = useSelector(state => state.auth);

    const [createReview, {isLoading: loadingProductReview}] = useCreateReviewMutation();

    const addToCartHandler = () => {
        dispatch(addToCart({...product, quantity}));
        navigate('/cart')
    }
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            await createReview({
                productId, rating, comment
            }).unwrap();
            refetch();
            toast.success('Review Created, Thanks');
        } catch (error) {
            console.log(error);
            toast.error(error?.data || error.message);
        }
    }
    return (
        <>
            <Navigation/>
            <Navbar/>
            <div className='w-full h-full'>
                <Link to='/' className='bg-slate-200 block text-black font-semibold hover:underline pl-40'>
                    Go Back
                </Link>
            </div>
            {isLoading ? (<Loader/>) : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>) 
                : <>
                    <div className="flex flex-wrap relative justify-center items-center bg-slate-200 pt-[80px]">
                    
                        <div>
                            <img src={product.image} 
                                alt={`product_image_details_page_${product.name}`} 
                                className='w-full xl:w-[50rem] lg:w-[45rem] md:w-[30rem] sm:w-[20rem] mr-[2rem] object-contain h-[30rem]'
                                
                            />
                            {/* <HeartIcon product={product} /> */}
                        </div>
                        <div className="flex flex-col gap-3">
                            
                            <h2 className='text-2xl font-semibold'>
                                {product.name} 
                            </h2>
                            <p className='my-4 xl:w-[35rem] lg:w-[35rem] md:w-[30rem] text-slate-700'>{product.description}</p>
                            <p className='text-5xl my-4 font-extrabold'>${product.price}</p>
                            <div className="flex items-center justify-between w-[20rem]">
                                <div className="">
                                    <h3 className='flex items-center mb-6'>
                                        <FaApple className='mr-2 text-black' />
                                        {product.brand}
                                    </h3>
                                    <h3 className='flex items-center mb-6'>
                                        <FaClock className='mr-2 text-black' />
                                        {moment(product.createdAt).fromNow()}
                                    </h3>
                                    <h3 className='flex items-center mb-6'>
                                        <FaComment className='mr-2 text-black' />
                                        {product.numReviews} Reviews
                                    </h3>
                                </div>
                                <div>
                                    <h3 className='flex items-center mb-6'>
                                        <FaStar className='mr-2 text-orange-400' />
                                        {rating || product.rating} Rating
                                    </h3>
                                    <h3 className='flex items-center mb-6'>
                                        <FaShoppingCart className='mr-2 text-black' />
                                        {product.quantity} Products
                                    </h3>
                                    <h3 className='flex items-center mb-6'>
                                        <FaBox className='mr-2 text-black' />
                                        {product.countInStock} Products In Stock
                                    </h3>
                                </div>
                            </div>
                            <div className="flex justify-between flex-wrap">
                                <Rating value={product.rating} text={`${product.numReviews} reviews`}/>
                                {product.countInStock > 0 && (
                                    <div>
                                        <select 
                                            value={quantity} 
                                            onChange={e => setQuantity(e.target.value)}
                                            className='p-2 w-[6rem] rounded text-black border'
                                        >
                                            {[...Array(product.countInStock).keys()].map(x =>
                                                <option key={x + 1} value={x + 1}>
                                                    {x + 1}
                                                </option>    
                                            )}
                                        </select>
                                    </div>
                                )}
                            </div>
                            <div className=''>
                                <button onClick={addToCartHandler} 
                                    disabled={product.countInStock === 0}
                                    className='w-full bg-teal-600 text-white py-2 rounded'
                                >Add To Cart</button>
                            </div>
                        </div>
                        <div className="mt-[5rem] container flex flex-wrap items-start justify-between ml-40 mb-10">
                            <ProductTabs 
                                loadingProductReview={loadingProductReview}
                                userInfo={userInfo}
                                submitHandler={submitHandler}
                                rating={rating}
                                setRating={setRating}
                                comment={comment}
                                setComment={setComment}
                                product={product}
                            />
                        </div>
                    </div>
                </>
            }
        </>
    )
}

export default ProductDetails