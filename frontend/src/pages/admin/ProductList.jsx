import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import { 
    useCreateProductMutation, 
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import {useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice';
import {toast} from 'react-toastify';

const ProductList = () => {
    const {data: categories} = useFetchCategoriesQuery();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState(categories?.length > 0 ? categories[0]._id : "");
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success(res.message);
            setImage(res.image);
            setImageUrl(res.image);
        } catch (error) {
            toast.error(error?.data?.message || error.error);
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const productData = new FormData();
            productData.append('image', image)
            productData.append('name', name)
            productData.append('description', description)
            productData.append('price', price)
            productData.append('category', category)
            productData.append('quantity', quantity)
            productData.append('brand', brand)
            productData.append('countInStock', stock)

            const {data} = await createProduct(productData);
            if(data.error){
                toast.error('Product Create Failed, please Try Again');
            }else{
                toast.success(`${data.name} Created`);
                navigate('/');
            }
        } catch (error) {
            console.log(error);
            toast.error('Product Create Failed, please Try Again');
        }
    }

    return (
        <div className='container xl:mx-[9rem] sm:mx-[0]'>
            <div className="flex flex-col md:flex-row">
                {/*AdminMenu */}
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Create Product</div>
                    {imageUrl && (
                        <div className="text-center">
                            <img src={imageUrl} alt="product_image_admin" 
                                className='block mx-auto max-h-[200px]' 
                            />
                        </div>
                    )}
                    <div className="mb-3">
                        <label className='border-2 text-black px-4 block w-full text-center rounded cursor-pointer font-bold py-11'>
                            {image ? image.name : "Upload An Image"}
                            <input type="file" name='file' accept='image/*' 
                            onChange={uploadFileHandler} 
                                className={!image ? 'hidden' : 'text-black'}
                            />
                        </label>
                    </div>
                    <div className="p-3">
                        <div className="flex flex-wrap gap-5">
                            <div className="">
                                <label htmlFor="name">Name</label><br />
                                <input type="text" className='p-4 mb-3 w-[30rem] rounded border bg-transparent text-black'
                                    value={name}
                                    onChange={e => setName(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="block">Price</label><br />
                                <input type="number" className='p-4 mb-3 w-[30rem] rounded border bg-transparent text-black'
                                    value={price}
                                    onChange={e => setPrice(e.target.value)}
                                />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-5">
                            <div className="">
                                <label htmlFor="name">Quantity</label><br />
                                <input type="number" className='p-4 mb-3 w-[30rem] rounded border bg-transparent text-black'
                                    value={quantity}
                                    onChange={e => setQuantity(e.target.value)}
                                />
                            </div>
                            <div className="">
                                <label htmlFor="block">Brand</label><br />
                                <input type="text" className='p-4 mb-3 w-[30rem] rounded border bg-transparent text-black'
                                    value={brand}
                                    onChange={e => setBrand(e.target.value)}
                                />
                            </div>
                        </div>
                        <label htmlFor="" className='my-5'>Description</label>
                        <textarea type="text" 
                            className='p-2 mb-3 bg-transparent border rounded w-[95%] text-black resize-none' 
                            value={description}
                            onChange={e => setDescription(e.target.value)}
                        ></textarea>
                        <div className="flex justify-between">
                            <div>
                                <label htmlFor="name block">Count in Stock</label><br />
                                <input type="text" 
                                    className='p-4 mb-3 w-[30rem] border rounded bg-transparent text-black'
                                    value={stock}
                                    onChange={e => setStock(e.target.value)}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Category</label><br />
                                <select placeholder='Category' 
                                    className='p-4 mb-3 w-[30rem] border rounded bg-transparent text-black'
                                    value={categories?._id}
                                    onChange={e=> setCategory(e.target.value)}
                                >
                                    {categories?.map(cat => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button onClick={handleSubmit} className='py-4 px-10 mt-5 rounded text-lg bg-teal-500 text-white'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductList