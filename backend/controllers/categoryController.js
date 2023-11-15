import Category from '../models/categoryModel.js';
import Handler from '../middlewares/Handler.js';

const createCategory = Handler(async (req, res) => {
    try {
        const {name} = req.body;
        if(!name){
            return res.json({error: "Category Name Is Required"});
        }
        const categoryExist = await Category.findOne({name});
        if(categoryExist)return res.json({error: "This Category Already Exists"});
        const category = await new Category({name}).save();
        res.json(category);

    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});

const updateCategory = Handler(async (req, res) => {
    try {
        const {name} = req.body;
        const {categoryId} = req.params;

        const category = await Category.findOne({_id: categoryId});
        if(!category)return res.status(404).json({error: "Category Not Found"});
        category.name = name;
        const updatedCategory = await category.save();
        res.json(updatedCategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});
const deleteCategory = Handler(async (req, res) => {
    try {
        const remove = await Category.findByIdAndDelete(req.params.categoryId);
        res.json(remove);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});
const getAllCategories = Handler(async (req,res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
});

const category = Handler(async(req, res) => {
    try {
        const cat = await Category.findOne({_id: req.params.categoryId});
        res.json(cat);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error.message);
    }
})
export {createCategory, updateCategory, deleteCategory, getAllCategories, category};