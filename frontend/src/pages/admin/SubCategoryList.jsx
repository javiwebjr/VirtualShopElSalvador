import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import { useCreateSubCategoryMutation,
    useFetchSubCategoriesQuery,
    useDeleteSubCategoryMutation,
    useUpdateSubCategoryMutation
} from '../../redux/api/subCategoryApiSlice';
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice';
import SubCategoryForm from '../../components/SubCategoryForm';
import Modal from '../../components/Modal';
import AdminMenu from './AdminMenu';
import Navigation from '../auth/Navigation';
import Navbar from '../../components/Navbar';

const SubCategoryList = () => {
    const {data: subCategories} = useFetchSubCategoriesQuery();
    const {data: categories} = useFetchCategoriesQuery();
    const [category, setCategory] = useState(categories && categories.length > 0 ? categories[0]._id : null);
    const [name, setName] = useState('');
    const [selecteSubCategory, setSelectedSubCategory] = useState(null);
    const [updateSubCategoryName, setUpdateSubCategoryName] = useState('');
    const [modal, setModal] = useState(false);
    const [createSubCategory] = useCreateSubCategoryMutation();
    const [updateSubCategory] = useUpdateSubCategoryMutation();
    const [deleteSubCategory] = useDeleteSubCategoryMutation();

    useEffect(() => {
        if (categories && categories.length > 0) {
            setCategory(categories[0]._id);
        }
    }, [categories]);

    const handleCategoryChange = (e) => {
        const categoryId = e.target.value;
        setCategory(categoryId);
    };
    
    const handlerCreateSubCategory = async (e) =>{
        e.preventDefault();
        if(!name){
            toast.error('SubCategory Name And Category Is Required');
            return
        }
        try {
            const res = await createSubCategory({name, categoryId: category}).unwrap();
            if(res.error){
                toast.error(res.error);
                return
            }
            setName('');
            toast.success(`${res.name} Has Been Created Succesfully`)
        } catch (error) {
            console.log(error);
            toast.error('Failed On Creating A Category...');
        }
    }

    const handlerUpdateSubCategory = async (e) => {
        e.preventDefault();
        if(!updateSubCategoryName){
            toast.error('Category Name Is Required');
            return;
        }
        try {
            console.log(selecteSubCategory._id);
            const res = await updateSubCategory({
                subcategoryId: selecteSubCategory._id,
                updatedSubcategory: {
                    name: updateSubCategoryName,
                }
            }).unwrap();
            console.log(res);
            if(res.error){
                toast.error(res.error);
            }else{
                toast.success(`${res.name} is updated`);
                setSelectedSubCategory(null);
                setUpdateSubCategoryName('');
                setModal(false);
            }
        } catch (error) {
            console.log(error);
            
        }
    }

    const handlerDeleteSubCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await deleteSubCategory(selecteSubCategory._id).unwrap();
        
            if (res && res.error) {
                toast.error(res.error);
            } else if(res) {
                toast.success(`${res.name} Has Been Removed From The SubCategory List.`);
                setSelectedSubCategory(null);
                setModal(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("SubCategory Removing Has Failed, Pls try Again");
        }
    };


    return (
        <>
        <Navbar/>
        <div className='container mx-auto mt-[140px] flex flex-col md:flex-row'>
            <AdminMenu/>
            <div className="md:w-3/4 p-3">
                <div className="h-12">
                    <h1 className='text-3xl font-semibold'>
                        Manage SubCategories
                    </h1>
                </div>
                    <SubCategoryForm 
                        value={name} 
                        setValue={setName} 
                        handleCategoryChange={handleCategoryChange}
                        handlerCreate={handlerCreateSubCategory || category} 
                        buttonText='Create'
                    />
                    <br />
                    <hr />
                <div className="flex flex-wrap">
                    {subCategories?.map(subCategory => (
                        <div key={subCategory._id} className=''>
                            <button className='bg-black border border-teal-500 text-white py-2 px-4 rounded m-3 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
                                onClick={() =>{{
                                    setModal(true) 
                                    setSelectedSubCategory(subCategory)
                                    setUpdateSubCategoryName(subCategory.name)
                                }}}
                            >
                                {subCategory.name}
                            </button>
                        </div>
                    ))}
                </div>
                <Modal isOpen={modal} onClose={() => setModal(false)}>
                    <SubCategoryForm 
                        value={updateSubCategoryName} 
                        setValue={value => setUpdateSubCategoryName(value)} 
                        handlerSubmit={handlerUpdateSubCategory}
                        buttonText='Update'
                        handlerDelete={handlerDeleteSubCategory}
                    />
                </Modal>
            </div>
        </div>
        </>
    )
}

export default SubCategoryList