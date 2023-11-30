import express from "express";
import {auth, authorizeAdmin} from '../middlewares/AuthMiddleware.js';
import { createOrder, 
    getAllOrders, 
    getUserOrders, 
    totalOrders,
    totalSales,
    totalSalesByDate,
    findOrderById,
    markOrderAsPaid,
    markOrderAsDelivered
} from "../controllers/orderController.js";
const router = express.Router();

router.route('/').post(auth, createOrder).get(auth, authorizeAdmin, getAllOrders);
router.route('/myorder').get(auth, getUserOrders);
router.route('/total-orders').get(totalOrders);
router.route('/total-sales').get(totalSales);
router.route('/total-sales-bydate').get(totalSalesByDate);
router.route('/:id').get(auth, findOrderById);

router.route('/:id/pay').put(auth, markOrderAsPaid);

router.route('/:id/deliver').put(auth, authorizeAdmin, markOrderAsDelivered);

export default router;