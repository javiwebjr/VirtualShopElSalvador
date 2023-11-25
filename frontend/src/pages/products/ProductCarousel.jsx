import React from 'react'
import { useGetTopProductsQuery } from '../../redux/api/productApiSlice';
import Message from '../../components/Message';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import moment from 'moment';
import { FaBox, FaClock, FaShoppingCart, FaStar, FaStore, FaComment } from 'react-icons/fa';

const ProductCarousel = () => {
    const {data: products, isLoading, error} = useGetTopProductsQuery();
    const settings = {
        dots: false,
        infinite: true,
        speed: 1000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        autoplay: true,
        autoplaySpeed: 3000,
    }
    return (
        <div className='mb-4 xl:block lg:block md:block'>
            {isLoading ? null : error ? (
                <Message variant='danger'>
                    {error?.data?.message || error.message}
                </Message>
            ) : <Slider {...settings} 
                    className='xl:w-[50rem] lg:w-[50rem] md:w-[56rem] sm:w-[40rem] sm:block'
                >
                    {
                        products.map(({image, _id, name, price, description, brand, createdAt, numReviews, rating, quantity, countInStock}) => (
                            <div key={_id}>
                                <img src={image} alt={`product_slider_home_${name}`} 
                                    className='w-full rounded object-contain h-[30rem]'
                                />
                                <div className="flex justify-between w-[20rem] mt-5">
                                    <div className="one">
                                        <h2 className='font-semibold text-xl'>{name}</h2>
                                        <p>$ {price}</p> <br />
                                        <p className='w-[25rem] text-sm font-light'>{description.substring(0,150)}...</p>
                                    </div>
                                    <div className="flex justify-between w-[20rem] ml-6">
                                        <div className="one">
                                            <h3 className="flex items-center mb-6 w-[15rem] text-sm font-light">
                                                <FaStore className='mr-2 text-blue-800'/>
                                                Brand: {brand}
                                            </h3>
                                            <h3 className="flex items-center mb-6 w-[15rem] text-sm font-light">
                                                <FaClock className='mr-2 text-gray-400'/>
                                                Added: {moment(createdAt).fromNow()}
                                            </h3>
                                            <h3 className="flex items-center mb-6 w-[15rem] text-sm font-light">
                                                <FaComment className='mr-2 text-black'/>
                                                Reviews: {numReviews}
                                            </h3>
                                        </div>
                                        <div className="two">
                                            <h4 className="flex items-center mb-6 w-[5rem] text-sm font-light">
                                                <FaStar className='mr-2 text-orange-400 ' />
                                                Rating {Math.round(rating)}
                                            </h4>
                                            <h4 className="flex items-center mb-6 w-[10rem] text-sm font-light">
                                                <FaShoppingCart className='mr-2 text-black ' />
                                                Quantity {quantity}
                                            </h4>
                                            <h4 className="flex items-center mb-6 w-[5rem] text-sm font-light">
                                                <FaBox className='mr-2 text-black ' />
                                                In Stock {countInStock}
                                            </h4>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))
                    }
                </Slider>
            }
        </div>
    )
}

export default ProductCarousel