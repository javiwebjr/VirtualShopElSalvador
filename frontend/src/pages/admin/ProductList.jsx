import React, {useState, useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import { 
    useCreateProductMutation, 
    useUploadProductImageMutation,
} from '../../redux/api/productApiSlice';
import {useFetchCategoriesQuery} from '../../redux/api/categoryApiSlice';
import {toast} from 'react-toastify';
import AdminMenu from './AdminMenu';
import { useFetchSubCategoriesQuery } from '../../redux/api/subCategoryApiSlice';
import Navigation from '../auth/Navigation';
import Navbar from '../../components/Navbar';
import Loader from '../../components/Loader';

const ProductList = () => {
    const {data: categories , isLoading} = useFetchCategoriesQuery();
    const {data: subcategories , isLoading: loadingSubcategorie} = useFetchSubCategoriesQuery();
    const [image, setImage] = useState('');
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState("");
    const [subcategory, setSubCategory] = useState("");
    const [quantity, setQuantity] = useState('');
    const [brand, setBrand] = useState('');
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();

    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();

    
    
    useEffect(() => {
        
        if (categories && categories?.length > 0) {
            setCategory(categories[0]._id);
        }
        if (subcategories && subcategories?.length > 0) {
            setSubCategory(categories[0]._id);
        }
    }, [categories, subcategories]);

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
            productData.append('subcategory', subcategory)
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
        <>
        {isLoading && loadingSubcategorie ? (
            <Loader/>
        ) : (
            <>
                <Navbar/>
        <div className='h-[100vh] mt-[130px] bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-indigo-200 via-slate-600 to-indigo-200'>
            <div className="flex flex-col justify-center items-center md:flex-row">
                <div className="md:w-3/4 p-3">
                    <div className="h-12"><h2 className='text-4xl font-semibold text-slate-100'>Create Product</h2></div>
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
                        <div className="flex justify-between gap-2">
                            <div>
                                <label htmlFor="name block">Count in Stock</label><br />
                                <input type="text" 
                                    className='p-4 mb-3 w-[30rem] border rounded bg-transparent text-black'
                                    onChange={e => setStock(e.target.value)}
                                    value={stock}
                                />
                            </div>
                            <div>
                                <label htmlFor="">Category</label><br />
                                <select 
                                    className='p-4 mb-3 w-[30rem] border rounded bg-transparent text-black'
                                    value={category || ""}
                                    onChange={e=> setCategory(e.target.value)}
                                >
                                    {categories?.map(cat => (
                                        <option key={cat._id} value={cat._id}>
                                            {cat.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div>
                                <label htmlFor="">SubCategory</label><br />
                                <select 
                                    className='p-4 mb-3 w-[30rem] border rounded bg-transparent text-black'
                                    value={subcategory || ""}
                                    onChange={e=> setSubCategory(e.target.value)}
                                >
                                    {subcategories?.map(sub => (
                                        <option key={sub._id} value={sub._id}>
                                            {sub.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        <button onClick={handleSubmit} className='py-4 px-10 mt-5 text-lg text-black bg-teal-500 hover:bg-teal-700 hover:text-white border-2 rounded-lg'>Submit</button>
                    </div>
                </div>
            </div>
        </div>
            </>
        )}
        
        </>
    )
}

export default ProductList