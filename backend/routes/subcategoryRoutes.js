import express from "express";
import { auth, authorizeAdmin } from "../middlewares/AuthMiddleware.js";
import { 
    createSubCategory, 
    deleteSubCategory, 
    fetchAllSubCategories, 
    fetchSubcategoryById,
    updateSubCategory
} from "../controllers/subcategoryController.js";

const router = express.Router();

router.route('/').post(auth, authorizeAdmin, createSubCategory);
router.route('/subcategories').get(auth, authorizeAdmin, fetchAllSubCategories);
router.route('/:subcategoryId').get(auth, authorizeAdmin, fetchSubcategoryById);
router.route('/:subcategoryId').put(auth, authorizeAdmin, updateSubCategory);
router.route('/:subcategoryId').delete(auth, authorizeAdmin, deleteSubCategory)

export default router;