import express from "express";
const router = express.Router();
import { auth, authorizeAdmin } from "../middlewares/AuthMiddleware.js";
import { createCategory, updateCategory, deleteCategory, getAllCategories, category } from "../controllers/categoryController.js";

router.route('/').post(auth, authorizeAdmin ,createCategory);
router.route('/:categoryId').put(auth, authorizeAdmin, updateCategory);
router.route('/:categoryId').delete(auth, authorizeAdmin, deleteCategory);
router.route('/categories').get(getAllCategories);
router.route('/:categoryId').get(category);

export default router;