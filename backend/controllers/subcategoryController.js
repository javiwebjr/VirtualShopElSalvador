import Handler from "../middlewares/Handler.js";
import Subcategory from '../models/subCategoryModel.js';

const createSubCategory = Handler(async (req, res) => {
    try {
        const {name} = req.body;
        if(!name)return res.json({error: "Subcategory name is required"});
        const subcategoryExist = await Subcategory.findOne({name});
        if(subcategoryExist)return res.json({error: "This Subcategory Already Exists"});
        const subCategory = await new Subcategory({name}).save();
        res.json(subCategory);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
const fetchAllSubCategories = Handler(async (req, res) => {
    try {
        const subcategories = await Subcategory.find({});
        res.json(subcategories);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
const fetchSubcategoryById = Handler(async (req, res) => {
    try {
        const subCategory = await Subcategory.findOne({_id: req.params.subcategoryId});
        res.json(subCategory);
    } catch (error) {
        console.log(error);
        return res.status(400).json(error);
    }
});
const updateSubCategory = Handler(async (req, res) => {
    try {
        const {name} = req.body;
        const {subcategoryId} = req.params;
        const subCategory = await Subcategory.findOne({_id: subcategoryId});
        if(!subCategory) return res.status(404).json({error: "Subcategory Not Found"});
        subCategory.name = name || subCategory.name;
        const updatedSubcategory = await subCategory.save();
        res.json(updatedSubcategory);
    } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

const deleteSubCategory = Handler(async (req, res) => {
    try {
        const {subcategoryId} = req.params;
        const removeSubcategory = await Subcategory.findByIdAndDelete(subcategoryId);
        res.json(removeSubcategory);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: "Internal Server Error"});
    }
});

export {
    createSubCategory,
    fetchAllSubCategories,
    fetchSubcategoryById,
    updateSubCategory,
    deleteSubCategory
}