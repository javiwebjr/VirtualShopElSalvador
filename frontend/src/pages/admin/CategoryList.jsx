import React, {useState} from 'react';
import {toast} from 'react-toastify';
import { useCreateCategoryMutation, 
    useUpdateCategoryMutation, 
    useDeleteCategoryMutation, 
    useFetchCategoriesQuery 
} from '../../redux/api/categoryApiSlice';
import CategoryForm from '../../components/CategoryForm';
import Modal from '../../components/Modal';

const CategoryList = () => {
    const {data: categories} = useFetchCategoriesQuery();
    const [name, setName] = useState('');
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [updateCategoryName, setUpdateCategoryName] = useState('');
    const [modal, setModal] = useState(false);
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handlerCreateCategory = async (e) =>{
        e.preventDefault();
        if(!name){
            toast.error('Category Name Is Required');
            return
        }
        try {
            const res = await createCategory({name}).unwrap();
            if(res.error){
                toast.error(res.error);
                return
            }
            setName('');
            toast.success(`${res.name} Category Has Been Created Succesfully`)
        } catch (error) {
            console.log(error);
            toast.error('Failed On Creating A Category...');
        }
    }

    const handlerUpdateCategory = async (e) => {
        e.preventDefault();
        if(!updateCategoryName){
            toast.error('Category Name Is Required');
            return;
        }
        try {
            const res = await updateCategory({
                categoryId: selectedCategory._id,
                updatedCategory: {
                    name: updateCategoryName,
                }
            }).unwrap();
            if(res.error){
                toast.error(res.error);
            }else{
                toast.success(`${res.name} is updated`);
                setSelectedCategory(null);
                setUpdateCategoryName('');
                setModal(false);
            }
        } catch (error) {
            console.log(error);
            
        }
    }
    const handlerDeleteCategory = async (e) => {
        e.preventDefault();
        try {
            const res = await deleteCategory(selectedCategory._id).unwrap();
        
            if (res && res.error) {
                toast.error(res.error);
            } else if(res) {
                toast.success(`${res.name} Has Been Removed From The Category List.`);
                setSelectedCategory(null);
                setModal(false);
            }
        } catch (error) {
            console.error(error);
            toast.error("Category Removing Has Failed, Pls try Again");
        }
    };
    

    return (
        <div className='ml-[10rem] flex flex-col md:flex-row'>
            {/*AdminMenu*/ }
            <div className="md:w-3/4 p-3">
                <div className="h-12"><h1 className='text-3xl font-semibold'>Manage Categories</h1></div>
                <CategoryForm 
                    value={name} 
                    setValue={setName} 
                    handlerCreate={handlerCreateCategory} 
                    buttonText='Create'
                />
                <br />
                <hr />
                <div className="flex flex-wrap">
                    {categories?.map(category => (
                        <div key={category._id} className=''>
                            <button className='bg-black border border-teal-500 text-white py-2 px-4 rounded m-3 hover:bg-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50'
                                onClick={() =>{{
                                    setModal(true) 
                                    setSelectedCategory(category)
                                    setUpdateCategoryName(category.name)
                                }}}
                            >
                                {category.name}
                            </button>
                        </div>
                    ))}
                </div>
                <Modal isOpen={modal} onClose={() => setModal(false)}>
                    <CategoryForm 
                        value={updateCategoryName} 
                        setValue={value => setUpdateCategoryName(value)} 
                        handlerSubmit={handlerUpdateCategory}
                        buttonText='Update'
                        handlerDelete={handlerDeleteCategory}
                    />
                </Modal>
            </div>
        </div>
    )
}

export default CategoryList