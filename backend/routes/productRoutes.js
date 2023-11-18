import express from "express";
import formidable from 'express-formidable';
import { auth, authorizeAdmin } from "../middlewares/AuthMiddleware.js";
import checkId from "../middlewares/checkId.js";
import { addProduct, updateProduct, deleteProduct, fetchProducts, fetchProductId } from "../controllers/productController.js";

const router = express.Router();

router.route('/')
    .get(fetchProducts)
    .post(auth, authorizeAdmin, formidable(), addProduct);
router.route('/:id')
    .get(fetchProductId)
    .put(auth, authorizeAdmin, formidable(), updateProduct)
    .delete(auth, authorizeAdmin, formidable(), deleteProduct);


export default router;