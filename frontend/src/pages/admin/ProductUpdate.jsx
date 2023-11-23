import React, {useEffect, useState} from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { 
    useUpdateProductMutation, 
    useDeleteProductMutation, 
    useGetProductByIdQuery,
    useUploadProductImageMutation
} from '../../redux/api/productApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import {toast} from 'react-toastify';
import AdminMenu from './AdminMenu';

const ProductUpdate = () => {
    const params = useParams();
    const {data: productData} = useGetProductByIdQuery(params.id);
    const [image, setImage] = useState(productData?.image || "");
    const [name, setName] = useState(productData?.name || "");
    const [description, setDescription] = useState(productData?.description || "");
    const [price, setPrice] = useState(productData?.price || "");
    const [category, setCategory] = useState(productData?.category || "");
    const [quantity, setQuantity] = useState(productData?.quantity || "");
    const [brand, setBrand] = useState(productData?.brand || "");
    const [stock, setStock] = useState(productData?.countInStock || '');
    
    
    const navigate = useNavigate();
    const {data: categories = []} = useFetchCategoriesQuery();
    const [uploadProductImage] = useUploadProductImageMutation();
    const [updateProduct] = useUpdateProductMutation();
    const [deleteProduct] = useDeleteProductMutation();
    useEffect(() => {
        if (productData && productData._id && productData.countInStock !== undefined) {
            setName(productData.name);
            setDescription(productData.description);
            setPrice(productData.price);
            setCategory(productData.category?._id);
            setQuantity(productData.quantity);
            setBrand(productData.brand);
            setImage(productData.image);
            setStock(productData.countInStock || '')}
    }, [productData]);

    const uploadFileHandler = async (e) => {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        try {
            const res = await uploadProductImage(formData).unwrap();
            toast.success('Item Added Succesfully');
            setImage(res.image);
        } catch (error) {
            toast.error('Item Failed');
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append("image", image);
            formData.append("name", name);
            formData.append("description", description);
            formData.append("price", price);
            formData.append("category", category);
            formData.append("quantity", quantity);
            formData.append("brand", brand);
            formData.append("countInStock", stock);
            //debido a error sin seleccionar una categoria para evitar errores, hay que cancelar el llamado a la api
            if(category === undefined)return;
            const data = await updateProduct({ productId: params.id, formData });
            if (data?.error) {
                toast.error(data.error, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
            } else {
                toast.success(`Product successfully updated`, {
                    position: toast.POSITION.TOP_RIGHT,
                    autoClose: 2000,
                });
                navigate("/admin/allproductslist");
            }
        } catch (err) {
            console.log(err);
            toast.error("Product update failed. Try again.", {
                position: toast.POSITION.TOP_RIGHT,
                autoClose: 2000,
            });
        }
    };
    const handleDelete = async () => {
        try {
            let ans = window.confirm('Are You Sure To Delete This Product?');
            if(!ans)return;
            const {data} = await deleteProduct(params.id);
            toast.success('Product Has Been Deleted');
            navigate('/admin/allproductslist')
        } catch (error) {
            console.log(error);
            toast.error("Delete Failed, please try again")
        }
    }


    return (
        <div className='container xl:mx-[9rem] sm:mx-[0]' style={{width: 'calc(100% - 15%)'}}>
            <div className="flex flex-col md:flex-row justify-center items-center">
                <AdminMenu/>
                <div className="md:w-3/4 p-3">
                    <div className="h-12"><h2 className='text-4xl font-semibold'>Update Products</h2></div>
                    {image && (
                        <div className="text-center">
                            <img src={image} alt="product_image_admin" 
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
                                    value={category || productData?.category}
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
                        <div>
                            <button 
                                onClick={handleSubmit} 
                                className='py-4 px-10 mt-5 text-lg text-black bg-orange-500 hover:bg-orange-700 hover:text-white border-2 rounded-lg'
                            >
                                Update
                            </button>
                            <button 
                                onClick={handleDelete} 
                                className='py-4 px-10 mt-5 text-lg text-white bg-red-600 hover:bg-red-800 hover:text-slate-400 border-2 rounded-lg'
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductUpdate